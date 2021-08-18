import {
    DAYS_IN_A_WEEK,
    EMPTY_ARRAY,
    HTTP_CODE,
    IS_HOLIDAY,
    MAX_DELIVERIES_PER_DAY,
    NOT_A_HOLIDAY,
} from '../constants';
import { HolidayAPI } from 'holidayapi';
import * as path from 'path';
import fetch from 'node-fetch';
import { IAddress, ITimeSlot } from 'interfaces';
import { TimeSlotModel } from 'models';

//Create a holidayAPI access instance
const key = process.env.HOLIDAY_API;
const holidayApi = new HolidayAPI({ key });

/**
 * This funciton will check to see if a holiday is celebrated for this date at the specified location.
 *
 * @property countryCode - The country code as extracted by the address resolve route.
 * @date - The date the delivery should take place.
 */
async function isHoliday(countryCode: string, date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const response = await holidayApi.holidays({
        country: countryCode,
        year: year,
        month: month,
        day: day,
    });
    //If an error is encountered thorw an error with the error message.
    if (response.status !== HTTP_CODE.SUCCESS) {
        throw new Error(response.error);
    }

    //Destruct holidays from the response.
    //Check if there is a holiday for this date.
    const { holidays } = response;
    if (holidays?.length === EMPTY_ARRAY) {
        return NOT_A_HOLIDAY;
    }

    return IS_HOLIDAY;
}

/**
 * Checks to make sure we do not exceed the allowed number of deliveries for this date.
 * @param timeSlotsArray - The time slots array to check.
 * @return Array<ITimeSlot> - An array of ITimeSlot objects.
 */
function CheckMaxDailyDeliveries(timeSlotsArray: Array<ITimeSlot>): Array<ITimeSlot> {
    //Sunday - 0 , Saturday - 6 increment the value if that day has let then MAX_DELIVERIES_PER_DAY. else, filter out the timeslot as it is not possible due to MAX_DELIVERIES_PER_DAY.
    let dailyAmount: Array<number> = new Array(DAYS_IN_A_WEEK).fill(0);
    let newTimeSlotsArray: Array<ITimeSlot> = [];
    for (let timeSlot of timeSlotsArray) {
        const startDay = timeSlot.Start.getDay();
        const endDay = timeSlot.End.getDay();
        if (startDay !== endDay) {
            if (dailyAmount[startDay] <= MAX_DELIVERIES_PER_DAY && dailyAmount[endDay] <= MAX_DELIVERIES_PER_DAY) {
                dailyAmount[startDay] += 1;
                dailyAmount[endDay] += 1;
                newTimeSlotsArray.push(timeSlot);
            }
        } else {
            if (dailyAmount[startDay] <= MAX_DELIVERIES_PER_DAY) {
                dailyAmount[startDay] += 1;
                newTimeSlotsArray.push(timeSlot);
            }
        }
    }
    return newTimeSlotsArray;
}
/**
 *
 * @returns Promise<ITimeSlot[]> - returns array of time slots that were loaded from courierAPI.json
 */
async function LoadCourierApi(): Promise<ITimeSlot[]> {
    const courierApiPath = path.join(__dirname, '../', 'mockData', 'courierAPI.json');
    const courierTimeSlotsResponse = await fetch(courierApiPath);
    const courierTimeSlotsJSON = await courierTimeSlotsResponse.json();
    let courierTimeSlotsArray: ITimeSlot[] = [];
    for (let TimeSlot of courierTimeSlotsJSON) {
        let timeSlotObj: ITimeSlot = {
            Start: TimeSlot.Start,
            End: TimeSlot.End,
            SupportedAddresses: TimeSlot.SupportedAddresses,
        };
        courierTimeSlotsArray = [...courierTimeSlotsArray, timeSlotObj];
    }
    let resp = CheckMaxDailyDeliveries(courierTimeSlotsArray);
    return resp;
}
/**
 *
 * @param address - The address to check by
 * @returns Promise<ITimeSlot[] | number> - Code 500 if error occurred | Array of time slots that were loaded, filtering out slots were holidays occurr.
 */
async function GetFilteredSlots(address: IAddress): Promise<ITimeSlot[] | number> {
    let filteredSlotsArray: ITimeSlot[] = [];
    const query = {
        SupportedAddresses: {
            CountryCode: address.CountryCode,
            State: address.State,
            City: address.City,
        },
    };

    let SlotsResponse = await TimeSlotModel.find(query).exec();
    if (!SlotsResponse) return HTTP_CODE.INTERNAL_ERROR;
    for (let slot of SlotsResponse) {
        if (isHoliday(address.CountryCode, slot.Start) || isHoliday(address.CountryCode, slot.End)) {
            continue;
        }
        filteredSlotsArray.push(slot);
    }
    return filteredSlotsArray;
}
export { isHoliday, LoadCourierApi, GetFilteredSlots };

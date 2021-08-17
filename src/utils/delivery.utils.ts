import { DAYS_IN_A_WEEK, HTTP_CODE, ONE_DAY } from '../constants';
import { Status } from 'enums';
import { UserModel, DeliveryModel, TimeSlotModel } from 'models';
import { IDelivery, IUser } from 'interfaces';
import { ObjectId } from 'mongoose';

async function SetStatus(id: string, status: Status): Promise<number> {
    let delivery = await DeliveryModel.findById(id);
    if (!delivery) return HTTP_CODE.INTERNAL_ERROR;
    delivery.Status = status;
    let response = await delivery.update();
    if (!response) return HTTP_CODE.INTERNAL_ERROR;
    return HTTP_CODE.SUCCESS;
}

async function BookDelivery(user: IUser, timeslotId: ObjectId): Promise<number> {
    user.TimeSlot = timeslotId;
    const User = new UserModel(user);
    let userResp = await User.save();
    if (!userResp) return HTTP_CODE.INTERNAL_ERROR;

    let timeSlotDoc = await TimeSlotModel.findById(timeslotId);
    if (!timeSlotDoc) return HTTP_CODE.INTERNAL_ERROR;

    let delivery: IDelivery = {
        UserId: userResp._id,
        Status: Status.PENDING,
        TimeSlots: timeSlotDoc,
    };
    const Delivery = new DeliveryModel(delivery);

    let deliveryResp = await Delivery.save();
    if (!deliveryResp) return HTTP_CODE.INTERNAL_ERROR;
    return HTTP_CODE.SUCCESS;
}

async function GetDaily(): Promise<number | IDelivery[]> {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const tommorow = new Date(year, month, day + ONE_DAY);

    const filter = {
        'TimeSlots.Start': {
            $gte: today,
            $lt: tommorow,
        },
    };

    const dailyDeliveries = await DeliveryModel.find(filter).exec();
    if (!dailyDeliveries) return HTTP_CODE.INTERNAL_ERROR;
    return dailyDeliveries;
}

async function GetWeekly(): Promise<number | IDelivery[]> {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const nextWeek = new Date(year, month, day + DAYS_IN_A_WEEK);

    const filter = {
        'TimeSlots.Start': {
            $gte: today,
            $lt: nextWeek,
        },
    };

    const dailyDeliveries = await DeliveryModel.find(filter).exec();
    if (!dailyDeliveries) return HTTP_CODE.INTERNAL_ERROR;
    return dailyDeliveries;
}

export { SetStatus, BookDelivery, GetDaily, GetWeekly };

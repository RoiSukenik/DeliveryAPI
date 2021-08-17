import { ITimeSlot } from 'interfaces';
import { Schema, model } from 'mongoose';

const TimeSlotSchema = new Schema<ITimeSlot>({
    Start: Date,
    End: Date,
    SupportedAddresses: [
        {
            CountryCode: String,
            City: String,
            State: String,
        },
    ],
});

const TimeSlotModel = model<ITimeSlot>('TimeSlots', TimeSlotSchema);
export default TimeSlotModel;

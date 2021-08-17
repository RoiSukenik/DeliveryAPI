import { Status } from '../enums';
import { Schema } from 'mongoose';
import { ITimeSlot } from 'interfaces';

interface IDelivery {
    UserId: Schema.Types.ObjectId;
    Status: Status;
    TimeSlots: ITimeSlot;
}

export default IDelivery;

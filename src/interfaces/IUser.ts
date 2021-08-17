import { ITimeSlot } from 'interfaces';
import { ObjectId } from 'mongoose';

interface IUser {
    UserName: string;
    Password: string;
    Email: string;
    TimeSlot: ObjectId;
}

export default IUser;

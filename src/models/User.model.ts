import { IUser } from 'interfaces';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema<IUser>({
    UserName: String,
    Password: String,
    Email: String,
    TimeSlot: { type: Schema.Types.ObjectId, ref: 'TimeSlot' },
});

const UserModel = model<IUser>('Users', UserSchema);

export default UserModel;

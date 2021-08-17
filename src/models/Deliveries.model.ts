import { Status } from 'enums';
import { IDelivery } from 'interfaces';
import { model, Schema } from 'mongoose';

const DeliverySchema = new Schema<IDelivery>({
    UserId: Schema.Types.ObjectId,
    Status: {
        type: String,
        required: true,
        enum: Status,
        default: Status.PENDING,
    },
    TimeSlots: {
        Start: Date,
        End: Date,
        SupportedAddresses: [
            {
                Street: String,
                Country: String,
                CountryCode: String,
                City: String,
                State: String,
                PostalCode: String,
            },
        ],
    },
});

const deliveryModel = model<IDelivery>('Deliveries', DeliverySchema);

export default deliveryModel;

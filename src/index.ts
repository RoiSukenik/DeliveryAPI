import 'dotenv/config';
import App from './app';
import { AddressController, DeliveryController, TimeSlotsController } from './controllers';

const app = new App(
    [new AddressController(), new DeliveryController(), new TimeSlotsController()],
    HTTP_CODE.INTERNAL_ERROR0,
);

app.listen();

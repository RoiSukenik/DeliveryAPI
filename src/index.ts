import 'dotenv/config';
import App from './app';
import { AddressController, DeliveryController, TimeSlotsController } from './controllers';

const app = new App([
                new AddressController(), 
                new DeliveryController(), 
                new TimeSlotsController()], 5000);

app.listen();

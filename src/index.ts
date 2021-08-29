import { MongooseDatabase } from 'configs';
import 'dotenv/config';
import App from './app';
import { AddressController, DeliveryController, TimeSlotsController } from './controllers';

const { DB_USERNAME, DB_PASSWORD, DB_PATH } = process.env;
const db = new MongooseDatabase(DB_USERNAME, DB_PASSWORD, DB_PATH);

const app = new App([new AddressController(), new DeliveryController(), new TimeSlotsController()], 5000, db);

app.listen();

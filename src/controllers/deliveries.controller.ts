import * as express from 'express';
import { BookDelivery, GetDaily, GetWeekly, SetStatus } from 'utils';
import { Status } from 'enums';
import { HTTP_CODE } from '../constants';

class Delivery {
    public path = '/deliveries';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(`${this.path}/daily`, this.getDailyDeliveries);
        this.router.get(`${this.path}/weekly`, this.getWeeklyDeliveries);
        this.router.post(`${this.path}/:DELIVERY_ID/complete`, this.markAsCompleted);
        this.router.post(this.path, this.bookDelivery);
        this.router.delete(`${this.path}/:DELIVERY_ID`, this.markAsCanceled);
    }

    markAsCompleted = async (req: express.Request, res: express.Response) => {
        const { DELIVERY_ID } = req.params;
        let resp = await SetStatus(DELIVERY_ID, Status.COMPLETED);
        res.status(resp);
    };

    markAsCanceled = async (req: express.Request, res: express.Response) => {
        const { DELIVERY_ID } = req.params;
        let resp = await SetStatus(DELIVERY_ID, Status.CANCELED);
        res.status(resp);
    };

    bookDelivery = async (req: express.Request, res: express.Response) => {
        const { user, timeslotId } = req.body;
        let resp = await BookDelivery(user, timeslotId);
        res.status(resp);
    };

    getDailyDeliveries = async (req: express.Request, res: express.Response) => {
        let daily = await GetDaily();
        if (daily === HTTP_CODE.INTERNAL_ERROR) res.send(500);
        res.status(200).json(daily);
    };

    getWeeklyDeliveries = async (req: express.Request, res: express.Response) => {
        let Weekly = await GetWeekly();
        if (Weekly === HTTP_CODE.INTERNAL_ERROR) res.send(500);
        res.status(200).json(Weekly);
    };
}

import { HTTP_CODE } from '../constants';
import * as express from 'express';
import { TimeSlotModel } from 'models';
import { GetFilteredSlots, LoadCourierApi } from '../utils';

class TimeSlotsController {
    public path = '/timeslots';
    public router = express.Router();

    constructor() {
        this.initializeTimeSlots();
        this.initializeRoutes();
    }

    public initializeTimeSlots() {
        LoadCourierApi()
            .then(async (res) => {
                await TimeSlotModel.insertMany(res);
            })
            .catch((error) => {
                console.warn(error, '\nerror loading time slots');
            });
    }
    public initializeRoutes() {
        this.router.post(this.path, this.getFilterTimeSlots);
    }

    getFilterTimeSlots = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { address } = req.body;
        let filterTimeSlots = await GetFilteredSlots(address);
        if (filterTimeSlots === HTTP_CODE.INTERNAL_ERROR) res.sendStatus(HTTP_CODE.INTERNAL_ERROR);
        res.status(200).json(filterTimeSlots);
    };
}

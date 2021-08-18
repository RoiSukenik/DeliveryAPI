import * as express from 'express';
import { Resolve } from 'utils';
import { HTTP_CODE } from '../constants';

class Address {
    path = '/resolve-address';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(this.path, this.resolveAddress);
    }

    resolveAddress = async (req: express.Request, res: express.Response) => {
        const { searchTerm } = req.body;
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        let response = await Resolve(encodedSearchTerm);
        if (response === HTTP_CODE.INTERNAL_ERROR) res.sendStatus(HTTP_CODE.INTERNAL_ERROR);
        res.sendStatus(HTTP_CODE.SUCCESS);
    };
}

export default Address;

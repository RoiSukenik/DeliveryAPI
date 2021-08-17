import express from 'express';
import * as mongoose from 'mongoose';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: string[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }
    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    private initializeDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
    public listen() {
        this.app.listen(this.port);
    }
}

export default App;

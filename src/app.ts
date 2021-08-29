import { DataBase } from 'configs';
import express from 'express';

class App {
    public _app: express.Application;
    public _port: number;
    public _db: DataBase | undefined;

    constructor(controllers: any[], port: number, database: DataBase) {
        this._app = express();
        this._port = port;

        this.initializeDatabase(database);
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        this._app.use(express.json());
        this._app.use(express.urlencoded());
    }
    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this._app.use('/', controller.router);
        });
    }
    private initializeDatabase(database: DataBase) {
        this._db = database;
        this._db.initializeDatabase();
    }
    public listen() {
        this._app.listen(this._port);
    }
}

export default App;

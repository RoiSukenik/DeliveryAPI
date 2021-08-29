import { createConnection } from 'mongoose';
import DataBase from './DataBase.config';

class MongooseDatabase extends DataBase {
    constructor(user: string | undefined, password: string | undefined, path: string | undefined) {
        super(user, password, path);
    }

    public async initializeDatabase(): Promise<void> {
        let connection = await createConnection(`mongodb://${super.GetUser}:${super.GetPassword}${super.GetPath}`);

        super.SetConnection(connection);
    }
}

export default MongooseDatabase;

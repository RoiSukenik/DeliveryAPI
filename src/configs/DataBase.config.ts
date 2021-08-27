import { DataBaseConnection } from 'types';

class DataBase {
    private _user: string | undefined;
    private _password: string | undefined;
    private _path: string | undefined;
    private _connection: DataBaseConnection;

    constructor(userName: string | undefined, password: string | undefined, path: string | undefined) {
        this._user = userName;
        this._password = password;
        this._path = path;
    }

    public GetUser(): string | undefined {
        return this._user;
    }

    public GetPassword(): string | undefined {
        return this._password;
    }
    public GetPath(): string | undefined {
        return this._path;
    }
    public SetConnection(connection: DataBaseConnection): void {
        this._connection = connection;
    }
    public GetConnection() {
        return this._connection;
    }

    public initializeDatabase(): void {}
}

export default DataBase;

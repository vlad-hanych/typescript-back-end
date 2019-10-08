import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import User from './User';

var db = new JsonDB(new Config("myDataBase", true, false, '/'));
db.push("/test1", "super test");

export const saveUser = async (user: User): Promise<boolean> => {
    try {
        const p = new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                db.push(`/user/${user.username}`, user);
                res(true);
            }, 3000);
        })
        return p;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getUsers = async (): Promise<any> => {
    try {
        const p = new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                var data = db.getData('/user');
                res(data);
            }, 3000);
        })
        return p;

    } catch (err) {
        return Promise.reject(err);
    }
}
import {JsonDB} from 'node-json-db';
import {Config} from 'node-json-db/dist/lib/JsonDBConfig';
import User from './User';
import Target from "./Target";

const db = new JsonDB(new Config("myDataBase", true, false, '/'));

export const saveUser = async (user: User): Promise<boolean> => {
    try {
        const promise = new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                db.push(`/user/${user.username}`, user);
                res(true);
            }, 3000);
        });
        return promise;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getUsers = async (): Promise<Record<string, User>> => {
    try {
        const promise = new Promise<Record<string, User>>((res, rej) => {
            setTimeout(() => {
                const data = db.getData('/user');
                res(data);
            }, 3000);
        });
        return promise;

    } catch (err) {
        return Promise.reject(err);
    }
};

export const createTarget = async (username: string, target: Target): Promise<boolean> => {
    try {
        const promise = new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                const parts = target.youtubeLink.split('/');
                const lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

                const path = `/target/${username}/${lastSegment}`;

                console.log(lastSegment);

                db.push(path, target);

                res(true);
            }, 3000);
        });
        return promise;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getTargets = async (username: string): Promise<Record<string, Target>> => {
    try {
        const promise = new Promise<Record<string, Target>>((res, rej) => {
            setTimeout(() => {
                let data;

                try {
                    data = db.getData(`/target/${username}`);
                } catch(error) {
                    // The error will tell you where the DataPath stopped.
                    res (error)
                }

                res(data);
            }, 3000);
        });
        return promise;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const editTarget = async (usernam: string,
                                 targetnam: string,
                                 youtbLink: string,
                                 viewsNeeded: number,
                                 awarLink: string,): Promise<boolean> => {
    try {
        const promise = new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                let baseEditionPath = `/target/${usernam}/${targetnam}`;

                if (youtbLink != null)
                    db.push(baseEditionPath + '/youtubeLink/', youtbLink);

                if (viewsNeeded != null)
                    db.push(baseEditionPath + '/viewsNeeded/', viewsNeeded);

                if (awarLink != null)
                    db.push(baseEditionPath + '/awardLink/', awarLink);

                res(true);
            }, 3000);
        });
        return promise;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteTarget = async (username: string, endpoint: string): Promise<boolean> => {
    try {
        const promise = new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                let deletionPath = `/target/${username}`;

                if (endpoint != null)
                    deletionPath += `/${endpoint}`;

                db.delete(deletionPath);

                res(true);
            }, 3000);
        });
        return promise;
    } catch (err) {
        return Promise.reject(err);
    }
};
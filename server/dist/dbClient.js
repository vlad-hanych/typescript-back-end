"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("myDataBase", true, false, '/'));
exports.saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                db.push(`/user/${user.username}`, user);
                res(true);
            }, 1);
        });
        return promise;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                const data = db.getData('/user');
                res(data);
            }, 1);
        });
        return promise;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.createTarget = (username, target) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                const parts = target.youtubeLink.split('/');
                const lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
                const path = `/target/${username}/${lastSegment}`;
                console.log(lastSegment);
                db.push(path, target);
                res(true);
            }, 3000);
        });
        return promise;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.getTargets = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                let data;
                try {
                    data = db.getData(`/target/${username}`);
                }
                catch (error) {
                    // The error will tell you where the DataPath stopped.
                    res(error);
                }
                res(data);
            }, 3000);
        });
        return promise;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.editTarget = (usernam, targetnam, youtbLink, viewsNeeded, awarLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = new Promise((res, rej) => {
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
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.deleteTarget = (username, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                let deletionPath = `/target/${username}`;
                if (endpoint != null)
                    deletionPath += `/${endpoint}`;
                db.delete(deletionPath);
                res(true);
            }, 3000);
        });
        return promise;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
//# sourceMappingURL=dbClient.js.map
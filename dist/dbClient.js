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
var db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("myDataBase", true, false, '/'));
db.push("/test1", "super test");
exports.saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = new Promise((res, rej) => {
            setTimeout(() => {
                db.push(`/user/${user.username}`, user);
                res(true);
            }, 3000);
        });
        return p;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = new Promise((res, rej) => {
            setTimeout(() => {
                var data = db.getData('/user');
                res(data);
            }, 3000);
        });
        return p;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
//# sourceMappingURL=dbClient.js.map
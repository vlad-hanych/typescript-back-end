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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbClient_1 = require("./dbClient");
const passwordHash = require('password-hash');
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    console.log('Middlewaregegege');
    next();
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const passwordRaw = req.body.password;
    // * dont save real passwords. Use hash or some library (passport?)
    const password = passwordHash.generate(passwordRaw);
    ///console.log(encodedPassword);
    ///console.log(passwordHash.verify(password, encodedPassword));
    ///console.log(passwordHash.verify("1234", encodedPassword));
    ///console.log(passwordHash.verify('1234', encodedPassword));
    ///console.log(passwordHash.verify('huj', encodedPassword));
    ///const success = await saveUser({username, password});
    const newUser = { username, password };
    ///???!const newUser: User = new User (username, password);
    const success = yield dbClient_1.saveUser(newUser);
    if (success) {
        res.send('User saved');
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRaw = yield dbClient_1.getUsers();
    ///const usersJSONString = JSON.stringify(usersRaw);
    const loggingUserName = req.body.username;
    const loggingUserPassword = req.body.password;
    console.log("/login_" + "username: " + loggingUserName + "; userPassword: " + loggingUserPassword);
    const usersArray = Object.values(usersRaw);
    console.log("/login_" + usersArray);
    /*usersArray.forEach((loopingObject) => {
        const loopingUser = loopingObject as User

        console.log("/login_looping element next generation is: " + loopingUser.username);

        if (loopingUser.username === loggingUserName) {
            if (loopingUser.password === loggingUserPassword) {
                res.send('Welcome to Prime-Time, Bitch.');

                return
            }
        }
    });

    res.send('Netu takih.');*/
    for (let loopingObject of usersArray) {
        const loopingUser = loopingObject;
        console.log("/login_looping element last generation is: " + loopingUser.username);
        if (loopingUser.username === loggingUserName) {
            if (passwordHash.verify(loggingUserPassword, loopingUser.password)) {
                res.send('Welcome to Prime-Time, Bitch.');
                return;
            }
        }
    }
    res.send('Netu takih.');
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRaw = yield dbClient_1.getUsers();
    //return only names
    const usersArray = Object.values(usersRaw);
    let usersFormatted = '';
    /*for (let loopingObject of usersArray) {
        const loopingUser = loopingObject as User

        usersFormatted += loopingUser.username + "___"
    }

    res.send(usersFormatted);
})*/
    /*for (let loopingObject of usersArray) {
        const loopingJSONObj = JSON.parse(JSON.stringify(loopingObject))

        delete loopingJSONObj['password']

        console.log(loopingJSONObj)
    }*/
    const usersJSONObj = JSON.parse(JSON.stringify(usersRaw));
    console.log(usersJSONObj);
    for (let key in usersJSONObj) {
        const loopingJSONObj = usersJSONObj[key];
        delete loopingJSONObj['password'];
    }
    console.log(usersJSONObj);
    res.send(usersJSONObj);
}));
exports.default = app;
//# sourceMappingURL=app.js.map
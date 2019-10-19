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
const password_hash_1 = __importDefault(require("password-hash"));
/// TODO convert to impoty
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    console.log('Middlewaregegege');
    next();
});
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'session_key_value_qqq',
    secret: 'sssssh! That\'s the secret',
    name: 'sessionqqq',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        qqq: "gegege",
        maxAge: 60 * 60 * 1000,
        expires: new Date(Date.now() + (3 * 60 * 60 * 1000))
    }
}));
// middleware function to check for logged-in users
app.use((req, res, next) => {
    console.log(req.cookies);
    next();
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const passwordRaw = req.body.password;
    const password = password_hash_1.default.generate(passwordRaw);
    const newUser = { username, password };
    const success = yield dbClient_1.saveUser(newUser);
    if (success) {
        res.send('User saved');
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRaw = yield dbClient_1.getUsers();
    const loggingUserName = req.body.username;
    const loggingUserPassword = req.body.password;
    const usersArray = Object.values(usersRaw);
    for (let loopingObject of usersArray) {
        const loopingUser = loopingObject;
        console.log("/login_looping element last generation is: " + loopingUser.username);
        if (loopingUser.username === loggingUserName) {
            if (password_hash_1.default.verify(loggingUserPassword, loopingUser.password)) {
                ///res.send(req.session);
                res.cookie('nameqqq', "lastnameqqq");
                console.log("req: " + req.cookies.toString());
                console.log(req.cookies);
                console.log("res: " + res.cookie.toString());
                res.send('Welcome to Prime-Time, Bitch.');
                return;
            }
        }
    }
    res.send('Netu takih.');
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRaw = yield dbClient_1.getUsers();
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
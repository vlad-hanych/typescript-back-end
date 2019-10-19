import express from "express";
import bodyParser from "body-parser";
import {saveUser, getUsers} from './dbClient';
import User from "./User";

import passwordHash from 'password-hash';

/// TODO convert to impoty
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
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

app.post('/signup', async (req, res) => {
    const username: string = req.body.username;
    const passwordRaw: string = req.body.password;

    const password = passwordHash.generate(passwordRaw);

    const newUser: User = {username, password};

    const success = await saveUser(newUser);

    if (success) {
        res.send('User saved');
    }
});

app.post('/login', async (req, res) => {
    const usersRaw = await getUsers();

    const loggingUserName = req.body.username;
    const loggingUserPassword = req.body.password;

    const usersArray = Object.values(usersRaw);

    for (let loopingObject of usersArray) {
        const loopingUser = loopingObject as User;

        console.log("/login_looping element last generation is: " + loopingUser.username);

        if (loopingUser.username === loggingUserName) {

            if (passwordHash.verify(loggingUserPassword, loopingUser.password)) {
                ///res.send(req.session);

                res.cookie('nameqqq', "lastnameqqq");
                console.log("req: " + req.cookies.toString());
                console.log(req.cookies);

                console.log("res: " + res.cookie.toString());

                res.send('Welcome to Prime-Time, Bitch.');

                return
            }
        }
    }

    res.send('Netu takih.');

});

app.get('/users', async (req, res) => {
    const usersRaw = await getUsers();

    const usersJSONObj = JSON.parse(JSON.stringify(usersRaw));

    console.log(usersJSONObj);

    for (let key in usersJSONObj) {
        const loopingJSONObj = usersJSONObj[key];

        delete loopingJSONObj['password'];
    }

    console.log(usersJSONObj);

    res.send(usersJSONObj);
});

export default app;



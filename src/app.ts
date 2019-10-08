import express from "express";
import bodyParser from "body-parser";
import {saveUser, getUsers} from './dbClient';
import User from "./User";
const passwordHash = require('password-hash');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Middlewaregegege');
    next();
});

app.post('/signup', async (req, res) => {
    const username: string = req.body.username;
    const passwordRaw: string = req.body.password;

    // * dont save real passwords. Use hash or some library (passport?)

    const password = passwordHash.generate(passwordRaw);

    ///console.log(encodedPassword);

    ///console.log(passwordHash.verify(password, encodedPassword));
    ///console.log(passwordHash.verify("1234", encodedPassword));
    ///console.log(passwordHash.verify('1234', encodedPassword));
    ///console.log(passwordHash.verify('huj', encodedPassword));

    ///const success = await saveUser({username, password});

    const newUser: User = {username, password};

    ///???!const newUser: User = new User (username, password);

    const success = await saveUser(newUser);

    if (success) {
        res.send('User saved');
    }
});

app.post('/login', async (req, res) => {
    const usersRaw = await getUsers();

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
        const loopingUser = loopingObject as User;

        console.log("/login_looping element last generation is: " + loopingUser.username);

        if (loopingUser.username === loggingUserName) {

            if (passwordHash.verify(loggingUserPassword, loopingUser.password)) {
                res.send('Welcome to Prime-Time, Bitch.');

                return
            }
        }
    }

    res.send('Netu takih.');

});

app.get('/users', async (req, res) => {
    const usersRaw = await getUsers();
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
});

export default app;



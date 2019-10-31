import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import {saveUser, getUsers, createTarget, getTargets, deleteTarget, editTarget} from "./dbClient";
import User from "./User";
import passwordHash from "password-hash";
import Target from "./Target";

const loginForm = `
<!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<form action="/login" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="user_name">
  </div>
  <div>
    <label for="msg">Password:</label>
    <input id="msg" name="user_password" type="password"></input>
  </div>
  <div class="button">
  <button type="submit">Send your message</button>
</div>
</form>
</body>
</html>
`;

const app = express();

const sessionChecker = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/login');
    } else {
        next();
    }
};

let loggedUserName: string;

app.use(bodyParser());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    name: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
    }
}));


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

app.route('/login')
    .get((req, res) => {
        res.send(loginForm);
    })
    .post(async (req, res) => {
        const usersRaw = await getUsers();

        const loggingUserName = req.body.user_name;
        const loggingUserPassword = req.body.user_password;

        Object.values(usersRaw).forEach(loopingUser => {
            if (loopingUser.username === loggingUserName) {

                if (passwordHash.verify(loggingUserPassword, loopingUser.password)) {
                    req.session.user = {name: 'Vasia', surname: 'Palapkin'};
                    req.session.kot = 'kit';

                    res.redirect('/dashboard');

                    loggedUserName = loggingUserName;

                    return /// TODO 28.10.2019 return seems doesn't work here.
                }
            }
        });

        res.send('Netu takih.');
    });

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');

        loggedUserName = null
    } else {
        res.redirect('/login');
    }
});

app.use(sessionChecker);

app.get('/users', async (req, res) => {
    const usersRaw = await getUsers();

    res.send(Object.values(usersRaw).forEach(loopingUser => delete loopingUser.password));
});

app.get('/dashboard', (req, res) => {
    console.log(req.session.kot);

    res.send('Reached dashboard');
});

app.post('/createTarget', async (req, res) => {
    console.log(req.session.kot);

    const youtubeLink: string = req.body.youtubeLink;
    const viewsNeeded: number = req.body.viewsNeeded;
    const awardLink: string = req.body.awardLink;

    const creatingTarg: Target = {youtubeLink, viewsNeeded, awardLink};

    const success = await createTarget(loggedUserName, creatingTarg);

    res.send('Target created!');
});

app.get('/getTargets', async (req, res) => {
    console.log(req.session.kot);

    const targetData = await getTargets(loggedUserName);

    res.send(targetData);
});

app.patch('/editTarget', async (req, res) => {
    console.log(req.session.kot);

    const targetName: string = req.body.targetName;

    const youtubeLink: string = req.body.youtubeLink;

    const viewsNeeded: number = req.body.viewsNeeded;

    const awardLink: string = req.body.awardLink;

    const target = await editTarget
    (loggedUserName,
        targetName,
        youtubeLink,
        viewsNeeded,
        awardLink);

    res.send(target);
});

app.get('/deleteTarget', async (req, res) => {
    console.log(req.session.kot);

    const targetName: string = req.body.targetName;

    const target = await deleteTarget(loggedUserName, targetName);

    res.send(target);
});

export default app;



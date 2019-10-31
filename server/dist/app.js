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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const dbClient_1 = require("./dbClient");
const password_hash_1 = __importDefault(require("password-hash"));
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
const app = express_1.default();
const sessionChecker = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/login');
    }
    else {
        next();
    }
};
let loggedUserName;
app.use(body_parser_1.default());
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookie_parser_1.default());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(express_session_1.default({
    name: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
    }
}));
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
app.route('/login')
    .get((req, res) => {
    res.send(loginForm);
})
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRaw = yield dbClient_1.getUsers();
    const loggingUserName = req.body.user_name;
    const loggingUserPassword = req.body.user_password;
    Object.values(usersRaw).forEach(loopingUser => {
        if (loopingUser.username === loggingUserName) {
            if (password_hash_1.default.verify(loggingUserPassword, loopingUser.password)) {
                req.session.user = { name: 'Vasia', surname: 'Palapkin' };
                req.session.kot = 'kit';
                res.redirect('/dashboard');
                loggedUserName = loggingUserName;
                return; /// TODO 28.10.2019 return seems doesn't work here.
            }
        }
    });
    res.send('Netu takih.');
}));
// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
        loggedUserName = null;
    }
    else {
        res.redirect('/login');
    }
});
app.use(sessionChecker);
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRaw = yield dbClient_1.getUsers();
    res.send(Object.values(usersRaw).forEach(loopingUser => delete loopingUser.password));
}));
app.get('/dashboard', (req, res) => {
    console.log(req.session.kot);
    res.send('Reached dashboard');
});
app.post('/createTarget', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session.kot);
    const youtubeLink = req.body.youtubeLink;
    const viewsNeeded = req.body.viewsNeeded;
    const awardLink = req.body.awardLink;
    const creatingTarg = { youtubeLink, viewsNeeded, awardLink };
    const success = yield dbClient_1.createTarget(loggedUserName, creatingTarg);
    res.send('Target created!');
}));
app.get('/getTargets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session.kot);
    const targetData = yield dbClient_1.getTargets(loggedUserName);
    res.send(targetData);
}));
app.patch('/editTarget', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session.kot);
    const targetName = req.body.targetName;
    const youtubeLink = req.body.youtubeLink;
    const viewsNeeded = req.body.viewsNeeded;
    const awardLink = req.body.awardLink;
    const target = yield dbClient_1.editTarget(loggedUserName, targetName, youtubeLink, viewsNeeded, awardLink);
    res.send(target);
}));
app.get('/deleteTarget', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session.kot);
    const targetName = req.body.targetName;
    const target = yield dbClient_1.deleteTarget(loggedUserName, targetName);
    res.send(target);
}));
exports.default = app;
//# sourceMappingURL=app.js.map
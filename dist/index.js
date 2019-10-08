"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const server = app_1.default.listen('3434', () => {
    console.log("  App is running at http://localhost:3434 in %s mode", app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
// export default server;
//# sourceMappingURL=index.js.map
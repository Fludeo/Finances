"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const DIconfig_1 = __importDefault(require("./config/DIconfig"));
const module_1 = require("./modules/auth/module");
const module_2 = require("./modules/record/module");
const module_3 = require("./modules/user/module");
// DIcontainer initialization
const container = (0, DIconfig_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes initialization 
(0, module_1.initAuthModule)(container, app);
(0, module_2.initRecordModule)(container, app);
(0, module_3.initUserModule)(container, app);
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.code);
    res.json({ message: err.message });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

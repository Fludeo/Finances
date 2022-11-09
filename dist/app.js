"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DIconfig_1 = __importDefault(require("./config/DIconfig"));
const module_1 = require("./modules/auth/module");
const module_2 = require("./modules/record/module");
const module_3 = require("./modules/user/module");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
exports.app = (0, express_1.default)();
const port = String(process.env.PORT);
// DIcontainer initialization
const container = (0, DIconfig_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Routes initialization
(0, module_1.initAuthModule)(container, exports.app);
(0, module_2.initRecordModule)(container, exports.app);
(0, module_3.initUserModule)(container, exports.app);
exports.app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.code);
    res.json(err);
});
exports.app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

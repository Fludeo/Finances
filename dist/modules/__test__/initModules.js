"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_1 = require("../auth/module");
const module_2 = require("../record/module");
const module_3 = require("../user/module");
const DIconfig_1 = __importDefault(require("../../config/DIconfig"));
const cors_1 = __importDefault(require("cors"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
    path: '.env.test'
});
function AppBootstrapper() {
    const app = (0, express_1.default)();
    const container = (0, DIconfig_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    (0, module_1.initAuthModule)(container, app);
    (0, module_2.initRecordModule)(container, app);
    (0, module_3.initUserModule)(container, app);
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(err.code);
        res.json(err);
    });
    return { container, app };
}
exports.default = AppBootstrapper;

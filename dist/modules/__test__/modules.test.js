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
require('dotenv').config({
    path: '.env.test'
});
const AuthModel_1 = __importDefault(require("../auth/model/AuthModel"));
const RecordModel_1 = __importDefault(require("../record/model/RecordModel"));
const UserModel_1 = __importDefault(require("../user/model/UserModel"));
const module_1 = require("../auth/module");
const module_2 = require("../record/module");
const module_3 = require("../user/module");
const DIconfig_1 = __importDefault(require("../../config/DIconfig"));
function bootstrapTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = jest.fn();
        app.get = jest.fn();
        app.post = jest.fn();
        const container = (0, DIconfig_1.default)();
        const sequelize = container.get('Sequelize');
        yield AuthModel_1.default.setup(sequelize).sync({ force: true });
        yield RecordModel_1.default.setup(sequelize).sync({ force: true });
        yield UserModel_1.default.setup(sequelize).sync({ force: true });
        (0, module_1.initAuthModule)(container, app);
        (0, module_2.initRecordModule)(container, app);
        (0, module_3.initUserModule)(container, app);
        return container;
    });
}
exports.default = bootstrapTests;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserRepository = exports.UserService = exports.UserController = exports.initUserModule = void 0;
const UserController_1 = __importDefault(require("./controller/UserController"));
exports.UserController = UserController_1.default;
const UserService_1 = __importDefault(require("./service/UserService"));
exports.UserService = UserService_1.default;
const UserRepository_1 = __importDefault(require("./repository/UserRepository"));
exports.UserRepository = UserRepository_1.default;
const UserModel_1 = __importDefault(require("./model/UserModel"));
exports.UserModel = UserModel_1.default;
const initUserModule = (container, app) => {
    const controller = container.get('UserController');
    controller.configureRoutes(app);
};
exports.initUserModule = initUserModule;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = exports.AuthRepository = exports.AuthService = exports.AuthController = exports.initAuthModule = void 0;
const AuthController_1 = __importDefault(require("./controller/AuthController"));
exports.AuthController = AuthController_1.default;
const AuthService_1 = __importDefault(require("./service/AuthService"));
exports.AuthService = AuthService_1.default;
const AuthRepository_1 = __importDefault(require("./repository/AuthRepository"));
exports.AuthRepository = AuthRepository_1.default;
const AuthModel_1 = __importDefault(require("./model/AuthModel"));
exports.AuthModel = AuthModel_1.default;
const initAuthModule = (container, app) => {
    const controller = container.get('AuthController');
    controller.configureRoutes(app);
};
exports.initAuthModule = initAuthModule;

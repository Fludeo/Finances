"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
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
const UserDto_1 = __importDefault(require("../dto/UserDto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const fromUserDtoToEntity_1 = __importDefault(require("../mapper/fromUserDtoToEntity"));
class UserController {
    constructor(userService, authService) {
        this.authService = authService;
        this.userService = userService;
        this.baseRoute = '/user';
    }
    configureRoutes(app) {
        const BASEROUTE = this.baseRoute;
        app.post(`${BASEROUTE}/signup`, this.signUp.bind(this));
        app.get(`${BASEROUTE}/records`, this.authService.authenticateToken, this.getRecords.bind(this));
    }
    getRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(req.user.id);
                const records = yield this.userService.getRecords(user);
                res.status(200);
                res.json({ records });
            }
            catch (err) {
                next(err);
            }
        });
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = new UserDto_1.default(req.body);
            try {
                userDto.validate();
                const salt = yield bcrypt_1.default.genSalt();
                const hash = yield bcrypt_1.default.hash(userDto.password, salt);
                userDto.password = hash;
                const newUser = (0, fromUserDtoToEntity_1.default)(userDto);
                yield this.userService.newUser(newUser);
                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;

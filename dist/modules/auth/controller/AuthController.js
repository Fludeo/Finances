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
const InvalidRefreshToken_1 = __importDefault(require("../errors/InvalidRefreshToken"));
const LoginDto_1 = __importDefault(require("../dto/LoginDto"));
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.baseRoute = '/auth';
    }
    configureRoutes(app) {
        const BASEROUTE = this.baseRoute;
        app.post(`${BASEROUTE}/login`, this.login.bind(this));
        app.post(`${BASEROUTE}/session`, this.session.bind(this));
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const loginDto = new LoginDto_1.default(req.body);
            try {
                loginDto.validate();
                const token = yield this.authService.login(loginDto, res);
                res.status(200);
                res.json(token);
            }
            catch (err) {
                next(err);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = req.headers.cookie;
                res.clearCookie(String(process.env.HTTPONLY_COOKIE_NAME), { httpOnly: true, secure: true, path: '/auth/session' });
                const httpOnlyToken = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
                yield this.authService.logout(httpOnlyToken);
                res.status(200);
                res.send();
            }
            catch (err) {
                next(err);
            }
        });
    }
    session(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.headers.cookie;
            try {
                if (cookie === undefined) {
                    throw new InvalidRefreshToken_1.default();
                }
                if (req.body.logout === true) {
                    return yield this.logout(req, res, next);
                }
                const httpOnlyToken = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
                const newAccesToken = yield this.authService.refreshToken(httpOnlyToken, res);
                res.status(200);
                res.json(newAccesToken);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = AuthController;

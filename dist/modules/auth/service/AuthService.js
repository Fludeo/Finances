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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const _index_1 = require("../errors/_index");
class AuthService {
    constructor(userService, authRepository) {
        this.userService = userService;
        this.authRepository = authRepository;
    }
    login(userLogin, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.userService.getUserByEmail(userLogin.email);
            if (!(yield bcrypt_1.default.compare(userLogin.password, checkUser.hash))) {
                throw new _index_1.IncorrectPasswordError();
            }
            const accessToken = yield this.giveAccessToken(checkUser, res);
            return accessToken;
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authRepository.removeRefreshToken(refreshToken);
        });
    }
    giveAccessToken(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            yield setCookies(res, refreshToken);
            yield this.userService.saveRefreshToken(user, refreshToken);
            return { accessToken: accessToken };
        });
    }
    authenticateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            if (authHeader === undefined) {
                throw new _index_1.InvalidTokenError();
            }
            const token = authHeader && authHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
                if (err) {
                    throw new _index_1.InvalidTokenError();
                }
                req.user = this.userService.getUserByEmail(user.email);
                next();
            });
        });
    }
    refreshToken(refreshToken, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authRepository.removeRefreshToken(refreshToken);
            let userToRefresh;
            jsonwebtoken_1.default.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET), (err, user) => {
                if (err) {
                    throw new _index_1.InvalidRefreshTokenError();
                }
                userToRefresh = user;
            });
            const user = yield this.userService.getUserByEmail(userToRefresh.email);
            const accessToken = yield this.giveAccessToken(user, res);
            return accessToken;
        });
    }
}
exports.default = AuthService;
function generateAccessToken(user) {
    const accesToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: 60 * 15 });
    return accesToken;
}
function generateRefreshToken(user) {
    const accesToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: 60 * 60 * 24 * 7 });
    return accesToken;
}
function setCookies(res, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie(String(process.env.HTTPONLY_COOKIE_NAME), refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/auth/session",
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000)
        });
    });
}

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
const User_1 = __importDefault(require("../../../user/entity/User"));
const InvalidTokenError_1 = __importDefault(require("../../errors/InvalidTokenError"));
const module_1 = require("../../module");
const bcrypt_1 = __importDefault(require("bcrypt"));
const IncorrectPasswordError_1 = __importDefault(require("../../errors/IncorrectPasswordError"));
const UserNotFound_1 = __importDefault(require("../../../user/errors/UserNotFound"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const InvalidRefreshToken_1 = __importDefault(require("../../errors/InvalidRefreshToken"));
const mockAuthRepository = {
    saveRefreshToken: jest.fn(),
    removeRefreshToken: jest.fn()
};
const mockUserService = {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    userRepository: {},
    newUser: jest.fn(),
    getUserByEmail: jest.fn(),
    comparePassword: jest.fn(),
    getUserById: jest.fn(),
    saveRefreshToken: jest.fn(),
    addRecord: jest.fn(),
    getRecords: jest.fn()
};
const mockService = new module_1.AuthService(mockUserService, mockAuthRepository);
describe('Testing all methods in AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Access Token generation and authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'leandro@gmail.com', 'pass', undefined, undefined, undefined, undefined);
        const response = { cookie: jest.fn() };
        const result = yield mockService.giveAccessToken(user, response);
        expect(mockUserService.saveRefreshToken).toBeCalledTimes(1);
        expect(result).toHaveProperty('accessToken', `${result.accessToken}`);
        const req = { headers: { authorization: `Bearer ${result.accessToken}` } };
        const res = {};
        const next = jest.fn();
        yield mockService.authenticateToken(req, res, next);
        expect(next).toBeCalledTimes(1);
    }));
    test('Testing login method', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { headers: { authorization: '' } };
        const res = {};
        const next = jest.fn();
        yield expect(mockService.authenticateToken(req, res, next)).rejects.toThrowError(InvalidTokenError_1.default);
    }));
    test('Login success', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginDto = {
            email: 'user@email.com',
            password: 'password',
            validate: jest.fn()
        };
        const salt = yield bcrypt_1.default.genSalt();
        const hash = yield bcrypt_1.default.hash(loginDto.password, salt);
        loginDto.password = hash;
        const salt2 = yield bcrypt_1.default.genSalt();
        const hash2 = yield bcrypt_1.default.hash(loginDto.password, salt2);
        yield mockUserService.getUserByEmail.mockReturnValue({ id: 1, email: loginDto.email, hash: hash2 });
        const res = { cookie: jest.fn() };
        const result = yield mockService.login(loginDto, res);
        expect(res.cookie).toBeCalledTimes(1);
        expect(mockUserService.getUserByEmail).toBeCalledTimes(1);
        expect(mockUserService.getUserByEmail).toBeCalledWith(loginDto.email);
        expect(result).toHaveProperty('accessToken', `${result.accessToken}`);
    }));
    test('Login Fail: Wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginDto = {
            email: 'user@email.com',
            password: 'password',
            validate: jest.fn()
        };
        loginDto.password = 'wrong hash';
        const salt2 = yield bcrypt_1.default.genSalt();
        const hash2 = yield bcrypt_1.default.hash('password', salt2);
        yield mockUserService.getUserByEmail.mockReturnValue({ id: 1, email: loginDto.email, hash: hash2 });
        const res = { cookie: jest.fn() };
        yield expect(mockService.login(loginDto, res)).rejects.toThrowError(IncorrectPasswordError_1.default);
    }));
    test('Login Fail: User does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginDto = {
            email: 'user@email.com',
            password: 'password',
            validate: jest.fn()
        };
        yield mockUserService.getUserByEmail.mockImplementation(() => { throw new UserNotFound_1.default(); });
        const res = { cookie: jest.fn() };
        yield expect(mockService.login(loginDto, res)).rejects.toThrowError(UserNotFound_1.default);
    }));
    test('Logout: Remove refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRefreshToken = 'refreshtoken';
        yield mockService.logout(mockRefreshToken);
        expect(mockAuthRepository.removeRefreshToken).toBeCalledTimes(1);
        expect(mockAuthRepository.removeRefreshToken).toBeCalledWith(mockRefreshToken);
    }));
    test('Refresh Token', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRefreshToken = jsonwebtoken_1.default.sign({ id: 1, email: 'mock@email.com' }, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: 60 * 60 * 24 * 7 });
        const res = { cookie: jest.fn() };
        mockUserService.getUserByEmail.mockReturnValue({ id: 1, email: 'mock@email.com', hash: 'password' });
        const result = yield mockService.refreshToken(mockRefreshToken, res);
        expect(mockAuthRepository.removeRefreshToken).toBeCalledTimes(1);
        expect(mockAuthRepository.removeRefreshToken).toBeCalledWith(mockRefreshToken);
        expect(mockUserService.getUserByEmail).toBeCalledTimes(1);
        expect(res.cookie).toBeCalled();
        expect(result).toHaveProperty('accessToken');
    }));
    test('Invalid refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRefreshToken = 'invalidtoken';
        const res = { cookie: jest.fn() };
        yield expect(mockService.refreshToken(mockRefreshToken, res)).rejects.toThrowError(InvalidRefreshToken_1.default);
    }));
});

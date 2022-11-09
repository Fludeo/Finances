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
const supertest_1 = __importDefault(require("supertest"));
const initModules_1 = __importDefault(require("../../../__test__/initModules"));
const _index_1 = require("../../../user/errors/_index");
const IncorrectPasswordError_1 = __importDefault(require("../../errors/IncorrectPasswordError"));
const InvalidRefreshToken_1 = __importDefault(require("../../errors/InvalidRefreshToken"));
describe('Testing all methods and routes in AuthController', () => {
    const { app } = (0, initModules_1.default)();
    test('Login blank fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.ValidationError('message');
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: '', password: '' });
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Login with a user that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.UserNotFound();
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'test@email.com', password: 'querty1234' });
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Login with email validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.ValidationError('some message');
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'email', password: 'qwerty14' });
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Login with password validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.ValidationError('some message');
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'test@email.com', password: 'a' });
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Login with incorrect password validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new IncorrectPasswordError_1.default();
        const response = yield (0, supertest_1.default)(app)
            .post('/user/signup')
            .send({ name: 'leandro', email: 'leandro@gmail.com', password: 'somepassword' });
        expect(response.status).toEqual(200);
        const loginResponse = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'leandro@gmail.com', password: 'wrongpassword' });
        expect(loginResponse.status).toEqual(error.code);
        expect(loginResponse.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Successfull login', () => __awaiter(void 0, void 0, void 0, function* () {
        // Signup new user
        const response = yield (0, supertest_1.default)(app)
            .post('/user/signup')
            .send({ name: 'leandro', email: 'medinaleandron@gmail.com', password: 'somepassword' });
        expect(response.status).toEqual(200);
        // Login new user
        const loginResponse = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'medinaleandron@gmail.com', password: 'somepassword' });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body).toHaveProperty('accessToken');
    }));
    test('Refresh session', () => __awaiter(void 0, void 0, void 0, function* () {
        // Register new user
        const response = yield (0, supertest_1.default)(app)
            .post('/user/signup')
            .send({ name: 'leandro', email: 'medina@gmail.com', password: 'somepassword' });
        expect(response.status).toEqual(200);
        // Login user
        const loginResponse = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'medina@gmail.com', password: 'somepassword' });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body).toHaveProperty('accessToken');
        // Refreshing session.
        // Refresh token is set in a HttpOnly cookie.
        const cookie = loginResponse.get('Set-Cookie')[0].split(';')[0];
        const refreshResponse = yield (0, supertest_1.default)(app)
            .post('/auth/session')
            .set('Cookie', cookie);
        expect(refreshResponse.status).toEqual(200);
        expect(refreshResponse.body).toHaveProperty('accessToken');
    }));
    test('Refreshing session without refreshToken', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new InvalidRefreshToken_1.default();
        // Refresh token is set in a HttpOnly cookie.
        const refreshResponse = yield (0, supertest_1.default)(app)
            .post('/auth/session');
        expect(refreshResponse.status).toEqual(error.code);
        expect(refreshResponse.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Logout current user session', () => __awaiter(void 0, void 0, void 0, function* () {
        // Register new user
        const response = yield (0, supertest_1.default)(app)
            .post('/user/signup')
            .send({ name: 'leandro', email: 'logoutuser@gmail.com', password: 'somepassword' });
        expect(response.status).toEqual(200);
        // Login user
        const loginResponse = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'logoutuser@gmail.com', password: 'somepassword' });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body).toHaveProperty('accessToken');
        const cookie = loginResponse.get('Set-Cookie')[0].split(';')[0];
        const logoutResponse = yield (0, supertest_1.default)(app)
            .post('/auth/session')
            .send({ logout: true })
            .set('Cookie', cookie);
        expect(logoutResponse.status).toEqual(200);
    }));
});

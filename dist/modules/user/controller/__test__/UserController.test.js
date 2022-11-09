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
describe('Testing all methods and routes in AuthController', () => {
    const { app } = (0, initModules_1.default)();
    test('Signup new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/user/signup')
            .send({ name: 'leandro', email: 'newuser@gmail.com', password: 'somepassword' });
        expect(response.status).toEqual(200);
    }));
    test('Signup an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { name: 'leandro', email: 'existingemail@gmail.com', password: 'somepassword' };
        const response = yield (0, supertest_1.default)(app).post('/user/signup').send(user);
        expect(response.status).toEqual(200);
        const error = new _index_1.CredentialsTaken();
        const secondResponse = yield (0, supertest_1.default)(app).post('/user/signup').send(user);
        expect(secondResponse.status).toEqual(error.code);
        expect(secondResponse.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Signup with validation errors: Wrong email format', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.ValidationError('some validation error message');
        const user = { name: 'leandro', email: 'wrongemail', password: 'somepassword' };
        const response = yield (0, supertest_1.default)(app).post('/user/signup').send(user);
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Signup with validation errors: Wrong password format', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.ValidationError('some validation error message');
        const user = { name: 'leandro', email: 'wrongpassword@email.com', password: 'pas' };
        const response = yield (0, supertest_1.default)(app).post('/user/signup').send(user);
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Signup with validation errors: blank fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new _index_1.ValidationError('some validation error message');
        const user = { name: '', email: 'blankfields@email.com', password: 'somepassword' };
        const response = yield (0, supertest_1.default)(app).post('/user/signup').send(user);
        expect(response.status).toEqual(error.code);
        expect(response.body).toHaveProperty('name', `${error.name}`);
    }));
    test('Getting user records', () => __awaiter(void 0, void 0, void 0, function* () {
        // Sign up new user
        const user = { name: 'leandro', email: 'getrecordsuser@gmail.com', password: 'somepassword' };
        const response = yield (0, supertest_1.default)(app).post('/user/signup').send(user);
        expect(response.status).toEqual(200);
        // Login new user
        const loginResponse = yield (0, supertest_1.default)(app).post('/auth/login').send({ email: user.email, password: user.password });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body).toHaveProperty('accessToken');
        const accessToken = yield loginResponse.body.accessToken;
        // Adding records
        const recordDto1 = {
            id: undefined,
            concept: 'Job',
            amount: 100,
            type: 'income',
            category: 'Salary',
            date: new Date(),
            validate: jest.fn()
        };
        const recordDto2 = {
            id: undefined,
            concept: 'Job',
            amount: 100,
            type: 'outgo',
            category: 'Services',
            date: new Date(),
            validate: jest.fn()
        };
        const response1 = yield (0, supertest_1.default)(app).post('/record/new').send(recordDto1).set('Authorization', `Bearer ${accessToken}`);
        const response2 = yield (0, supertest_1.default)(app).post('/record/new').send(recordDto2).set('Authorization', `Bearer ${accessToken}`);
        expect(response1.status).toEqual(200);
        expect(response2.status).toEqual(200);
        // Getting Records
        const getRecordsResponse = yield (0, supertest_1.default)(app).get('/user/records').set('Authorization', `Bearer ${accessToken}`);
        expect(getRecordsResponse.status).toEqual(200);
        expect(getRecordsResponse.body).toHaveProperty('records');
    }));
});

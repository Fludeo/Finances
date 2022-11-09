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
const Record_1 = __importDefault(require("../../../record/entity/Record"));
const User_1 = __importDefault(require("../../entity/User"));
const UserRepository_1 = __importDefault(require("../UserRepository"));
const mockRecordModel = {
    build: jest.fn(),
    create: jest.fn()
};
const mockUserModel = {
    destroy: jest.fn(),
    build: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn()
};
const mockAuthModel = {
    create: jest.fn()
};
const mockUserRepository = new UserRepository_1.default(mockUserModel, mockRecordModel, mockAuthModel);
describe('testing all methods in AuthRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Adding new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'newuser@email.com', 'encryptedpass');
        user;
        user.save = jest.fn();
        yield mockUserModel.build.mockReturnValue(user);
        yield mockUserRepository.addUser(user);
        expect(mockUserModel.build).toBeCalledTimes(1);
        expect(mockUserModel.build).toBeCalledWith({ name: user.name, email: user.email, hash: user.hash });
        expect(user.save).toBeCalledTimes(1);
    }));
    test('Find user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(2, 'leandro', 'findbyemail@email.com', 'encryptedpass');
        mockUserModel.findOne.mockReturnValue(user);
        const result = yield mockUserRepository.getByEmail(user.email);
        expect(mockUserModel.findOne).toBeCalledWith({ where: { email: user.email } });
        expect(result.id).toEqual(user.id);
    }));
    test('Find user by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(2, 'leandro', 'findbyid@email.com', 'encryptedpass');
        mockUserModel.findByPk.mockReturnValue(user);
        const result = yield mockUserRepository.getById(user.id);
        expect(mockUserModel.findByPk).toBeCalledWith(user.id);
        expect(result.id).toEqual(user.id);
    }));
    test('Adds record to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(2, 'leandro', 'addrecord@email.com', 'encryptedpass');
        user.addRecord = jest.fn();
        const record = new Record_1.default(undefined, 'job', 2000, 'income', 'Salary', new Date());
        mockUserModel.findByPk.mockReturnValue(user);
        yield mockUserRepository.addRecord(record, user);
        expect(mockUserModel.findByPk).toBeCalledWith(user.id);
        expect(user.addRecord).toBeCalledTimes(1);
        expect(mockRecordModel.create).toBeCalledTimes(1);
        expect(mockRecordModel.create).toBeCalledWith(record, { isNewRecord: true });
    }));
    test('Adds session token to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(2, 'leandro', 'addrecord@email.com', 'encryptedpass');
        user.addAuth = jest.fn();
        const token = 'refreshtoken';
        mockUserModel.findByPk.mockReturnValue(user);
        yield mockUserRepository.addRefreshToken(user, token);
        expect(mockUserModel.findByPk).toBeCalledWith(user.id);
        expect(user.addAuth).toBeCalledTimes(1);
    }));
    test('Get user Records', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(2, 'leandro', 'addrecord@email.com', 'encryptedpass');
        const record1 = new Record_1.default(1, 'job', 2000, 'income', 'Salary', new Date());
        const record2 = new Record_1.default(2, 'Food', 500, 'outgo', 'Food', new Date());
        user.records = [record1, record2];
        mockUserModel.findByPk.mockReturnValue(user);
        const result = yield mockUserRepository.getRecords(user);
        expect(mockUserModel.findByPk).toBeCalledTimes(1);
        expect(result.records).toEqual(user.records);
    }));
});

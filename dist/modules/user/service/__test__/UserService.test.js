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
const UserService_1 = __importDefault(require("../UserService"));
const Record_1 = __importDefault(require("../../../record/entity/Record"));
const User_1 = __importDefault(require("../../entity/User"));
const UserNotFound_1 = __importDefault(require("../../errors/UserNotFound"));
const UserNotDefined_1 = __importDefault(require("../../errors/UserNotDefined"));
const CredentialsTaken_1 = __importDefault(require("../../errors/CredentialsTaken"));
const mockUserRepository = {
    userModel: jest.fn(),
    addUser: jest.fn(),
    getByEmail: jest.fn(),
    getById: jest.fn(),
    addRefreshToken: jest.fn(),
    addRecord: jest.fn(),
    getRecords: jest.fn()
};
const mockService = new UserService_1.default(mockUserRepository);
describe('Testing all methods in UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Get user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = new User_1.default(1, 'leandro', 'getuser@email.com', 'encriptedpass');
        mockUserRepository.getByEmail.mockReturnValue(mockUser);
        const user = yield mockService.getUserByEmail(mockUser.email);
        expect(mockUserRepository.getByEmail).toBeCalledTimes(1);
        expect(mockUserRepository.getByEmail).toBeCalledWith(mockUser.email);
        expect(user).toEqual(mockUser);
    }));
    test('Get not existing user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = new User_1.default(1, 'leandro', 'getuser@email.com', 'encriptedpass');
        mockUserRepository.getByEmail.mockReturnValue(null);
        yield expect(mockService.getUserByEmail(mockUser.email)).rejects.toThrowError(UserNotFound_1.default);
        expect(mockUserRepository.getByEmail).toBeCalledTimes(1);
        expect(mockUserRepository.getByEmail).toBeCalledWith(mockUser.email);
    }));
    test('Get user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = new User_1.default(1, 'leandro', 'getuser@email.com', 'encriptedpass');
        mockUserRepository.getById.mockReturnValue(mockUser);
        const user = yield mockService.getUserById(mockUser.id);
        expect(mockUserRepository.getById).toBeCalledTimes(1);
        expect(mockUserRepository.getById).toBeCalledWith(mockUser.id);
        expect(user).toEqual(mockUser);
    }));
    test('Get not existing user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = new User_1.default(1, 'leandro', 'getuser@email.com', 'encriptedpass');
        mockUserRepository.getById.mockReturnValue(null);
        yield expect(mockService.getUserById(mockUser.id)).rejects.toThrowError(UserNotFound_1.default);
        expect(mockUserRepository.getById).toBeCalledTimes(1);
        expect(mockUserRepository.getById).toBeCalledWith(mockUser.id);
    }));
    test('Adding new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockNewUser = new User_1.default(undefined, 'leandro', 'getuser@email.com', 'encriptedpass');
        const mockReturnedUser = new User_1.default(1, 'leandro', 'getuser@email.com', 'encriptedpass');
        mockUserRepository.addUser.mockReturnValue(mockReturnedUser);
        expect(yield mockService.newUser(mockNewUser)).toEqual(mockReturnedUser);
        expect(mockUserRepository.addUser).toBeCalledTimes(1);
        expect(mockUserRepository.addUser).toBeCalledWith(mockNewUser);
        expect(mockUserRepository.getByEmail).toBeCalledTimes(1);
        expect(mockUserRepository.getByEmail).toBeCalledWith(mockNewUser.email);
    }));
    test('User entity not defined', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockNewUser = {
            id: undefined,
            name: 'leandro',
            email: 'user@email.com',
            hash: 'passsword',
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
            records: undefined
        };
        yield expect(mockService.newUser(mockNewUser)).rejects.toThrowError(UserNotDefined_1.default);
    }));
    test('User already exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockNewUser = new User_1.default(undefined, 'leandro', 'getuser@email.com', 'encriptedpass');
        mockUserRepository.getByEmail.mockReturnValue(mockNewUser);
        yield expect(mockService.newUser(mockNewUser)).rejects.toThrowError(CredentialsTaken_1.default);
        expect(mockUserRepository.getByEmail).toBeCalledTimes(1);
        expect(mockUserRepository.getByEmail).toBeCalledWith(mockNewUser.email);
    }));
    test('Adds refresh token to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'getuser@email.com', 'encriptedpass');
        const token = 'refreshtoken';
        yield mockService.saveRefreshToken(user, token);
        expect(mockUserRepository.addRefreshToken).toBeCalledTimes(1);
        expect(mockUserRepository.addRefreshToken).toBeCalledWith(user, token);
    }));
    test('Adds record to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(2, 'leandro', 'addrecord@email.com', 'password');
        const record = new Record_1.default(undefined, 'job', 2000, 'income', 'Salary', new Date());
        yield mockService.addRecord(record, user);
        expect(mockUserRepository.addRecord).toBeCalledTimes(1);
        expect(mockUserRepository.addRecord).toBeCalledWith(record, user);
    }));
});

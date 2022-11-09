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
const Record_1 = __importDefault(require("../../entity/Record"));
const RecordRepository_1 = __importDefault(require("../RecordRepository"));
const mockRecordModel = {
    destroy: jest.fn(),
    build: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn()
};
const mockUserModel = {
    destroy: jest.fn(),
    build: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
};
const mockRecordRepository = new RecordRepository_1.default(mockRecordModel, mockUserModel);
describe('testing all methods in AuthRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Adding record to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'record@email.com', 'encriptedpass');
        const record = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        record.setUser = jest.fn();
        mockRecordModel.create.mockReturnValue(record);
        yield mockRecordRepository.addRecord(record, user);
        expect(mockRecordModel.create).toBeCalledTimes(1);
        expect(mockUserModel.findByPk).toBeCalledTimes(1);
    }));
    test('Deleting record by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const record = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        yield mockRecordRepository.deleteRecordById(record.id);
        expect(mockRecordModel.destroy).toBeCalledTimes(1);
    }));
    test('Getting all user records', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'record@email.com', 'encriptedpass');
        const record1 = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        const record2 = new Record_1.default(2, 'Food', 2000, 'outgo', 'Food', new Date());
        mockRecordModel.findAll.mockReturnValue([record1, record2]);
        const allRecords = yield mockRecordRepository.getAll(user);
        expect(mockRecordModel.findAll).toBeCalledTimes(1);
        expect(allRecords).toEqual([record1, record2]);
    }));
    test('Getting record by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const record1 = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        mockRecordModel.findByPk.mockReturnValue(record1);
        const record = yield mockRecordRepository.getRecordById(record1.id);
        expect(mockRecordModel.findByPk).toBeCalledTimes(1);
        expect(record).toEqual(record1);
    }));
    test('Getting record by query', () => __awaiter(void 0, void 0, void 0, function* () {
        const record1 = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date(), 5);
        mockRecordModel.findAll.mockReturnValue(record1);
        const query = { where: { user_id: 5 } };
        const record = yield mockRecordRepository.getRecords(query);
        expect(mockRecordModel.findAll).toBeCalledTimes(1);
        expect(record).toEqual(record1);
    }));
    test('Getting record by query', () => __awaiter(void 0, void 0, void 0, function* () {
        const record1 = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        mockRecordModel.update.mockReturnValue(record1);
        yield mockRecordRepository.updateRecord(record1);
        expect(mockRecordModel.update).toBeCalledTimes(1);
    }));
});

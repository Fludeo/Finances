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
const RecordNotDefined_1 = __importDefault(require("../../errors/RecordNotDefined"));
const RecordService_1 = __importDefault(require("../RecordService"));
const mockRecordRepository = {
    recordModel: jest.fn(),
    getRecordById: jest.fn(),
    addRecord: jest.fn(),
    getRecords: jest.fn(),
    getAll: jest.fn(),
    deleteRecordById: jest.fn(),
    updateRecord: jest.fn()
};
const mockService = new RecordService_1.default(mockRecordRepository);
describe('Testing all methods in RecordService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Add new record to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'record@email.com', 'encriptedpass');
        const record = new Record_1.default(undefined, 'Food', 500, 'outgo', 'Food', new Date());
        yield mockService.addRecord(record, user);
        expect(mockRecordRepository.addRecord).toBeCalledTimes(1);
    }));
    test('Add not defined record to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'record@email.com', 'encriptedpass');
        const record = { id: undefined, concept: 'Food', amount: 500, type: 'outgo', category: 'Food', date: new Date() };
        yield expect(mockService.addRecord(record, user)).rejects.toThrowError(RecordNotDefined_1.default);
    }));
    test('Deleting record by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const record = new Record_1.default(1, 'Food', 500, 'outgo', 'Food', new Date(), 1);
        yield mockService.deleteRecordById(record.id);
        expect(mockRecordRepository.deleteRecordById).toBeCalledTimes(1);
    }));
    test('Getting total balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default(1, 'leandro', 'record@email.com', 'encriptedpass');
        const record1 = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        const record2 = new Record_1.default(2, 'Food', 500, 'outgo', 'Food', new Date());
        const record3 = new Record_1.default(3, 'Freelance job', 2000, 'income', 'Freelance job', new Date());
        const record4 = new Record_1.default(4, 'Food', 500, 'outgo', 'Food', new Date());
        mockRecordRepository.getAll.mockReturnValue([record1, record2, record3, record4]);
        const balance = yield mockService.getBalance(user);
        expect(mockRecordRepository.getAll).toBeCalledTimes(1);
        expect(balance).toEqual(record1.amount + record3.amount - record2.amount - record4.amount);
    }));
    test('Getting record by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const record = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        mockRecordRepository.getRecordById.mockReturnValue(record);
        const result = yield mockService.getRecordById(record.id);
        expect(result).toEqual(record);
    }));
    test('Get all records from user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield mockService.getRecords({ where: {} });
        expect(mockRecordRepository.getRecords).toBeCalledTimes(1);
    }));
    test('Updating not defined record', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedRecord = { id: 1, cocept: 'Job', amount: 2000, type: 'income', category: 'Salary', date: new Date() };
        yield expect(mockService.updateRecord(updatedRecord)).rejects.toThrowError(RecordNotDefined_1.default);
    }));
    test('Updating record', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedRecord = new Record_1.default(1, 'Job', 2000, 'income', 'Salary', new Date());
        yield mockService.updateRecord(updatedRecord);
        expect(mockRecordRepository.updateRecord).toBeCalledTimes(1);
    }));
});

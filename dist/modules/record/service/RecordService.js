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
const Record_1 = __importDefault(require("../entity/Record"));
const __index_1 = require("../errors/__index");
class RecordService {
    constructor(recordRepository) {
        this.recordRepository = recordRepository;
    }
    addRecord(record, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(record instanceof Record_1.default)) {
                throw new __index_1.RecordNotDefined();
            }
            yield this.recordRepository.addRecord(record, user);
        });
    }
    updateRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(record instanceof Record_1.default)) {
                throw new __index_1.RecordNotDefined();
            }
            return yield this.recordRepository.updateRecord(record);
        });
    }
    getRecords(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordRepository.getRecords(query);
        });
    }
    getRecordById(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordRepository.getRecordById(recordId);
        });
    }
    deleteRecordById(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recordRepository.deleteRecordById(recordId);
        });
    }
    getBalance(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const allRecords = yield this.recordRepository.getAll(user);
            const balance = allRecords.reduce(balanceReducer, { amount: 0 });
            const result = balance.amount;
            return result;
        });
    }
}
exports.default = RecordService;
const balanceReducer = (prev, current) => {
    let result = prev.amount;
    current.type === 'income' ? result += current.amount : result -= current.amount;
    return { amount: result };
};

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
const fromRecordModelToEntity_1 = __importDefault(require("../mapper/fromRecordModelToEntity"));
class RecordRepository {
    constructor(recordModel, userModel) {
        this.recordModel = recordModel;
        this.userModel = userModel;
    }
    addRecord(newRecord, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.recordModel.create(newRecord, { isNewRecord: true });
            const userToAdd = yield this.userModel.findByPk(user.id);
            yield record.setUser(userToAdd);
        });
    }
    updateRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recordModel.update(record, { where: { id: record.id } });
        });
    }
    getRecords(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query.order = [
                ['createdAt', 'DESC']
            ];
            const records = yield this.recordModel.findAll(query);
            return records;
        });
    }
    getRecordById(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.recordModel.findByPk(recordId);
            return (0, fromRecordModelToEntity_1.default)(record);
        });
    }
    deleteRecordById(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recordModel.destroy({ where: { id: recordId } });
        });
    }
    getAll(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.recordModel.findAll({ where: { user_id: user.id } });
            return records.map((record) => (0, fromRecordModelToEntity_1.default)(record));
        });
    }
}
exports.default = RecordRepository;

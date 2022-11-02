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
const AuthModel_1 = __importDefault(require("../../auth/model/AuthModel"));
const RecordModel_1 = __importDefault(require("../../record/model/RecordModel"));
const fromUserModelToEntity_1 = __importDefault(require("../mapper/fromUserModelToEntity"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    addUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = UserModel_1.default.build({
                name: newUser.name,
                email: newUser.email,
                hash: newUser.hash,
            });
            yield user.save();
            return user;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ where: { email: email } });
            if (user === null)
                return null;
            return (0, fromUserModelToEntity_1.default)(user);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findByPk(id);
            if (user === null)
                return null;
            return (0, fromUserModelToEntity_1.default)(user);
        });
    }
    addRefreshToken(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshUser = yield this.userModel.findByPk(user.id);
            const refreshToken = yield AuthModel_1.default.create({ refreshToken: token }, { isNewRecord: true });
            yield (refreshUser === null || refreshUser === void 0 ? void 0 : refreshUser.addAuth(refreshToken));
        });
    }
    addRecord(newRecord, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToAddRecord = yield this.userModel.findByPk(user.id);
            const recordToAdd = yield RecordModel_1.default.create({ newRecord }, { isNewRecord: true });
            yield (userToAddRecord === null || userToAddRecord === void 0 ? void 0 : userToAddRecord.addRecord(recordToAdd));
        });
    }
    getRecords(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithRecords = yield this.userModel.findByPk(user.id, { include: 'records', order: [['records', 'createdAt', 'DESC']] });
            return (0, fromUserModelToEntity_1.default)(userWithRecords);
        });
    }
}
exports.default = UserRepository;

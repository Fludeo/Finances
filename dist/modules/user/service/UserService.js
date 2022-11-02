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
const User_1 = __importDefault(require("../entity/User"));
const _index_1 = require("../errors/_index");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    newUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(newUser instanceof User_1.default)) {
                throw new _index_1.UserNotDefined();
            }
            if (yield this.userRepository.getByEmail(newUser.email)) {
                throw new _index_1.CredentialsTaken();
            }
            return this.userRepository.addUser(newUser);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(email);
            if (user === null) {
                throw new _index_1.UserNotFound();
            }
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(id);
            if (user === null) {
                throw new _index_1.UserNotFound();
            }
            return user;
        });
    }
    saveRefreshToken(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.addRefreshToken(user, token);
        });
    }
    addRecord(record, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.addRecord(record, user);
        });
    }
    getRecords(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithRecords = yield this.userRepository.getRecords(user);
            return userWithRecords.records;
        });
    }
}
exports.default = UserService;

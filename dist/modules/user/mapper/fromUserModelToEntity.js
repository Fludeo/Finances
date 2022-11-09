"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fromRecordModelToEntity_1 = __importDefault(require("../../record/mapper/fromRecordModelToEntity"));
const User_1 = __importDefault(require("../entity/User"));
function FromUserModelToEntity({ id, name, email, hash, createdAt, updatedAt, deletedAt, records }) {
    const user = new User_1.default(id, name, email, hash, createdAt, updatedAt, deletedAt, records === null || records === void 0 ? void 0 : records.map((record) => (0, fromRecordModelToEntity_1.default)(record)));
    return user;
}
exports.default = FromUserModelToEntity;
;

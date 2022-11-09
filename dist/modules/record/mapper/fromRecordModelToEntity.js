"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const Record_1 = __importDefault(require("../entity/Record"));
function fromRecordModelToEntity({ id, concept, date, amount, type, category, user_id, createdAt, updatedAt, deletedAt }) {
    const record = new Record_1.default(id, concept, amount, type, category, date, user_id, createdAt, updatedAt, deletedAt);
    return record;
}
exports.default = fromRecordModelToEntity;

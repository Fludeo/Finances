"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Record_1 = __importDefault(require("../entity/Record"));
function FromRecordDtoToEntity({ id, concept, date, amount, type, category }) {
    const record = new Record_1.default(id, concept, amount, type, category, date);
    return record;
}
exports.default = FromRecordDtoToEntity;

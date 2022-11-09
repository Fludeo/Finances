"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entity/User"));
function FromUserDtoToEntity({ id, name, email, password }) {
    const user = new User_1.default(id, name, email, password);
    return user;
}
exports.default = FromUserDtoToEntity;

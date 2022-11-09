"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("../../user/errors/ValidationError"));
class LoginDto {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }
    validate() {
        if (this.email === undefined || this.password === undefined) {
            throw new ValidationError_1.default('There is an empty field...');
        }
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/.test(this.email))) {
            throw new ValidationError_1.default('Invalid email!!!');
        }
        if (!(/^[A-Za-z]\w{7,14}$/.test(this.password))) {
            throw new ValidationError_1.default('Invalid Password: 8-16 characters including numbers and starting with a letter');
        }
    }
}
exports.default = LoginDto;

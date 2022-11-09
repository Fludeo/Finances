"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
class UserDto {
    constructor({ id, email, name, password }) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }
    validate() {
        if (this.email === undefined || this.name === undefined || this.password === undefined) {
            throw new ValidationError_1.default('There is an empty field...');
        }
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/.test(this.email))) {
            throw new ValidationError_1.default('Invalid email!!!');
        }
        if (!(/^[a-zA-Z ]{2,30}$/.test(this.name))) {
            throw new ValidationError_1.default('Invalid Name: 2-30 characters excluding numbers and symbols');
        }
        if (!(/^[A-Za-z]\w{7,14}$/.test(this.password))) {
            throw new ValidationError_1.default('Invalid Password: 8-16 characters including numbers and starting with a letter');
        }
    }
}
exports.default = UserDto;

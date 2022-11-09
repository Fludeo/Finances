"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotDefined extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'User not defined!!!';
        this.code = 400;
    }
}
exports.default = UserNotDefined;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotFound extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'User not found';
        this.code = 400;
    }
}
exports.default = UserNotFound;

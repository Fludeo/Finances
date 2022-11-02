"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IncorrectPasswordError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'Wrong password';
        this.code = 401;
    }
}
exports.default = IncorrectPasswordError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidTokenError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'Invalid access token';
        this.code = 401;
    }
}
exports.default = InvalidTokenError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidRefreshTokenError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'No refresh token';
        this.code = 401;
    }
}
exports.default = InvalidRefreshTokenError;

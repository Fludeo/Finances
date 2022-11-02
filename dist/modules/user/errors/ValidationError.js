"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(msg) {
        super();
        if (msg)
            this.message = msg;
        this.code = 400;
    }
}
exports.default = ValidationError;

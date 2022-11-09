"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(msg) {
        super();
        this.name = this.constructor.name;
        if (msg !== '')
            this.message = msg;
        this.code = 400;
    }
}
exports.default = ValidationError;

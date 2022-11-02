"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecordNotDefined extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'object is not defined as instance of Record';
        this.code = 400;
    }
}
exports.default = RecordNotDefined;

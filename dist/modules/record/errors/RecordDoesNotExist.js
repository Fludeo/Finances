"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecordDoesNotExist extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'Record does not exist in this user';
        this.code = 400;
    }
}
exports.default = RecordDoesNotExist;

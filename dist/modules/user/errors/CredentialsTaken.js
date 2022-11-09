"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CredentialsTaken extends Error {
    constructor(email = null) {
        super();
        this.name = this.constructor.name;
        this.message = 'Credentials taken';
        this.code = 400;
    }
}
exports.default = CredentialsTaken;

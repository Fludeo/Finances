"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id = undefined, name, email, hash, createdAt = undefined, updatedAt = undefined, deletedAt = undefined, records = undefined) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.hash = hash;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.records = records;
    }
}
exports.default = User;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Record {
    constructor(id, concept, amount, type, category, date, userId = undefined, createdAt = undefined, updatedAt = undefined, deletedAt = undefined) {
        this.id = id;
        this.concept = concept;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.date = date;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
exports.default = Record;
;

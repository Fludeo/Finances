"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../../user/errors/_index");
class RecordDto {
    constructor({ id, concept, amount, type, category, date }) {
        this.id = Number(id);
        this.concept = concept;
        this.amount = Number(amount);
        this.type = type;
        this.category = category;
        this.date = date;
    }
    validate() {
        if (this.concept === undefined || this.concept === '' ||
            this.amount === undefined || String(this.amount) === '' ||
            this.type === undefined || this.type === '' ||
            this.category === undefined || this.category === '' ||
            this.date === undefined || String(this.date) === '') {
            throw new _index_1.ValidationError('No blank fields');
        }
    }
}
exports.default = RecordDto;

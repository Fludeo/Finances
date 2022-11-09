"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RecordDto_1 = __importDefault(require("../dto/RecordDto"));
const fromRecordDtotoEntity_1 = __importDefault(require("../mapper/fromRecordDtotoEntity"));
class RecordController {
    constructor(recordService, authService) {
        this.authService = authService;
        this.recordService = recordService;
        this.baseRoute = '/record';
    }
    configureRoutes(app) {
        const BASEROUTE = this.baseRoute;
        app.get(`${BASEROUTE}/balance`, this.authService.authenticateToken, this.getBalance.bind(this));
        app.get(`${BASEROUTE}/get/:quantity?/type/:type?/category/:category?`, this.authService.authenticateToken, this.getRecords.bind(this));
        app.delete(`${BASEROUTE}/delete/:id`, this.authService.authenticateToken, this.deleteRecordById.bind(this));
        app.post(`${BASEROUTE}/new`, this.authService.authenticateToken, this.addRecord.bind(this));
        app.put(`${BASEROUTE}/update`, this.authService.authenticateToken, this.updateRecord.bind(this));
    }
    updateRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordDto = new RecordDto_1.default(req.body);
            try {
                recordDto.validate();
                yield this.recordService.updateRecord((0, fromRecordDtotoEntity_1.default)(recordDto));
                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = { where: {} };
            req.params.quantity !== undefined && (filters.limit = Number(req.params.quantity));
            req.user.id !== undefined && (filters.where.user_id = req.user.id);
            req.params.type !== undefined && (filters.where.type = req.params.type);
            req.params.category !== undefined && (filters.where.category = req.params.category);
            console.log(filters);
            try {
                const records = yield this.recordService.getRecords(filters);
                res.status(200);
                res.json({ records });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getBalance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const balance = yield this.recordService.getBalance(user);
                res.status(200);
                res.json({ balance });
            }
            catch (err) {
                next(err);
            }
        });
    }
    addRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordDto = new RecordDto_1.default(req.body);
            const user = req.user;
            try {
                recordDto.validate();
                const record = (0, fromRecordDtotoEntity_1.default)(recordDto);
                yield this.recordService.addRecord(record, user);
                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteRecordById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordId = Number(req.params.id);
            try {
                yield this.recordService.deleteRecordById(recordId);
                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = RecordController;

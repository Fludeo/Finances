"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModel = exports.RecordRepository = exports.RecordService = exports.RecordController = exports.initRecordModule = void 0;
const RecordController_1 = __importDefault(require("./controller/RecordController"));
exports.RecordController = RecordController_1.default;
const RecordService_1 = __importDefault(require("./service/RecordService"));
exports.RecordService = RecordService_1.default;
const RecordRepository_1 = __importDefault(require("./repository/RecordRepository"));
exports.RecordRepository = RecordRepository_1.default;
const RecordModel_1 = __importDefault(require("./model/RecordModel"));
exports.RecordModel = RecordModel_1.default;
const initRecordModule = (container, app) => {
    const controller = container.get('RecordController');
    controller.configureRoutes(app);
};
exports.initRecordModule = initRecordModule;

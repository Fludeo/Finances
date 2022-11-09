"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rsdi_1 = __importStar(require("rsdi"));
const sequelize_1 = require("sequelize");
const module_1 = require("../modules/record/module");
const module_2 = require("../modules/user/module");
const module_3 = require("../modules/auth/module");
const data_associations_1 = __importDefault(require("./data_associations"));
const dbConfig = () => {
    if (process.env.PROJECT_STATUS === 'development') {
        const sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: './data/development_database.db'
        });
        return sequelize;
    }
    else if (process.env.PROJECT_STATUS === 'test') {
        const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
        return sequelize;
    }
    else if (process.env.PROJECT_STATUS === 'production') {
        const sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: './data/production_database.db'
        });
        return sequelize;
    }
    throw Error('PROJECT_STATUS  env variable not found');
};
function configureAuthModel(container) {
    return module_3.AuthModel.setup(container.get('sequelize'));
}
function configureRecordModel(container) {
    return module_1.RecordModel.setup(container.get('sequelize'));
}
function configureUserModel(container) {
    return module_2.UserModel.setup(container.get('sequelize'));
}
function addCommonDefinitions(container) {
    container.add({
        sequelize: (0, rsdi_1.factory)(dbConfig)
    });
}
function addRecordDefinitions(container) {
    container.add({
        RecordController: (0, rsdi_1.object)(module_1.RecordController).construct((0, rsdi_1.use)(module_1.RecordService), (0, rsdi_1.use)(module_3.AuthService)),
        RecordService: (0, rsdi_1.object)(module_1.RecordService).construct((0, rsdi_1.use)(module_1.RecordRepository)),
        RecordRepository: (0, rsdi_1.object)(module_1.RecordRepository).construct((0, rsdi_1.use)(module_1.RecordModel), (0, rsdi_1.use)(module_2.UserModel)),
        RecordModel: (0, rsdi_1.factory)(configureRecordModel)
    });
}
function addUserDefinitions(container) {
    container.add({
        UserController: (0, rsdi_1.object)(module_2.UserController).construct((0, rsdi_1.use)(module_2.UserService), (0, rsdi_1.use)(module_3.AuthService)),
        UserService: (0, rsdi_1.object)(module_2.UserService).construct((0, rsdi_1.use)(module_2.UserRepository)),
        UserRepository: (0, rsdi_1.object)(module_2.UserRepository).construct((0, rsdi_1.use)(module_2.UserModel), (0, rsdi_1.use)(module_1.RecordModel), (0, rsdi_1.use)(module_3.AuthModel)),
        UserModel: (0, rsdi_1.factory)(configureUserModel)
    });
}
function addAuthDefinitions(container) {
    container.add({
        AuthController: (0, rsdi_1.object)(module_3.AuthController).construct((0, rsdi_1.use)(module_3.AuthService)),
        AuthService: (0, rsdi_1.object)(module_3.AuthService).construct((0, rsdi_1.use)(module_2.UserService), (0, rsdi_1.use)(module_3.AuthRepository)),
        AuthRepository: (0, rsdi_1.object)(module_3.AuthRepository).construct((0, rsdi_1.use)(module_3.AuthModel)),
        AuthModel: (0, rsdi_1.factory)(configureAuthModel)
    });
}
function ConfigDIC() {
    const container = new rsdi_1.default();
    addCommonDefinitions(container);
    addAuthDefinitions(container);
    addRecordDefinitions(container);
    addUserDefinitions(container);
    container.get('sequelize').sync();
    (0, data_associations_1.default)(container);
    return container;
}
exports.default = ConfigDIC;
;

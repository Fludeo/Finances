"use strict";
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
const initModules_1 = __importDefault(require("../../modules/__test__/initModules"));
describe('DI is loading the right dependencies', () => {
    const { container } = (0, initModules_1.default)();
    const definitions = container.resolvers;
    test('DI is loading the right top level dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(definitions).toHaveProperty('sequelize');
        expect(definitions).toHaveProperty('AuthController');
        expect(definitions).toHaveProperty('AuthService');
        expect(definitions).toHaveProperty('AuthRepository');
        expect(definitions).toHaveProperty('AuthModel');
        expect(definitions).toHaveProperty('UserController');
        expect(definitions).toHaveProperty('UserService');
        expect(definitions).toHaveProperty('UserRepository');
        expect(definitions).toHaveProperty('UserModel');
        expect(definitions).toHaveProperty('RecordController');
        expect(definitions).toHaveProperty('RecordService');
        expect(definitions).toHaveProperty('RecordRepository');
        expect(definitions).toHaveProperty('RecordModel');
    }));
    test('AuthController is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { AuthController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'AuthService' })
        ];
        expect(AuthController.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('AuthService is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { AuthService } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'AuthRepository' }),
            expect.objectContaining({ existingDefinitionName: 'UserService' })
        ];
        expect(AuthService.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('AuthRepository is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { AuthRepository } = definitions;
        const expected = [expect.objectContaining({ existingDefinitionName: 'AuthModel' })];
        expect(AuthRepository.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('UserController is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { UserController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'UserService' }),
            expect.objectContaining({ existingDefinitionName: 'AuthService' })
        ];
        expect(UserController.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('UserService is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { UserService } = definitions;
        const expected = [expect.objectContaining({ existingDefinitionName: 'UserRepository' })];
        expect(UserService.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('UserRepository is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { UserRepository } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'UserModel' }),
            expect.objectContaining({ existingDefinitionName: 'AuthModel' }),
            expect.objectContaining({ existingDefinitionName: 'RecordModel' })
        ];
        expect(UserRepository.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('RecordController is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { RecordController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'AuthService' }),
            expect.objectContaining({ existingDefinitionName: 'RecordService' })
        ];
        expect(RecordController.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('RecordService is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { RecordService } = definitions;
        const expected = [expect.objectContaining({ existingDefinitionName: 'RecordRepository' })];
        expect(RecordService.deps).toEqual(expect.arrayContaining(expected));
    }));
    test('RecordRepository is constructed with the right dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const { RecordRepository } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'RecordModel' }),
            expect.objectContaining({ existingDefinitionName: 'UserModel' })
        ];
        expect(RecordRepository.deps).toEqual(expect.arrayContaining(expected));
    }));
});

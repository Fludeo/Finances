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
const AuthRepository_1 = __importDefault(require("../AuthRepository"));
const mockAuthModel = {
    destroy: jest.fn(),
    build: jest.fn()
};
const mockAuthRepository = new AuthRepository_1.default(mockAuthModel);
describe('testing all methods in AuthRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Save session token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = 'refreshtoken';
        const savedToken = {
            save: jest.fn(),
            refreshToken: token
        };
        savedToken.save.mockReturnValue({ refreshToken: token });
        mockAuthModel.build.mockReturnValue(savedToken);
        const result = yield mockAuthRepository.saveRefreshToken(token);
        expect(mockAuthModel.build).toBeCalledTimes(1);
        expect(mockAuthModel.build).toBeCalledWith({ refreshToken: token });
        expect(result).toHaveProperty('refreshToken', token);
    }));
    test('Removes session token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = 'refreshtoken';
        mockAuthModel.destroy.mockReturnValue({ refreshToken: token });
        yield mockAuthRepository.removeRefreshToken(token);
        expect(mockAuthModel.destroy).toBeCalledTimes(1);
        expect(mockAuthModel.destroy).toBeCalledWith({ where: { refreshToken: token } });
    }));
});

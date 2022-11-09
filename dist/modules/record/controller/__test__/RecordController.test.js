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
const supertest_1 = __importDefault(require("supertest"));
const initModules_1 = __importDefault(require("../../../__test__/initModules"));
const Record_1 = __importDefault(require("../../entity/Record"));
describe('Testing all methods and routes in AuthController', () => {
    const { app } = (0, initModules_1.default)();
    test('Adding record to user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Signup new user
        const response = yield (0, supertest_1.default)(app)
            .post('/user/signup')
            .send({ name: 'leandro', email: 'medinaleandron@gmail.com', password: 'somepassword' });
        expect(response.status).toEqual(200);
        // Login new user
        const loginResponse = yield (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'medinaleandron@gmail.com', password: 'somepassword' });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body).toHaveProperty('accessToken');
        const accessToken = loginResponse.body.accessToken;
        const record1 = new Record_1.default(undefined, 'Job', 2000, 'income', 'Salary', new Date());
        const record2 = new Record_1.default(undefined, 'Food', 500, 'outgo', 'Food', new Date());
        const record3 = new Record_1.default(undefined, 'Freelance job', 2000, 'income', 'Freelance job', new Date());
        const record4 = new Record_1.default(undefined, 'Food', 500, 'outgo', 'Food', new Date());
        // Adding 4 records
        const addRecordResponse1 = yield (0, supertest_1.default)(app).post('/record/new').send(record1).set('Authorization', `Bearer ${accessToken}`);
        const addRecordResponse2 = yield (0, supertest_1.default)(app).post('/record/new').send(record2).set('Authorization', `Bearer ${accessToken}`);
        const addRecordResponse3 = yield (0, supertest_1.default)(app).post('/record/new').send(record3).set('Authorization', `Bearer ${accessToken}`);
        const addRecordResponse4 = yield (0, supertest_1.default)(app).post('/record/new').send(record4).set('Authorization', `Bearer ${accessToken}`);
        expect(addRecordResponse1.status).toEqual(200);
        expect(addRecordResponse2.status).toEqual(200);
        expect(addRecordResponse3.status).toEqual(200);
        expect(addRecordResponse4.status).toEqual(200);
        // Getting all records (4 in this case)
        const records = yield (0, supertest_1.default)(app).get('/record/get/type/category/').set('Authorization', `Bearer ${accessToken}`);
        expect(records.status).toEqual(200);
        expect(records.body.records.length).toEqual(4);
        // Getting records type income
        const incomeRecords = yield (0, supertest_1.default)(app).get('/record/get/type/income/category/').set('Authorization', `Bearer ${accessToken}`);
        expect(incomeRecords.status).toEqual(200);
        expect(incomeRecords.body.records.length).toEqual(2);
        expect(incomeRecords.body.records[0]).toHaveProperty('type', 'income');
        // Getting 1 record with category Salary
        const categoryRecord = yield (0, supertest_1.default)(app).get('/record/get/1/type/income/category/Salary').set('Authorization', `Bearer ${accessToken}`);
        expect(categoryRecord.status).toEqual(200);
        expect(categoryRecord.body.records.length).toEqual(1);
        expect(categoryRecord.body.records[0]).toHaveProperty('category', 'Salary');
        // Deleting id 1 record
        const deleteRecord = yield (0, supertest_1.default)(app).delete('/record/delete/1').set('Authorization', `Bearer ${accessToken}`);
        expect(deleteRecord.status).toEqual(200);
        // Getting all records (should be 3 after delete)
        const afterDeleteRecord = yield (0, supertest_1.default)(app).get('/record/get/type/category/').set('Authorization', `Bearer ${accessToken}`);
        expect(afterDeleteRecord.status).toEqual(200);
        expect(afterDeleteRecord.body.records.length).toEqual(3);
        // Updating record with id 3
        record3.concept = 'updated concept';
        record3.id = 3;
        const updatedRecord = yield (0, supertest_1.default)(app).put('/record/update').send(record3).set('Authorization', `Bearer ${accessToken}`);
        expect(updatedRecord.status).toEqual(200);
        // Getting updated record
        const gettingUpdatedRecord = yield (0, supertest_1.default)(app).get('/record/get/type/income/category/Freelance job').set('Authorization', `Bearer ${accessToken}`);
        expect(gettingUpdatedRecord.status).toEqual(200);
        expect(gettingUpdatedRecord.body.records[0].concept).toEqual(record3.concept);
        // Getting balance
        const balance = yield (0, supertest_1.default)(app).get('/record/balance').set('Authorization', `Bearer ${accessToken}`);
        expect(balance.status).toEqual(200);
        expect(balance.body).toHaveProperty('balance', record3.amount - record2.amount - record4.amount);
    }));
});

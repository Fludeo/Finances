
import request from 'supertest'
import AppBootstrapper from '../../../__test__/initModules'
import Record from '../../entity/Record'

describe('Testing all methods and routes in AuthController', () => {
  const { app } = AppBootstrapper()

  test('Adding record to user', async () => {
    // Signup new user
    const response = await request(app)
      .post('/user/signup')
      .send({ name: 'leandro', email: 'medinaleandron@gmail.com', password: 'somepassword' })
    expect(response.status).toEqual(200)

    // Login new user
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'medinaleandron@gmail.com', password: 'somepassword' })

    expect(loginResponse.status).toEqual(200)
    expect(loginResponse.body).toHaveProperty('accessToken')

    const accessToken: string = loginResponse.body.accessToken

    const record1 = new Record(undefined, 'Job', 2000, 'income', 'Salary', new Date())
    const record2 = new Record(undefined, 'Food', 500, 'outgo', 'Food', new Date())
    const record3 = new Record(undefined, 'Freelance job', 2000, 'income', 'Freelance job', new Date())
    const record4 = new Record(undefined, 'Food', 500, 'outgo', 'Food', new Date())

    // Adding 4 records
    const addRecordResponse1 = await request(app).post('/record/new').send(record1).set('Authorization', `Bearer ${accessToken}`)
    const addRecordResponse2 = await request(app).post('/record/new').send(record2).set('Authorization', `Bearer ${accessToken}`)
    const addRecordResponse3 = await request(app).post('/record/new').send(record3).set('Authorization', `Bearer ${accessToken}`)
    const addRecordResponse4 = await request(app).post('/record/new').send(record4).set('Authorization', `Bearer ${accessToken}`)

    expect(addRecordResponse1.status).toEqual(200)
    expect(addRecordResponse2.status).toEqual(200)
    expect(addRecordResponse3.status).toEqual(200)
    expect(addRecordResponse4.status).toEqual(200)

    // Getting all records (4 in this case)
    const records = await request(app).get('/record/get/type/category/').set('Authorization', `Bearer ${accessToken}`)
    expect(records.status).toEqual(200)
    expect(records.body.records.length).toEqual(4)

    // Getting records type income
    const incomeRecords = await request(app).get('/record/get/type/income/category/').set('Authorization', `Bearer ${accessToken}`)
    expect(incomeRecords.status).toEqual(200)
    expect(incomeRecords.body.records.length).toEqual(2)
    expect(incomeRecords.body.records[0]).toHaveProperty('type', 'income')

    // Getting 1 record with category Salary
    const categoryRecord = await request(app).get('/record/get/1/type/income/category/Salary').set('Authorization', `Bearer ${accessToken}`)
    expect(categoryRecord.status).toEqual(200)
    expect(categoryRecord.body.records.length).toEqual(1)
    expect(categoryRecord.body.records[0]).toHaveProperty('category', 'Salary')

    // Deleting id 1 record
    const deleteRecord = await request(app).delete('/record/delete/1').set('Authorization', `Bearer ${accessToken}`)
    expect(deleteRecord.status).toEqual(200)

    // Getting all records (should be 3 after delete)
    const afterDeleteRecord = await request(app).get('/record/get/type/category/').set('Authorization', `Bearer ${accessToken}`)
    expect(afterDeleteRecord.status).toEqual(200)
    expect(afterDeleteRecord.body.records.length).toEqual(3)

    // Updating record with id 3
    record3.concept = 'updated concept'
    record3.id = 3
    const updatedRecord = await request(app).put('/record/update').send(record3).set('Authorization', `Bearer ${accessToken}`)
    expect(updatedRecord.status).toEqual(200)

    // Getting updated record
    const gettingUpdatedRecord = await request(app).get('/record/get/type/income/category/Freelance job').set('Authorization', `Bearer ${accessToken}`)
    expect(gettingUpdatedRecord.status).toEqual(200)
    expect(gettingUpdatedRecord.body.records[0].concept).toEqual(record3.concept)

    // Getting balance
    const balance = await request(app).get('/record/balance').set('Authorization', `Bearer ${accessToken}`)
    expect(balance.status).toEqual(200)
    expect(balance.body).toHaveProperty('balance', record3.amount - record2.amount - record4.amount)
  })
})

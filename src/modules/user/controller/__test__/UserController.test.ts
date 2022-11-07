import request from 'supertest'
import AppBootstrapper from '../../../__test__/initModules'
import { CredentialsTaken, ValidationError } from '../../../user/errors/_index'
import RecordDto from '../../../record/dto/RecordDto'

describe('Testing all methods and routes in AuthController', () => {
  const { app } = AppBootstrapper()

  test('Signup new user', async () => {
    const response = await request(app)
      .post('/user/signup')
      .send({ name: 'leandro', email: 'newuser@gmail.com', password: 'somepassword' })
    expect(response.status).toEqual(200)
  })

  test('Signup an existing user', async () => {
    const user = { name: 'leandro', email: 'existingemail@gmail.com', password: 'somepassword' }

    const response = await request(app).post('/user/signup').send(user)

    expect(response.status).toEqual(200)

    const error = new CredentialsTaken()

    const secondResponse = await request(app).post('/user/signup').send(user)

    expect(secondResponse.status).toEqual(error.code)
    expect(secondResponse.body).toHaveProperty('name', `${error.name}`)
  })

  test('Signup with validation errors: Wrong email format', async () => {
    const error = new ValidationError('some validation error message')

    const user = { name: 'leandro', email: 'wrongemail', password: 'somepassword' }

    const response = await request(app).post('/user/signup').send(user)

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })

  test('Signup with validation errors: Wrong password format', async () => {
    const error = new ValidationError('some validation error message')

    const user = { name: 'leandro', email: 'wrongpassword@email.com', password: 'pas' }

    const response = await request(app).post('/user/signup').send(user)

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })

  test('Signup with validation errors: blank fields', async () => {
    const error = new ValidationError('some validation error message')

    const user = { name: '', email: 'blankfields@email.com', password: 'somepassword' }

    const response = await request(app).post('/user/signup').send(user)

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })

  test('Getting user records', async () => {
    // Sign up new user
    const user = { name: 'leandro', email: 'getrecordsuser@gmail.com', password: 'somepassword' }

    const response = await request(app).post('/user/signup').send(user)

    expect(response.status).toEqual(200)

    // Login new user
    const loginResponse = await request(app).post('/auth/login').send({ email: user.email, password: user.password })

    expect(loginResponse.status).toEqual(200)
    expect(loginResponse.body).toHaveProperty('accessToken')

    const accessToken: string = await loginResponse.body.accessToken

    // Adding records
    const recordDto1: RecordDto = {
      id: undefined,
      concept: 'Job',
      amount: 100,
      type: 'income',
      category: 'Salary',
      date: new Date(),
      validate: jest.fn()
    }

    const recordDto2: RecordDto = {
      id: undefined,
      concept: 'Job',
      amount: 100,
      type: 'outgo',
      category: 'Services',
      date: new Date(),
      validate: jest.fn()
    }
    const response1 = await request(app).post('/record/new').send(recordDto1).set('Authorization', `Bearer ${accessToken}`)
    const response2 = await request(app).post('/record/new').send(recordDto2).set('Authorization', `Bearer ${accessToken}`)

    expect(response1.status).toEqual(200)
    expect(response2.status).toEqual(200)

    // Getting Records
    const getRecordsResponse = await request(app).get('/user/records').set('Authorization', `Bearer ${accessToken}`)

    expect(getRecordsResponse.status).toEqual(200)
    expect(getRecordsResponse.body).toHaveProperty('records')
  })
})

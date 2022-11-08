
import request from 'supertest'
import AppBootstrapper from '../../../__test__/initModules'
import { UserNotFound, ValidationError } from '../../../user/errors/_index'
import IncorrectPasswordError from '../../errors/IncorrectPasswordError'
import InvalidRefreshTokenError from '../../errors/InvalidRefreshToken'

describe('Testing all methods and routes in AuthController', () => {
  const { app } = AppBootstrapper()

  test('Login blank fields', async () => {
    const error = new ValidationError('message')

    const response = await request(app)
      .post('/auth/login')
      .send({ email: '', password: '' })

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })

  test('Login with a user that does not exist', async () => {
    const error = new UserNotFound()
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@email.com', password: 'querty1234' })

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })
  test('Login with email validation errors', async () => {
    const error = new ValidationError('some message')
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'email', password: 'qwerty14' })

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })
  test('Login with password validation errors', async () => {
    const error = new ValidationError('some message')
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@email.com', password: 'a' })

    expect(response.status).toEqual(error.code)
    expect(response.body).toHaveProperty('name', `${error.name}`)
  })

  test('Login with incorrect password validation errors', async () => {
    const error = new IncorrectPasswordError()

    const response = await request(app)
      .post('/user/signup')
      .send({ name: 'leandro', email: 'leandro@gmail.com', password: 'somepassword' })
    expect(response.status).toEqual(200)

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'leandro@gmail.com', password: 'wrongpassword' })

    expect(loginResponse.status).toEqual(error.code)
    expect(loginResponse.body).toHaveProperty('name', `${error.name}`)
  })

  test('Successfull login', async () => {
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
  })

  test('Refresh session', async () => {
    // Register new user
    const response = await request(app)
      .post('/user/signup')
      .send({ name: 'leandro', email: 'medina@gmail.com', password: 'somepassword' })
    expect(response.status).toEqual(200)
    // Login user
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'medina@gmail.com', password: 'somepassword' })

    expect(loginResponse.status).toEqual(200)
    expect(loginResponse.body).toHaveProperty('accessToken')

    // Refreshing session.
    // Refresh token is set in a HttpOnly cookie.
    const cookie = loginResponse.get('Set-Cookie')[0].split(';')[0]

    const refreshResponse = await request(app)
      .post('/auth/session')
      .set('Cookie', cookie)

    expect(refreshResponse.status).toEqual(200)

    expect(refreshResponse.body).toHaveProperty('accessToken')
  })

  test('Refreshing session without refreshToken', async () => {
    const error = new InvalidRefreshTokenError()

    // Refresh token is set in a HttpOnly cookie.
    const refreshResponse = await request(app)
      .post('/auth/session')

    expect(refreshResponse.status).toEqual(error.code)
    expect(refreshResponse.body).toHaveProperty('name', `${error.name}`)
  })

  test('Logout current user session', async () => {
    // Register new user
    const response = await request(app)
      .post('/user/signup')
      .send({ name: 'leandro', email: 'logoutuser@gmail.com', password: 'somepassword' })
    expect(response.status).toEqual(200)
    // Login user
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'logoutuser@gmail.com', password: 'somepassword' })

    expect(loginResponse.status).toEqual(200)
    expect(loginResponse.body).toHaveProperty('accessToken')

    const cookie = loginResponse.get('Set-Cookie')[0].split(';')[0]

    const logoutResponse = await request(app)
      .post('/auth/session')
      .send({ logout: true })
      .set('Cookie', cookie)

    expect(logoutResponse.status).toEqual(200)
  })
})

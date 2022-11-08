
import ConfigureDIC from '../DIconfig'

describe('DI is loading the right dependencies', () => {
  const container: any = ConfigureDIC()

  const { definitions } = container

  test('DI is loading the right top level dependencies', () => {
    expect(definitions).toHaveProperty('sequelize')
    expect(definitions).toHaveProperty('AuthController')
    expect(definitions).toHaveProperty('AuthService')
    expect(definitions).toHaveProperty('AuthRepository')
    expect(definitions).toHaveProperty('AuthModel')
    expect(definitions).toHaveProperty('UserController')
    expect(definitions).toHaveProperty('UserService')
    expect(definitions).toHaveProperty('UserRepository')
    expect(definitions).toHaveProperty('UserModel')
    expect(definitions).toHaveProperty('RecordController')
    expect(definitions).toHaveProperty('RecordService')
    expect(definitions).toHaveProperty('RecordRepository')
    expect(definitions).toHaveProperty('RecordModel')
  })

  test('AuthController is constructed with the right dependencies', () => {
    const { AuthController } = definitions
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'AuthService' })
    ]
    expect(AuthController.deps).toEqual(expect.arrayContaining(expected))
  })

  test('AuthService is constructed with the right dependencies', () => {
    const { AuthService } = definitions
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'AuthRepository' }),
      expect.objectContaining({ existingDefinitionName: 'UserService' })
    ]
    expect(AuthService.deps).toEqual(expect.arrayContaining(expected))
  })

  test('AuthRepository is constructed with the right dependencies', () => {
    const { AuthRepository } = definitions
    const expected = [expect.objectContaining({ existingDefinitionName: 'AuthModel' })]
    expect(AuthRepository.deps).toEqual(expect.arrayContaining(expected))
  })

  test('UserController is constructed with the right dependencies', () => {
    const { UserController } = definitions
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'UserService' }),
      expect.objectContaining({ existingDefinitionName: 'AuthService' })
    ]
    expect(UserController.deps).toEqual(expect.arrayContaining(expected))
  })

  test('UserService is constructed with the right dependencies', () => {
    const { UserService } = definitions
    const expected = [expect.objectContaining({ existingDefinitionName: 'UserRepository' })]
    expect(UserService.deps).toEqual(expect.arrayContaining(expected))
  })

  test('UserRepository is constructed with the right dependencies', () => {
    const { UserRepository } = definitions
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'UserModel' }),
      expect.objectContaining({ existingDefinitionName: 'AuthModel' }),
      expect.objectContaining({ existingDefinitionName: 'RecordModel' })
    ]
    expect(UserRepository.deps).toEqual(expect.arrayContaining(expected))
  })

  test('RecordController is constructed with the right dependencies', () => {
    const { RecordController } = definitions
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'AuthService' }),
      expect.objectContaining({ existingDefinitionName: 'RecordService' })
    ]
    expect(RecordController.deps).toEqual(expect.arrayContaining(expected))
  })

  test('RecordService is constructed with the right dependencies', () => {
    const { RecordService } = definitions
    const expected = [expect.objectContaining({ existingDefinitionName: 'RecordRepository' })]
    expect(RecordService.deps).toEqual(expect.arrayContaining(expected))
  })

  test('RecordRepository is constructed with the right dependencies', () => {
    const { RecordRepository } = definitions
    const expected = [
      expect.objectContaining({ existingDefinitionName: 'RecordModel' }),
      expect.objectContaining({ existingDefinitionName: 'UserModel' })
    ]
    expect(RecordRepository.deps).toEqual(expect.arrayContaining(expected))
  })
})

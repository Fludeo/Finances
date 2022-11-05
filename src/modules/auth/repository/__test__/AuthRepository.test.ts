import { AuthModel } from "../../module"
import AuthRepository from "../AuthRepository"







const mockAuthModel: any = {
    destroy: jest.fn(),
    build: jest.fn()
}


const mockAuthRepository = new AuthRepository(mockAuthModel)

describe('testing all methods in AuthRepository',()=>{



    test('Save session token', async ()=>{

        const token = 'refreshtoken'

        const savedToken = {
            save: jest.fn(),
            refreshToken: token
        }

        savedToken.save.mockReturnValue({refreshToken:token})
        mockAuthModel.build.mockReturnValue(savedToken)

        const result = await mockAuthRepository.saveRefreshToken(token)
        expect(mockAuthModel.build).toBeCalledWith({refreshToken:token})
        expect(result).toHaveProperty('refreshToken', token)

    })

    test('Removes session token', async ()=>{


        const token = 'refreshtoken'



        
        mockAuthModel.destroy.mockReturnValue({refreshToken:token})

        await mockAuthRepository.removeRefreshToken(token)
        expect(mockAuthModel.destroy).toBeCalledWith({where:{refreshToken:token}})
   

    })


    })









import AuthModel from "../model/AuthModel"

    export default class AuthRepository{
        private authModel 
        constructor(authModel : AuthModel){
            this.authModel = authModel as any
        }

        async  saveRefreshToken (token : string){

            const savedToken = this.authModel.build({refreshToken:token})
      
            await savedToken.save()
      
            return savedToken
            }
            
            async removeRefreshToken (token : string){
             
             const deleted = await this.authModel.destroy({where:{refreshToken: token}})
             
          
          }


    }


import AuthModel from "../model/AuthModel"

    export default class AuthRepository{
        private authModel :AuthModel
        constructor(authModel : AuthModel){
            this.authModel = authModel
        }

        async  saveRefreshToken (token : string){

            const savedToken = AuthModel.build({refreshToken:token})
      
            await savedToken.save()
      
            return savedToken
            }
            
            async removeRefreshToken (token : string){
             
             const deleted = await AuthModel.destroy({where:{refreshToken: token}})
             
          
          }


    }

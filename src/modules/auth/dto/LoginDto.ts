import ValidationError from "../../user/errors/ValidationError"

export default class LoginDto {

    email : string
    password : string
    constructor({email ,password}:{email:string, password:string}){

        this.email = email
        this.password =password
    }
    validate(){

        if(this.email===undefined||this.password===undefined){
            throw new ValidationError ('There is an empty field...')
        
        }
        console.log(this)
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email))){
            throw new ValidationError ('Invalid email!!!')
        }
   
    }
     
}
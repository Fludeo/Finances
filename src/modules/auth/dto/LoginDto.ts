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

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email))){
            throw new ValidationError ('Invalid email!!!')
        }

        if(!(/^[A-Za-z]\w{7,14}$/.test(this.password))){
            throw new ValidationError ('Invalid Password: 8-16 characters including numbers and starting with a letter')
        }
   
    }
     
}
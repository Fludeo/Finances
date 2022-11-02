import Record from '../../record/entity/Record'

export default class User {


  id : number | undefined
  name : string
  email : string
  hash : string
  createdAt : string | undefined
  updatedAt : string | undefined
  deletedAt :string | undefined
  records :Array<Record>  | undefined

    constructor(
      id : number | undefined,
      name : string,
      email : string,
      hash : string,
      createdAt : string | undefined,
      updatedAt : string| undefined,
      deletedAt :string | undefined,
      records :Array<Record> | undefined,
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.hash = hash;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
      this.records = records;
    }
  
  };
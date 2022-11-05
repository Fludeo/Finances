export default class Record {

    id : number | undefined
    concept : string
    amount : number
    type : string
    category : string
    date : Date
    userId : number | undefined
    createdAt : string | undefined
    updatedAt : string | undefined
    deletedAt : string | undefined
    
        constructor(
          id : number | undefined,
          concept : string,
          amount : number,
          type : string,
          category : string,
          date : Date,
          userId : number | undefined,
          createdAt : string | undefined, 
          updatedAt : string | undefined,
          deletedAt : string | undefined,
        ) {
          this.id = id;
          this.concept = concept;
          this.amount = amount;
          this.type = type;
          this.category = category;
          this.date = date;
          this.userId= userId;
          this.createdAt = createdAt;
          this.updatedAt = updatedAt;
          this.deletedAt = deletedAt;
        }
      
      };
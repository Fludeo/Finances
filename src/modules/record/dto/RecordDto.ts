import { ValidationError } from '../../user/errors/_index'

export default class RecordDto {
  id: number | undefined
  concept: string
  amount: number
  type: string
  category: string
  date: Date

  constructor ({ id, concept, amount, type, category, date }: { id: number, concept: string, amount: number, type: string, category: string, date: Date }) {
    this.id = id
    this.concept = concept
    this.amount = amount
    this.type = type
    this.category = category
    this.date = date
  }

  validate (): void {
    if (this.concept === undefined || this.concept === '' ||
        this.amount === undefined || String(this.amount) === '' ||
        this.type === undefined || this.type === '' ||
        this.category === undefined || this.category === '' ||
        this.date === undefined || String(this.date) === '') {
      throw new ValidationError('No blank fields')
    }
  }
}

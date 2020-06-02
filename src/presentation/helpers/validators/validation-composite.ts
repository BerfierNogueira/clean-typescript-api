import { Validation } from './validation'

export class ValidationComposite implements Validation {
  validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error !== null || error !== undefined) return error
    }
    return null
  }
}

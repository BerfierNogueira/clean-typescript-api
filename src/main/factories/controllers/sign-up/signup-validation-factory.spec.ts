import { makeSignUpValidation } from './signup-validation-factory'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../../presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../../adapters/email-adapter/email-validator-adapter'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

describe('ValidationComposite factory test', () => {
  it('Should call validationComposite with all validators', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirm'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

import { TokenReader } from '../../protocols/cryptography/token-reader'
import { DBLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes{
  sut: DBLoadAccountByToken
  decrypter: TokenReader
}

function makeDecrypter (): TokenReader {
  class DecrypterStub implements TokenReader {
    async decrypt (token: string): Promise<string> {
      return 'any_value'
    }
  }
  const decrypterStub = new DecrypterStub()
  return decrypterStub
}

function makeSut (): SutTypes {
  const decrypterStub = makeDecrypter()
  const sut = new DBLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypter: decrypterStub
  }
}

describe('DBLoadAccountByToken set', () => {
  it('Should call decrypter with correct values', async () => {
    const { sut, decrypter } = makeSut()
    const spyDecrypter = jest.spyOn(decrypter, 'decrypt')
    await sut.loadAccount('any_token')
    expect(spyDecrypter).toHaveBeenCalledWith('any_token')
  })
})

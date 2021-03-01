const axios = require('axios')
const api = require('./api-bcb')

jest.mock('axios')

test('getCotacaoAPI', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 3.90 }
      ]
    }
  }

  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('url').then(resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [
        { cotacaoVenda: 3.90 }
      ]
    }
  })
  expect(cotacao).toBe(3.90)
})

describe('getToday', () => {
  const RealDate = Date

  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date)
      }
    }
  }
  afterEach(() => {
    global.Date = RealDate
  })


  test('getToday', () => {
    mockDate('2021-02-15T15:00:00z')
    const today = api.getToday()
    expect(today).toBe('2-15-2021')
  })
})


test('getUrl', () => {
  const url = api.getUrl('MINHA-DATA')
  expect(url).toBe("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MINHA-DATA'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
})


test('getCotacao', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 3.90 }
      ]
    }
  }

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getToday = jest.fn()
  getToday.mockReturnValue('1-1-2021')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockResolvedValue(res)

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.9)

  api.pure.getCotacao({ getUrl, getToday, getCotacaoAPI, extractCotacao })()
    .then(res => expect(res).toBe(3.9))




})


test('getCotacao', () => {
  const res = {}

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getToday = jest.fn()
  getToday.mockReturnValue('1-1-2021')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockReturnValue(Promise.reject('err'))

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.9)

  api.pure.getCotacao({ getUrl, getToday, getCotacaoAPI, extractCotacao })()
    .then(res => expect(res).toBe(''))




})
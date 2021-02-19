const convert = require('./convert')

test('convert quantidade 4 to cotacao 4', () => {
  expect(convert.convert(4,4)).toBe(16)
})

test('convert quantidade 0 to cotacao 4', () => {
  expect(convert.convert(0,4)).toBe(0)
})

test('toMoney converts to float', () => {
  expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney converts string to float', () => {
  expect(convert.toMoney('5')).toBe('5.00')
})

test('toMoney converts float to float', () => {
  expect(convert.toMoney(2.00)).toBe('2.00')
})
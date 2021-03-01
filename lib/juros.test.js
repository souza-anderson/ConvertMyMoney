const juros = require('./juros')

test('jurosSimples', () => {
  const jurosSimples = juros.jurosSimples(4, 2, 1)
  expect(jurosSimples).toBe('')
})

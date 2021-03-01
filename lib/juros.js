const jurosSimples = (c, i, t) => c * i * t

const montanteJurosSimples = (c, i, t) => {
  const jurosSimples = jurosSimples(c, i, t)
  return c + jurosSimples
}

const montanteJurosCompostos = (c, i, t) => {
  const m = c * (1 + i) ** t
  return m
}

const jurosCompostos = (c, i, t) => {
  const j = montanteJurosCompostos(c, i, t) - c
  return j
}

module.exports = {
  jurosSimples,
  montanteJurosSimples,
  montanteJurosCompostos,
  jurosCompostos
}

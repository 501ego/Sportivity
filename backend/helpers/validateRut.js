function confirmRut(rut) {
  let sum = 0
  let mul = 2

  let i = rut.length
  while (i--) {
    sum = sum + parseInt(rut.charAt(i)) * mul
    if (mul % 7 === 0) {
      mul = 2
    } else {
      mul++
    }
  }
  const res = sum % 11
  if (res === 0) {
    return '0'
  } else if (res === 1) {
    return 'k'
  }
  return `${11 - res}`
}

function formatRut(rut) {
  rut = rut.replace(/[.-]/g, '')
  const rutFormateado = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  return rutFormateado
}

function validateRut(rut) {
  if (rut.length < 8) {
    return false
  }
  const rutFormateado = formatear(rut)
  const rutLimpio = rutFormateado.slice(0, -2)
  const verificador = rutFormateado.slice(-1).toLowerCase()
  const verificadorCalculado = calcularVerificador(rutLimpio)
  return verificador === verificadorCalculado
}

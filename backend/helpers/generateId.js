const generateId = () => {
  const random = Math.random().toString(32).substring(2)
  const fecha = Date.now().toString(32)
  //TODO  temporizar duración del token
  return random + fecha
}

export default generateId

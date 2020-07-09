export default (isDev, grahql) => {
  if (isDev) {
    if (grahql) {
      return 'http://localhost:4000/'
    } else {
      return 'http://localhost:5000/'
    }
  } else {
    return 'https://tongli-eg-staffing-system.herokuapp.com/'
  }
}
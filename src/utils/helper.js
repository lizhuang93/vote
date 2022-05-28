module.exports = {
  getDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.substr(-2)
    const day = `0${date.getDate()}`.substr(-2)
    return `${year}${month}${day}`
  }
}
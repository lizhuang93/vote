module.exports = {
  getDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.substr(-2)
    const day = `0${date.getDate()}`.substr(-2)
    return `${year}${month}${day}`
  },
  getUrlParams(url) {
    let obj = {}
    const search = url.split('?')[1]
    if(search) {
      const items = search.split('&')
      items.forEach(i => {
        const key = i.split('=')[0]
        const value = i.split('=')[1]
        obj[key] = value
      });
    }
    return obj
  }
}
function toast(str) {
  toastHide()
  const body = document.querySelector('body')
  const node = document.createElement('div')
  node.setAttribute('class', 'toast')
  node.textContent = str
  body.appendChild(node)
  setTimeout(() => {
    toastHide()
  }, 3000)
}

function toastHide() {
  const toast =  document.querySelector('.toast')
  if(toast) {
    toast.remove()
  }
}

// 20220528
function getToday() {
  const d = new Date()
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.substr(-2)
  const day = `0${d.getDate()}`.substr(-2)
  return `${year}${month}${day}`
}

// 20220528
function getPrevDate(date) {
  const str = `${date.slice(0,4)}/${date.slice(4,6)}/${date.slice(6,8)}`
  const timeStamp = +new Date(str)
  const prevStamp = timeStamp - 24 * 3600 * 1000

  const d = new Date(prevStamp)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.substr(-2)
  const day = `0${d.getDate()}`.substr(-2)
  return `${year}${month}${day}`
}

// 20220528
function getNextDate(date) {
  const str = `${date.slice(0,4)}/${date.slice(4,6)}/${date.slice(6,8)}`
  const timeStamp = +new Date(str)
  const prevStamp = timeStamp + 24 * 3600 * 1000

  const d = new Date(prevStamp)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.substr(-2)
  const day = `0${d.getDate()}`.substr(-2)
  return `${year}${month}${day}`
}

function formatNo(no) {
  return 'No.' + `000${no}`.substr(-4)
}
export function debounce(fn, delay = 300) {
  let timer = null
  return function(...args) {
    // 传入一个错误的 ID 给 clearTimeout()不会有任何影响；也不会抛出异常
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle(fn) {
  let flag = false
  return function(...args) {
    if (flag) return
    flag = true
    fn.apply(this, args)
    flag = false
  }
}

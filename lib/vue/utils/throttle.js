export function throttle(fn, delay) {
  let inThrottle
  let lastTime
  let timer

  return function() {
    if (!inThrottle) {
      fn.apply(this, arguments)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (Date.now() - lastTime >= delay) {
          fn.apply(this, arguments)
          lastTime = Date.now()
        }
      }, Math.max(delay - (Date.now() - lastTime), 0))
    }
  }
}

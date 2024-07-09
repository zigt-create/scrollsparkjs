const inView = (target, direction, cascade, damping, text) => {
  const normalAnim = (target, direction) => {
    target.classList.remove('hide')
    target.classList.add(`animation-${direction}`)
  }

  const cascadeAnim = (target, direction, damping) => {
    const children = target.children
    for (let i = 0; i < children.length; i++) {
      setTimeout(() => {
        children[i].classList.remove('hide')
        children[i].classList.add(`animation-${direction}`)
      }, i * damping * 1000)
    }
  }

  const textAnim = (target, direction, damping) => {
    target.classList.remove('hide')
    let string = target.textContent
    target.textContent = ''
    string.split('')
    for (let i = 0; i < string.length; i++) {
      target.innerHTML += '<span>' + string[i] + '</span>'
    }
    const children = target.children
    for (let i = 0; i < children.length; i++) {
      const element = children[i]
      if (!element.classList.contains(`animation-${direction}`)) {
        element.classList.add('hide')
        setTimeout(() => {
          element.classList.remove('hide')
          element.classList.add(`animation-${direction}`)
        }, i * damping * 1000)
      }
    }
  }

  if (!cascade && !text) normalAnim(target, direction)
  if (cascade && !text) cascadeAnim(target, direction, damping)
  if (text) textAnim(target, direction, damping)
}

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[data-inview]')
  if (targets.length === 0) return false

  targets.forEach((target) => {
    if (!target) return false
    const data = target.dataset.inview
    if (!data) return false
    const parseData = JSON.parse(data)
    if (!parseData) return false

    let direction = 'fade-in'
    let cascade = false
    let damping = 1
    let threshold = 0
    let thresholdMobile = 0
    let text = false
    let container = false
    let showOnce = true
    let rootMargin = '0px 0px 0px 0px'

    if (typeof parseData.direction !== 'undefined') direction = parseData.direction
    if (typeof parseData.cascade !== 'undefined') cascade = parseData.cascade
    if (typeof parseData.damping !== 'undefined') damping = parseData.damping
    if (typeof parseData.threshold !== 'undefined') threshold = parseData.threshold
    if (typeof parseData.thresholdMobile !== 'undefined') thresholdMobile = parseData.thresholdMobile
    if (typeof parseData.text !== 'undefined') text = parseData.text
    if (typeof parseData.container !== 'undefined') container = document.querySelector(parseData.container)
    if (typeof parseData.showOnce !== 'undefined') showOnce = parseData.showOnce
    if (typeof parseData.rootMargin !== 'undefined') rootMargin = parseData.rootMargin

    let currentThreshold = threshold
    let currentTarget = target

    if (window.innerWidth > 768) {
      currentThreshold = threshold
    } else {
      currentThreshold = thresholdMobile
    }

    if (container) currentTarget = container

    const handler = (entries) => {
      entries.forEach((entry) => {
        if (!cascade) target.classList.add('hide')
        if (!showOnce) target.classList.remove(`animation-${direction}`)

        if (cascade) {
          const children = target.children
          for (let i = 0; i < children.length; i++) {
            children[i].classList.add('hide')
            if (!showOnce)
              children[i].classList.remove(`animation-${direction}`)
          }
        }

        if (entry.isIntersecting) {
          inView(target, direction, cascade, damping, text)
          if (showOnce) observer.disconnect()
        }
      })
    }

    let observeOptions = {
      rootMargin: rootMargin,
      threshold: currentThreshold,
    }

    const observer = new IntersectionObserver(handler, observeOptions)
    observer.observe(currentTarget)

    target.removeAttribute('data-inview')
  })
})

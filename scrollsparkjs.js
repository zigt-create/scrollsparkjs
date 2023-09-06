const inView = (el, percentVisible, percentVisibleMobile, container) => {
	let rect = false
	if (container) {
		rect = container.getBoundingClientRect()
	} else {
		rect = el.getBoundingClientRect()
	}

	let setPercentVisible = 50

	if (window.innerWidth > 768) {
		setPercentVisible = percentVisible
	} else {
		setPercentVisible = percentVisibleMobile
	}

	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight

	return !(
		Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
			setPercentVisible ||
		Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
			setPercentVisible
	)
}

const animationWithCascade = (parent, direction, damping) => {
	const children = parent.children
	for (let index = 0; index < children.length; index++) {
		const element = children[index]
		if (!element.classList.contains(`animation-${direction}`)) {
			element.classList.add('hide')
			setTimeout(() => {
				element.classList.remove('hide')
				element.classList.add(`animation-${direction}`)
			}, damping * index * 1000)
		}
	}
}

const hideCascadeChildren = (parent) => {
	const children = parent.children
	for (let index = 0; index < children.length; index++) {
		const element = children[index]
		element.classList.add('hide')
	}
}

const animationElment = (el, direction) => {
	el.classList.remove('hide')
	el.classList.add(`animation-${direction}`)
}

const animationText = (el, direction, damping) => {
	el.classList.remove('hide')
	let string = el.textContent
	el.textContent = ''
	string.split('')
	let i = 0,
		length = string.length
	for (i; i < length; i++) {
		el.innerHTML += '<span>' + string[i] + '</span>'
	}

	const children = el.children
	for (let index = 0; index < children.length; index++) {
		const element = children[index]
		if (!element.classList.contains(`animation-${direction}`)) {
			element.classList.add('hide')
			setTimeout(() => {
				element.classList.remove('hide')
				element.classList.add(`animation-${direction}`)
			}, damping * 1000 * index)
		}
	}
}

const scrollIntoView = (
	el,
	direction,
	cascade,
	damping,
	percentVisible,
	percentVisibleMobile,
	text,
	container
) => {
	if (!el) return
	if (!el.classList.contains('animated') && !cascade) el.classList.add('hide')
  if (cascade) hideCascadeChildren(el)

	const checkInview = () => {
		if (inView(el, percentVisible, percentVisibleMobile, container) && cascade) {
			animationWithCascade(el, direction, damping)
		} else if (
			inView(el, percentVisible, percentVisibleMobile, container) &&
			text
		) {
			animationText(el, direction, damping)
		} else if (inView(el, percentVisible, percentVisibleMobile, container)) {
			animationElment(el, direction)
		}
	}

	const scrolling = () => {
		if (inView(el, percentVisible, percentVisibleMobile, container)) {
			document.removeEventListener('scroll', scrolling, {
				passive: true,
			})
			checkInview()
		}
	}

	if (!inView(el, percentVisible, percentVisibleMobile, container))
		document.addEventListener('scroll', scrolling, { passive: true })
	checkInview()
}

document.addEventListener('DOMContentLoaded', () => {
	const targets = document.querySelectorAll('[data-inview]')
	targets.forEach((target) => {
		if (!target) return false
		const data = target.dataset.inview
		if (!data) return false
		const parseData = JSON.parse(data)
		if (!parseData) return false

		let direction = 'fade-in'
		let cascade = false
		let damping = 1
		let percentVisible = 50
		let percentVisibleMobile = 20
		let text = false
		let container = false

		if (parseData.direction) {
			direction = parseData.direction
		}
		if (parseData.cascade) {
			cascade = parseData.cascade
		}
		if (parseData.damping) {
			damping = parseData.damping
		}
		if (parseData.percentVisible || parseData.percentVisible === 0) {
			percentVisible = parseData.percentVisible
		}
		if (parseData.percentVisibleMobile || parseData.percentVisibleMobile === 0) {
			percentVisibleMobile = parseData.percentVisibleMobile
		}
		if (parseData.text) {
			text = parseData.text
		}
		if (parseData.container) {
			container = parseData.container
		}

		scrollIntoView(
			target,
			direction,
			cascade,
			damping,
			percentVisible,
			percentVisibleMobile,
			text,
			container
		)
		target.removeAttribute('data-inview')
	})
})

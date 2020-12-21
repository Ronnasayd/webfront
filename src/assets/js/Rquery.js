export const $ = selector => {
  const self = {
    elements:
      typeof selector === 'string'
        ? [...document.querySelectorAll(selector)]
        : [selector],
    on: (event, callback) => {
      self.elements.forEach(element =>
        element.addEventListener(event, callback)
      )
      return self
    },
    hide: () => {
      self.elements.forEach(element => {
        element.style.display = 'none'
      })
      return self
    },
    show: () => {
      self.elements.forEach(element => {
        element.style.display = 'block'
      })
      return self
    },
    attr: (key, value) => {
      if (value !== undefined) {
        self.elements.forEach(element => {
          element.setAttribute(key, value)
        })
      } else {
        return self.elements[0].getAttribute(key)
      }
      return self
    },
    removeAttr: key => {
      self.elements.forEach(element => {
        element.removeAttribute(key)
      })
      return self
    },
    toggle: () => {
      self.elements.forEach(element => {
        const style = getComputedStyle(element)
        if (style.display === 'none') {
          element.style.display = 'block'
        } else {
          element.style.display = 'none'
        }
      })
      return self
    },
    css: styles => {
      self.elements.forEach(element => {
        for (let style in styles) {
          element.style[style] = styles[style]
        }
      })
      return self
    },
    addClass: cls => {
      self.elements.forEach(element => {
        element.classList.add(cls)
      })
      return self
    },
    removeClass: cls => {
      self.elements.forEach(element => {
        element.classList.remove(cls)
      })
    }
  }
  return self
}

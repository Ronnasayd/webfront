const $$ = string => {
  const elements = [...document.querySelectorAll(string)]
  if (elements) {
    elements.forEach(element => {
      element.on = (string, callback) => {
        element.addEventListener(string, callback, false)
      }
    })
  }

  return elements.length === 1 ? elements[0] : elements
}

let showDropMenu = false
const dropMenu = $$('#dropdown-menu')
const navContent = $$('.menu__content__nav')

navContent.on('click', event => {
  showDropMenu = !showDropMenu
  dropMenu.setAttribute('display', showDropMenu)
})
// console.log(dropMenu)

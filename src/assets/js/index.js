const $ = string => {
  const elements = [...document.querySelectorAll(string)]
  return elements.length === 1 ? elements[0] : elements
}

let showDropMenu = false
const dropMenu = $('#dropdown-menu')
const navContent = $('.menu__content__nav')

navContent.addEventListener(
  'click',
  event => {
    showDropMenu = !showDropMenu
    dropMenu.setAttribute('display', showDropMenu)
  },
  false
)
// console.log(dropMenu)

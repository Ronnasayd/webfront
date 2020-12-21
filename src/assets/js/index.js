import { $ } from './Rquery'

const dropMenu = $('#dropdown-menu')
const navContent = $('.menu__content__nav')
const dropIcon = $('#dropdown-icon')
const sideItens = $('.sidebar__item')
let rotateIcon = false

$(sideItens.elements[0]).attr('selected', true)

navContent.on('click', () => {
  dropMenu.toggle()
  rotateIcon = !rotateIcon
  rotateIcon ? dropIcon.addClass('rotate') : dropIcon.removeClass('rotate')
})

sideItens.on('click', event => {
  sideItens.removeAttr('selected')
  $(event.currentTarget).attr('selected', true)
})

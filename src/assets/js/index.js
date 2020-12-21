import { $ } from './Rquery'

const dropMenu = $('#dropdown-menu')
const navContent = $('.menu__content__nav')
const dropIcon = $('#dropdown-icon')

let rotateIcon = false

navContent.on('click', () => {
  dropMenu.toggle()
  rotateIcon = !rotateIcon
  rotateIcon ? dropIcon.addClass('rotate') : dropIcon.removeClass('rotate')
})

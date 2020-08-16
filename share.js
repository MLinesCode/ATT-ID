const $icon = document.querySelector('#icon')
$icon.addEventListener('click', share)
function share() {
  navigator.share({
    title:'AT&T - ID',
    text:'AT&T ID Alexia Pacheco',
    url:'https://zcmike.github.io/ATT-ID/'
  })
}
const $icon = document.querySelector('#icon')
$icon.addEventListener('click', share)
function share() {
  navigator.share({
    title:'ATT - ID',
    text:'ID Alexia Pacheco',
    url:'./img/qr.png'
  })
}
// asignar un nombre y versión al cache 
const CACHE_NAME = 'v1_cache_attid'
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Quicksand|Roboto&display=swap',
    './css/main.css',
    './img/cell.svg',
    './img/ejecutive.jpg',
    './img/qr.png',
    './icons/att-bussines.svg',
    './icons/att-logo.svg',
    './icons/cell.svg',
    './icons/derecho.svg',
    './icons/facebook.svg',
    './icons/logo-light.svg',
    './icons/marcador-de-posicion.svg',
    './icons/telefono.svg',
    './icons/whatsapp.svg',
  ]

//durante la fase de instalacion, generalmente se almacena en cache los activos estaticos 
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skiWaiting())
      })
      .catch(err => console.log('Fail to register cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener('activate' , e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //eliminar lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return cache.delete(cacheName)
            }
          })
        )
      })
      //le indica al SW activar el cache actual
      .then(() => self.ClientRectList.clain())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //responde ya sea con el objeto en cache o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar el cache 
          return res
        }
        //recuperar de la peticion a la url
        return fetch(e.request)
      })
  )
})
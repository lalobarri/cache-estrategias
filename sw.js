//Para el problema de que se puede mezclar los elementos del 
//cache que son esenciales, con los elementos no necesario y antiguos o 
//desactualizados, se utilizará una contantante diferente para 
//cada caso
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dinamic-v1';
const CACHE_INMUTABLE_NAME='inmutable-v1';

self.addEventListener('install', e =>{
    //Cuando se instala se guardar las cosas necesarias
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then( caches =>{//Se regresa una promesa
            return caches.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js'
            ]);
        });   
   
    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME)
        .then( cache => {
            return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        });

    e.waitUntil( Promise.all([cacheProm, cacheInmutable]));

    

});


self.addEventListener('fetch', e =>{
    const respuesta = caches.match(e.request)
        .then(res => {
            if( res ) return res;
            //No existe el archivo
            //tengo que ir a la web
            //Se toma en consideración que el cache dinámico puede crecer muy grande 
            console.log('No existe', e.request.url);
            return fetch( e.request).then(newResp => {
                caches.open( CACHE_DYNAMIC_NAME)
                .then( cache => {
                    cache.put( e.request, newResp);    
                });
                return newResp.clone;
            });
        }); //Termina definición de constante respuesta
    e.respondWith( respuesta);
});



function limpiarCache( cacheName, numeroItems ) {
    caches.open( cacheName )
        .then( cache => {
            return cache.keys()
                .then( keys => {
                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });
        });
}

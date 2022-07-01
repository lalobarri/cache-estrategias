const CACHE_NAME = 'cache-1'

//App Shell en cache storage
//Todo lo que la aplicación requiere para trabajar
//Varia dependiendo de la aplicación
self.addEventListener('install', e =>{
    //Cuando se instala se guardar las cosas necesarias
    const cacheProm = caches.open(CACHE_NAME)
        .then( cache =>{//Se regresa una promesa
            return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            '/js/app.js'
            ]);
        });   
    e.waitUntil( cacheProm ); 

});


//Para la estrategía de Cache Only
self.addEventListener('fetch', e =>{
    
    
    //1-Cache Only, cuando toda petición surge del Cache
    //  Todo lo que sea que se esta pidiendo surge el Cache Storage

    //Se va a todos los caches para ver si existe
    //e.respondWith(caches.match( e.request)); //CACHE ONLY 
    
    //2- Cache with Network Fallback - Primero Cache y luego internet
    const respuesta = caches.match(e.request)
        .then(res => {
            if( res ) return res;
            //No existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request).then(newResp => {
                caches.open( CACHE_NAME)
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

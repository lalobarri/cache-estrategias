//Para el problema de que se puede mezclar los elementos del 
//cache que son esenciales, con los elementos no necesario y antiguos o 
//desactualizados, se utilizará una contantante diferente para 
//cada caso
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dinamic-v1';
const CACHE_INMUTABLE_NAME='inmutable-v1';
const CACHE_DINAMIC_LIMIT = 50;

self.addEventListener('install', e =>{
    //Cuando se instala se guardar las cosas necesarias
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then( cache =>{//Se regresa una promesa
            return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js'
            ]);
        });   
   
    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME)
        .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));

    e.waitUntil( Promise.all([cacheProm, cacheInmutable])); //Ambas promesas se hagan simultaneamente



});


self.addEventListener('fetch', e =>{
    
    

    // 3- Network with cache fallback
    const respueta = fetch( e.request ).then( res => {

        console.log('Fetch', res);

        caches.open(CACHE_DYNAMIC_NAME)
        .then( cache => {
            cache.put( e.request, res );
            limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DINAMIC_LIMIT);
        });
        return res.clone();
    }).catch( err => {
        return caches.match(e.request);
    });

    e.respondWith( respueta );


    /*  //Se comenta código de estrategía anterior
    const respuesta = caches.match(e.request)
        .then(res => {
            if( res ) return res;
            //No existe el archivo
            //tengo que ir a la web
            //Se toma en consideración que el cache dinámico puede crecer muy grande 
            
            return fetch( e.request ). then( newResp => {
                
                caches.open( CACHE_DYNAMIC_NAME)
                .then( cache => {
                    cache.put( e.request, newResp);    
                    limpiarCache( CACHE_DYNAMIC_NAME, 50);
                });
                return newResp.clone;
            });
        }); //Termina definición de constante respuesta
    e.respondWith( respuesta);

    */
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

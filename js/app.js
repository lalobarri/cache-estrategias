
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

/*
//Documentación o referencia
if (window.caches){ //Si el navegador soporta cache storage
    caches.open('prueba-1');
    caches.open('prueba-2');
    caches.open('cache-v1.1').then( cache => {
        //cache.add('/index.html');  //Para agregar un archivo a cache
        cache.addAll([
            '/index.html', 
            '/css/style.css',
            '/img/main.jpg'
        ]).then(()=>{
            //cache.put('index.html', new Response('Hola Mundo'));
            cache.delete('/css/style.css');
        });

        cache.match('/index.html')
        .then( res =>{
            res.text().then(console.log);
        });
    });

    //Regresa todos los caches que hay

    caches.keys().then( keys =>{
        console.log(keys);
    });

    
}
*/
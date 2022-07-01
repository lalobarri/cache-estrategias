

// Caso 1
//Manejo de errores cuando manejamos error de conexión
//Petición

/*
self.addEventListener('fetch', event =>{
    const offlineResp = new Response(' Bienvenido ...'
    + 'para usarla necesitas Internet  ');
    const resp = fetch(event.request)
        .catch(()=>{
        return offlineResp; //Cuando capture el error
        //se retorme offlineResp
    });
    event.respondWith(resp);
});

*/

 //Caso 2
//Manejo de errores cuando manejamos error de conexión



self.addEventListener('fetch', event =>{
    const offlineResp = new Response(`
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Mi PWA</title>
    </head>
    <body style="background: rgb(255, 238, 0);">
        <h1>Offline Mode</h1>
    </body>
    </html>
    `, {
        headers:{
            'Content-Type':'text/html'
        }
    });

    const resp = fetch(event.request)
        .catch(()=>{
        return offlineResp; //Cuando capture el error
        //se retorme offlineResp
    });

    event.respondWith( resp);

});

/*
self.addEventListener('fetch', event =>{

    const offlineResp = new Response(`
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Mi PWA</title>
    </head>
    <body style="background: rgb(255, 238, 0);">
        <h1>Offline Mode</h1>
    </body>
    </html>
    `, {
        headers:{
            'Content-Type':'text/html'
        }
    });

    const resp = fetch(event.request)
        .catch(()=>{
        return offlineResp; //Cuando capture  el error
        //se retorme offlineResp
    });

    event.respondWith( resp);

});


*/
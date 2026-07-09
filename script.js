// ======================================================
// CONFIGURACIÓN
// ======================================================

const TOTAL_FOTOS = 50;

const FECHA_INICIO = new Date("2025-07-12T00:00:00");

const VELOCIDAD_CARTA = 25;


// ======================================================
// VARIABLES
// ======================================================

let fotoActual = 1;

let inicioX = 0;

let escribiendoCarta = false;

let musicaIniciada = false;


// ======================================================
// ATAJO
// ======================================================

const $ = (id) => document.getElementById(id);


// ======================================================
// ELEMENTOS DEL DOM
// ======================================================

// Pantallas

const screens = document.querySelectorAll(".screen");


// Música

const player = $("player");

const musicButton = $("musicButton");


// Portada

const openBook = $("openBook");


// Dedicatoria

const startAlbum = $("startAlbum");


// Contador

const continueAlbum = $("continueAlbum");


// Álbum

const album = $("album");

const photo = $("photo");

const caption = $("caption");

const prev = $("prev");

const next = $("next");


// Barra

const progressFill = $("progressFill");

const currentPhoto = $("currentPhoto");

const totalPhotos = $("totalPhotos");


// Carta

const envelope = $("envelope");

const letterPaper = $("letterPaper");

const letterText = document.querySelector("#letterText p");

const finish = $("finish");


// Final

const ending = $("ending");


// ======================================================
// CAMBIAR PANTALLA
// ======================================================

function mostrarPantalla(id){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    const pantalla=$(id);

    if(!pantalla){

        return;

    }

    pantalla.classList.add("active");

    if(id==="letter"){

        envelope.style.display="flex";

        letterPaper.classList.remove("show");

        letterPaper.classList.add("hidden");

        const p=letterText.querySelector("p");

        if(p){

            p.textContent="";

        }

    }

}


// ======================================================
// MÚSICA
// ======================================================

function actualizarIconoMusica(){

    if(player.paused){

        musicButton.textContent="🔇";

    }else{

        musicButton.textContent="🔊";

    }

}

function iniciarMusica(){

    if(musicaIniciada){

        return;

    }

    musicaIniciada=true;

    player.volume=1;

    player.play().catch(()=>{});

    musicButton.textContent="🔊";

}


function alternarMusica(){

    if(player.paused){

        player.play();

    }else{

        player.pause();

    }

    actualizarIconoMusica();

}

musicButton.addEventListener("click",alternarMusica);


// ======================================================
// CONTADOR
// ======================================================

function actualizarContador(){

    const ahora=new Date();

    const diferencia=ahora-FECHA_INICIO;

    const dias=Math.floor(diferencia/86400000);

    const horas=Math.floor((diferencia%86400000)/3600000);

    const minutos=Math.floor((diferencia%3600000)/60000);

    $("days").textContent=dias;

    $("hours").textContent=horas;

    $("minutes").textContent=minutos;

}

setInterval(actualizarContador,1000);


// ======================================================
// BOTONES INICIALES
// ======================================================

openBook.addEventListener("click",()=>{

    iniciarMusica();

    mostrarPantalla("intro");

});


startAlbum.addEventListener("click",()=>{

    actualizarContador();

    mostrarPantalla("counterScreen");

});


continueAlbum.addEventListener("click",()=>{

    mostrarPantalla("album");

    cargarFoto();

});

// ======================================================
// PRECARGAR FOTOS
// ======================================================

function precargarAlbum(){

    for(let i=1;i<=TOTAL_FOTOS;i++){

        const img=new Image();

        img.src=`fotos/${String(i).padStart(2,"0")}.jpg`;

    }

}


// ======================================================
// CARGAR FOTO
// ======================================================

function cargarFoto(){

    fotoActual = Math.max(1, Math.min(fotoActual, TOTAL_FOTOS));

    const numero = String(fotoActual).padStart(2,"0");

    photo.classList.remove("loaded");

    photo.onload = () => photo.classList.add("loaded");

    photo.src = `fotos/${numero}.jpg`;

    caption.textContent =
        (typeof frases !== "undefined" && frases[fotoActual-1])
            ? frases[fotoActual-1]
            : "";

    currentPhoto.textContent = fotoActual;
    totalPhotos.textContent = TOTAL_FOTOS;

    progressFill.style.width =
        `${(fotoActual / TOTAL_FOTOS) * 100}%`;

    

}


// ======================================================
// FOTO SIGUIENTE
// ======================================================

function siguienteFoto(){

    photo.classList.remove("zoom");

    if(fotoActual < TOTAL_FOTOS){

        fotoActual++;

        cargarFoto();

        return;

    }

    mostrarPantalla("letter");

}


// ======================================================
// FOTO ANTERIOR
// ======================================================

function anteriorFoto(){

    photo.classList.remove("zoom");

    if(fotoActual === 1){

        return;

    }

    fotoActual--;

    cargarFoto();

}

// ======================================================
// BOTONES
// ======================================================

if(next){

    next.addEventListener("click",siguienteFoto);

}

if(prev){

    prev.addEventListener("click",anteriorFoto);

}


// ======================================================
// TECLADO
// ======================================================

document.addEventListener("keydown",(e)=>{

    if(!album.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        siguienteFoto();

    }

    if(e.key==="ArrowLeft"){

        anteriorFoto();

    }

});


// ======================================================
// GESTOS TÁCTILES
// ======================================================

album.addEventListener("touchstart",(e)=>{

    inicioX=e.touches[0].clientX;

});


album.addEventListener("touchend",(e)=>{

    const finX=e.changedTouches[0].clientX;

    const diferencia=inicioX-finX;

    if(Math.abs(diferencia)<60){

        return;

    }

    if(diferencia>0){

        siguienteFoto();

    }else{

        anteriorFoto();

    }

});


// ======================================================
// ZOOM FOTO
// ======================================================

photo.addEventListener("click",()=>{

    photo.classList.toggle("zoom");

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        photo.classList.remove("zoom");

    }

});

// ======================================================
// TEXTO DE LA CARTA
// ======================================================

const CARTA =`Querida María,

Hace exactamente un año comenzó la mejor aventura de mi vida.

Desde aquel 12 de julio mi mundo cambió por completo.

Gracias por cada abrazo, cada beso, cada risa y por estar a mi lado incluso en los días difíciles.

Este pequeño álbum no pretende resumir todo lo que hemos vivido, porque sería imposible, pero sí guardar algunos de los momentos que más felices me hacen cuando los recuerdo.

Ojalá dentro de muchos años podamos volver a abrir esta página y seguir sonriendo al recordar este primer aniversario.

Gracias por elegirme cada día.

Te quiero muchísimo.

Feliz primer aniversario.

Con todo mi amor,

Alba ❤️`;


// ======================================================
// EFECTO MÁQUINA DE ESCRIBIR
// ======================================================

async function escribirCarta(){

    if(escribiendoCarta){

        return;

    }

    escribiendoCarta = true;

    const texto = CARTA;

    letterText.innerHTML = "";

    for(let i=0;i<texto.length;i++){

        letterText.innerHTML += texto[i];

        let velocidad = VELOCIDAD_CARTA;

        switch(texto[i]){

            case ",":
                velocidad = 120;
                break;

            case ".":
            case "!":
            case "?":
                velocidad = 220;
                break;

            case "\n":
                velocidad = 280;
                break;

        }

        await new Promise(resolve=>setTimeout(resolve,velocidad));

    }

}

// ======================================================
// ABRIR SOBRE
// ======================================================

function abrirCarta(){

    envelope.style.display="none";

    letterPaper.classList.remove("hidden");

    letterPaper.classList.add("show");

    escribirCarta();

}

// ======================================================
// EVENTO SOBRE
// ======================================================

if(envelope){

    envelope.addEventListener("click",abrirCarta);

}

// ======================================================
// BOTÓN FINAL
// ======================================================

if(finish){

    finish.addEventListener("click",()=>{

        mostrarPantalla("ending");

    });

}

// ======================================================
// RECUPERAR ÚLTIMA FOTO
// ======================================================




// ======================================================
// REANUDAR MÚSICA
// ======================================================

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        return;

    }

    if(musicaIniciada && player.paused){

        player.play().catch(()=>{});

    }

});


// ======================================================
// CERRAR ZOOM AL CAMBIAR DE FOTO
// ======================================================

function cerrarZoom(){

    photo.classList.remove("zoom");

}


// Sobrescribimos ligeramente la navegación

const siguienteOriginal = siguienteFoto;

siguienteFoto = function(){

    cerrarZoom();

    siguienteOriginal();

}

const anteriorOriginal = anteriorFoto;

anteriorFoto = function(){

    cerrarZoom();

    anteriorOriginal();

}


// ======================================================
// PRECARGAR RECURSOS
// ======================================================

window.addEventListener("load",()=>{

    precargarAlbum();

});


// ======================================================
// INICIALIZACIÓN
// ======================================================

function init(){

    actualizarContador();

    actualizarIconoMusica();

    fotoActual = 1;
    
    cargarFoto();

    totalPhotos.textContent = TOTAL_FOTOS;

}

init();

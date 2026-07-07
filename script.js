// ======================================================
// ALBA & MARÍA
// SCRIPT V6.0
// PARTE 1/4
// ======================================================

// ------------------------------
// CONFIGURACIÓN
// ------------------------------

const TOTAL_FOTOS = 50;
const FECHA_INICIO = new Date("2025-07-12T00:00:00");

let fotoActual = 1;
let inicioX = 0;

// ------------------------------
// ATAJO
// ------------------------------

const $ = (id) => document.getElementById(id);

// ------------------------------
// ELEMENTOS
// ------------------------------

const player = $("player");
const musicButton = $("musicButton");

const photo = $("photo");
const caption = $("caption");

const next = $("next");
const prev = $("prev");

const currentPhoto = $("currentPhoto");
const totalPhotos = $("totalPhotos");
const progressFill = $("progressFill");

const envelope = $("envelope");
const letterPaper = $("letterPaper");
const letterText = $("letterText");
const finish = $("finish");

// ------------------------------
// PANTALLAS
// ------------------------------

const screens = document.querySelectorAll(".screen");

function mostrarPantalla(id){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    const destino=$(id);

    if(destino){

        destino.classList.add("active");

    }

}

// ------------------------------
// MÚSICA
// ------------------------------

function iniciarMusica(){

    if(!player) return;

    player.play().catch(()=>{});

}

function cambiarIconoMusica(){

    if(player.paused){

        musicButton.textContent="🔇";

    }else{

        musicButton.textContent="🔊";

    }

}

if(musicButton){

    musicButton.addEventListener("click",()=>{

        if(player.paused){

            player.play();

        }else{

            player.pause();

        }

        cambiarIconoMusica();

    });

}

// ------------------------------
// CONTADOR
// ------------------------------

function actualizarContador(){

    const ahora=new Date();

    const diferencia=ahora-FECHA_INICIO;

    const dias=Math.floor(diferencia/86400000);

    const horas=Math.floor(

        (diferencia%86400000)/3600000

    );

    const minutos=Math.floor(

        (diferencia%3600000)/60000

    );

    if($("days")) $("days").textContent=dias;

    if($("hours")) $("hours").textContent=horas;

    if($("minutes")) $("minutes").textContent=minutos;

}

setInterval(actualizarContador,1000);

// ------------------------------
// RECUPERAR FOTO
// ------------------------------

const guardada=localStorage.getItem("ultimaFoto");

if(guardada){

    fotoActual=parseInt(guardada);

    if(isNaN(fotoActual)){

        fotoActual=1;

    }

}

// ------------------------------
// CAMBIAR FOTO
// ------------------------------

function actualizarBarra(){

    currentPhoto.textContent=fotoActual;

    totalPhotos.textContent=TOTAL_FOTOS;

    progressFill.style.width=(

        fotoActual/TOTAL_FOTOS*100

    )+"%";

}

function cargarFoto(){

    const numero=String(fotoActual).padStart(2,"0");

    photo.classList.remove("loaded");

    photo.src=`fotos/${numero}.jpg`;

    photo.onload=()=>{

        photo.classList.add("loaded");

    };

    if(typeof frases!=="undefined"){

        caption.textContent=frases[fotoActual-1]||"";

    }

    actualizarBarra();

    localStorage.setItem(

        "ultimaFoto",

        fotoActual

    );

    precargar();

}

function precargar(){

    if(fotoActual>=TOTAL_FOTOS){

        return;

    }

    const img=new Image();

    img.src=`fotos/${String(fotoActual+1).padStart(2,"0")}.jpg`;

}

// ======================================================
// CONTINÚA EN LA PARTE 2
// ======================================================
// ======================================================
// SCRIPT V6.0
// PARTE 2/4
// NAVEGACIÓN DEL ÁLBUM
// ======================================================

// ------------------------------
// SIGUIENTE FOTO
// ------------------------------

function siguienteFoto(){

    if(fotoActual < TOTAL_FOTOS){

        fotoActual++;

        cargarFoto();

    }else{

        mostrarPantalla("letter");

    }

}

// ------------------------------
// FOTO ANTERIOR
// ------------------------------

function anteriorFoto(){

    if(fotoActual > 1){

        fotoActual--;

        cargarFoto();

    }

}

// ------------------------------
// BOTONES
// ------------------------------

if(next){

    next.addEventListener("click", siguienteFoto);

}

if(prev){

    prev.addEventListener("click", anteriorFoto);

}

// ------------------------------
// TECLADO
// ------------------------------

document.addEventListener("keydown",(e)=>{

    const album = $("album");

    if(!album.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        siguienteFoto();

    }

    if(e.key==="ArrowLeft"){

        anteriorFoto();

    }

});

// ------------------------------
// GESTOS TÁCTILES
// ------------------------------

document.addEventListener("touchstart",(e)=>{

    if(!$("album").classList.contains("active")) return;

    inicioX = e.changedTouches[0].clientX;

},{passive:true});

document.addEventListener("touchend",(e)=>{

    if(!$("album").classList.contains("active")) return;

    const finX = e.changedTouches[0].clientX;

    const diferencia = finX - inicioX;

    if(Math.abs(diferencia) < 60){

        return;

    }

    if(diferencia < 0){

        siguienteFoto();

    }else{

        anteriorFoto();

    }

},{passive:true});

// ------------------------------
// BOTONES PRINCIPALES
// ------------------------------

$("openBook").addEventListener("click",()=>{

    iniciarMusica();

    mostrarPantalla("intro");

});

$("startAlbum").addEventListener("click",()=>{

    actualizarContador();

    mostrarPantalla("counterScreen");

});

$("continueAlbum").addEventListener("click",()=>{

    mostrarPantalla("album");

    cargarFoto();

});

// ------------------------------
// PRECARGAR TODO EL ÁLBUM
// ------------------------------

function precargarAlbum(){

    for(let i=1;i<=TOTAL_FOTOS;i++){

        const img=new Image();

        img.src=`fotos/${String(i).padStart(2,"0")}.jpg`;

    }

}

// ======================================================
// CONTINÚA EN LA PARTE 3
// ======================================================
// ======================================================
// SCRIPT V6.0
// PARTE 3/4
// CARTA Y FINAL
// ======================================================

// ------------------------------
// TEXTO DE LA CARTA
// ------------------------------

const carta = `Querida María,

Si has llegado hasta aquí es porque acabas de volver a recorrer algunos de nuestros recuerdos favoritos.

Ha pasado un año desde que empezó esta historia y todavía me emociono al pensar en todo lo que hemos vivido.

Gracias por hacerme tan feliz.

Gracias por cada sonrisa.

Gracias por cada abrazo.

Gracias por cada viaje.

Gracias por estar siempre a mi lado.

Cada una de estas fotografías representa un momento que guardaré para siempre en mi corazón.

Pero sé que las mejores fotografías todavía no las hemos hecho.

Porque lo mejor de nuestra historia aún está por llegar.

Feliz primer aniversario.

Te quiero muchísimo.

Con todo mi amor,

Alba ❤️`;

// ------------------------------
// ABRIR SOBRE
// ------------------------------

function abrirCarta(){

    if(!envelope || !letterPaper) return;

    envelope.style.display="none";

    letterPaper.classList.remove("hidden");

    letterPaper.classList.add("show");

    escribirCarta();

}

if(envelope){

    envelope.addEventListener("click",abrirCarta);

}

// ------------------------------
// EFECTO ESCRITURA
// ------------------------------

function escribirCarta(){

    const parrafo = document.querySelector("#letterText p");

    if(!parrafo) return;

    parrafo.textContent="";

    let i=0;

    function escribir(){

        if(i<carta.length){

            parrafo.textContent += carta.charAt(i);

            i++;

            setTimeout(escribir,25);

        }

    }

    escribir();

}

// ------------------------------
// BOTÓN FINAL
// ------------------------------

if(finish){

    finish.addEventListener("click",()=>{

        mostrarPantalla("ending");

    });

}

// ------------------------------
// REINICIAR CARTA
// ------------------------------

function reiniciarCarta(){

    const parrafo=document.querySelector("#letterText p");

    if(parrafo){

        parrafo.textContent="";

    }

    if(letterPaper){

        letterPaper.classList.remove("show");

        letterPaper.classList.add("hidden");

    }

    if(envelope){

        envelope.style.display="flex";

    }

}

// ------------------------------
// BAJAR VOLUMEN EN LA CARTA
// ------------------------------

function bajarMusica(){

    if(player){

        player.volume=0.35;

    }

}

function subirMusica(){

    if(player){

        player.volume=1;

    }

}

if(envelope){

    envelope.addEventListener("click",bajarMusica);

}

if(finish){

    finish.addEventListener("click",subirMusica);

}

// ======================================================
// CONTINÚA EN LA PARTE 4
// ======================================================
// ======================================================
// SCRIPT V6.0
// PARTE 4/4
// INICIALIZACIÓN Y EFECTOS
// ======================================================

// ------------------------------
// EFECTO FADE EN LAS FOTOS
// ------------------------------

if(photo){

    photo.addEventListener("load",()=>{

        photo.classList.add("loaded");

    });

}

// ------------------------------
// AMPLIAR FOTO
// ------------------------------

let fotoAmpliada=false;

if(photo){

    photo.addEventListener("click",()=>{

        if(!fotoAmpliada){

            photo.classList.add("fullscreen");

            document.body.style.overflow="hidden";

            fotoAmpliada=true;

        }

        else{

            photo.classList.remove("fullscreen");

            document.body.style.overflow="auto";

            fotoAmpliada=false;

        }

    });

}

// ------------------------------
// PRECARGAR TODO EL ÁLBUM
// ------------------------------

function precargarAlbum(){

    for(let i=1;i<=TOTAL_FOTOS;i++){

        const img=new Image();

        img.src=`fotos/${String(i).padStart(2,"0")}.jpg`;

    }

}

// ------------------------------
// INICIALIZACIÓN
// ------------------------------

window.addEventListener("load",()=>{

    actualizarContador();

    cambiarIconoMusica();

    actualizarBarra();

    precargarAlbum();

});

// ------------------------------
// VISIBILIDAD DE LA PÁGINA
// ------------------------------

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        if(player && !player.paused){

            player.pause();

        }

    }else{

        if(player){

            player.play().catch(()=>{});

        }

    }

});

// ------------------------------
// RECALCULAR BARRA
// ------------------------------

window.addEventListener("resize",()=>{

    actualizarBarra();

});

// ======================================================
// FIN DEL SCRIPT V6
// ======================================================
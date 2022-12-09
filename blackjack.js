//botton
let indecesCard = 0;
let sumGlobal=0;



function Pedir(arr,baraja, ente="player",cartaexample, promesaSecuencial){

  arr.push(baraja.shift());

  let clone =cartaexample.cloneNode(true);

  indecesCard+=1;
  let clase;
  let place;
  let id;

  if(ente == "player"){

    place = document.getElementById("barajaPlayer")
    clase = "cardplayer";
    id = 'cardplayer'

  }else{

    place = document.getElementById("botBaraja")
    clase = "cardbot";
    id = 'cardbot0'

  }

  clone.className = clase;

  clone.id = id+arr.length-1;

  place.appendChild(clone);

  document.getElementById(clone.id).src = "img"+arr[arr.length-1].img+".png";
 

  // promesaSecuencial(arr,"player",sumGlobal).then((valor)=>{

  //   sumGlobal=valor
  //   console.log(sumGlobal);
  //   //  FUNCION IMPORTANTE PONER TABLERO//
  // })

}

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}

function ponerCartasIniciales(arr1, arr2) {


  for (let i = 0; i < 2; i++) {

    if (i == 0) {

      for (let j = 0; j < arr1.length; j++) {

        let card = document.createElement('img'); //Crea etiq uetas de HTML
        card.className = 'cardplayer';
        card.id = 'cardplayer' + j;
        card.src = arr1[j].img + ".png"; //Dirreciòn


        let placePlayer = document.getElementById('barajaPlayer');

        placePlayer.appendChild(card);

      }

    } else {

      

          for (let b = 0; b < arr2.length; b++) {

            let card = document.createElement('img');
            card.className = 'cardbot';
            card.id = 'cardbot' + b;
            card.src = arr2[b].img + ".png";

            let placebot = document.getElementById('botBaraja');

            placebot.appendChild(card);
          }

    }
  }
}

function borrarboton () {

  let w = document.getElementById("btn-place");
   
  let x=  document.getElementById('boton');
   
  let borrado = w.removeChild(x);
  console.log(borrado)

  return borrado;

}


function ponerBotones(borrado){

  let place = document.getElementById('btn-place');

  let quedar = borrado.cloneNode(true);

    quedar.innerText = 'Quedar'
    quedar.onclick = ''
    quedar.id = 'quedar';


  let pedir =  borrado.cloneNode(true);



  pedir.removeEventListener("click",newGame);
  pedir.onclick = ''
  pedir.innerText = 'pedir'
  pedir.id = "pedir"
  

  place.appendChild(pedir);
  place.appendChild(quedar);
 
}


//Construir el objeto de tipo MAP
//Funcion para construir baraja

function cartas() {
  let Array = [];

  for (let i = 1; i <= 13; i++) {
    if (i == 11 || i == 12 || i == 13 || i == 1) { //Refactorizar
      if (i == 11) {
        Array.push(11);
      } else if (i == 12) {
        Array.push(12);
      } else if (i == 13) {
        Array.push(13);
      } else if (i == 1) {
        Array.push(1);
      }
    } else {
      Array.push(i);
    }
  }

  return Array;
}

let baraja = new Map([
  ["corazon", cartas()],
  ["trebol", cartas()],
  ["pica", cartas()],
  ["diamante", cartas()],
]); //Instanciar un objeto de tipo

function aleatorio(a) {

  let iterable = a.keys();
  let arrayPalo = [];

  for (let i = 0; i < 4; i++) {
    arrayPalo.push(iterable.next().value);
  }

  var rand = Math.floor(Math.random() * arrayPalo.length);
  var rValue = arrayPalo[rand];

  return rValue;
}

baraja.forEach((valor, clave) => {
  baraja.set(clave, _.shuffle(valor));
});

//as como 1 o 11//

//console.log(jugador);//
//console.log(bot);//
//console.log(baraja)//

//crear funcion para valores de cartas//
// los jugadores
let playJugador = 0;
let playBot = 0;

//sumatoria de  cartas del jugador
function sumatoria(ENTE) {
  //Hay que cambiar
  //Cambiar logica
  let sum = 0;

  for (i = 0; i < b.length; i++) {
    if (b[i] == "J" || "Q" || "K") {
      sum += 10;
    } else if (b[i] == "A") {
      //CONDICIONAL
    } else {
      sum += b[i];
    }
  }

  return sum;
}

function platillaCarta(tipo, valor, img) {
  this.img = img;
  this.valor = valor;
  this.tipo = tipo;
}

function deleteCards() {

  let place1 = document.getElementById("barajaPlayer");//-->creamos variable que sea igual a la llamada del div id "barajaPlayer"// 

  let cards;  //-->creamos variable que almacene a las imagenes por class "card"//

  for (let i = 0; i < 8; i++) {

    cards = document.getElementById("cardplayer" + i);
    place1.removeChild(cards)

  }

  let place2 = document.getElementById("botBaraja");

  for (let i = 0; i < 8; i++) {

    cards = document.getElementById("cardbot" + i);
    place2.removeChild(cards)

  }

}

//-->creamos variable que guarde el cambio de borrar  los hijos de la variable "place".


function newGame() {
  let jugador = [];
  let bot = [];

  // se crea la baraja//
  let baraja = new Map([
    ["corazon", cartas()],
    ["trebol", cartas()],
    ["pica", cartas()],
    ["diamante", cartas()],
  ]);
  // se revuleve la baraja//
  baraja.forEach((valor, clave) => {
    baraja.set(clave, _.shuffle(valor));
  });

  //dar dos cartas a cada jugador//

  let img;

  for (let i = 0; i <= 3; i++) {

    let tipo = aleatorio(baraja);

    if (tipo == "diamante") {
      img = "img/D";
    } else if (tipo == "trebol") {
      img = "img/T";
    } else if (tipo == "pica") {
      img = "img/P";
    } else if (tipo == "corazon") {
      img = "img/C";
    }

    if (i < 2) {
      jugador.push(new platillaCarta(tipo, baraja.get(tipo).shift(), img + baraja.get(tipo).shift()));
    } else {
      bot.push(new platillaCarta(tipo, baraja.get(tipo).shift(), img + baraja.get(tipo).shift()));
    }

  }


  //FUNCION PARA LIMPIAR EEL TABLERO
  deleteCards();
  //FUncion eliminar boton

  let btnBorrado = borrarboton();

  console.log(btnBorrado);

  ponerBotones(btnBorrado);

  document.getElementById("quedar").addEventListener("click",(_) =>{

    console.log('Saludos desde el boton Quedar')


  });

  document.getElementById("pedir").addEventListener("click",(_) =>{

    Pedir(arr,baraja, ente="player",cartaexample, promesaSecuencial)
 
  });
  

  console.log(jugador)
  console.log(bot)

  ponerCartasIniciales(jugador, bot)


}





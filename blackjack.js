//botton
let indecesCard = 0;
let sumGlobal = 0;

//!Constantes de elección para el SweetAlert (Constante global)
const inputOptions = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      1: "1",
      11: "11",
    });
  }, 1000);
});

const optionAlert = {
  //!Necesita el await
  title: "¿11 o 1?",
  text: "¿ Qué valor deseas ?",
  input: "radio",
  inputOptions: inputOptions,
  icon: "question",
  confirmButtonText: "Aceptar",
  inputValidator: (value) => {
    if (!value) {
      return "You need to choose something!";
    }
  },
};

function botSum (arr){

  let sum = 0

  for (let i = 0; i < arr.length; i++) {

    if (arr[i].valor == 11 || arr[i].valor == 12 || arr[i].valor == 13) {
      
      sum += 10;

    } else if (arr[i].valor == 1) {
      
      sum += botLogic(sum);

    } else {
      
      sum += arr[i].valor;

    }
  }

  console.log("Soy la suma del bot" +sum);
return sum;

}

const endGame = (Ente) => {
  swal.fire({
    title: "El ganador es : " + Ente,
    text: "Buen juego",
    width: "20%",
    showConfirmButton: true,
    icon: "warning",
  });

  setTimeout(() => {location.reload()}, 3000); //*Ojo con el tiempo
};

function ganador(resultadoBot,resultadoPlayer){

  resultadoBot = 21 - resultadoBot;
  resultadoPlayer = 21 - resultadoPlayer; 

  if(resultadoBot < resultadoPlayer && resultadoBot <= 21 && resultadoBot >= 0){
   
    endGame("BOT");

  }else if( resultadoBot == resultadoPlayer){

    document.write("Nadie gano y todos se murieron");

  }else if (resultadoBot < resultadoPlayer && resultadoPlayer <= 21 && resultadoPlayer >= 0){

    endGame("player");

  }



}

const quedar = function (arrBot,cartaExample,baraja){

  let nodoPadre = document.getElementById("botBaraja");


  let clon = cartaExample.cloneNode(true);

    let img = arrBot[0].img;
    console.log(img);
    clon.id = "cart";
    clon.className = "cardbot"
    

  nodoPadre.replaceChild(clon,document.getElementById("cardbot0"))
  document.querySelector("#cart").id = "cardbot0"
  document.querySelector("#cardbot0").src = img + ".png";

  let primer = sumArray(arrBot,"Bot") 

  
  primer.then(valor =>{
            
    let cambioPromesa = valor
    let comprobante = 0;

    while(cambioPromesa < 20){
      console.log("Cambio de variable exogena " +cambioPromesa);
      comprobante += 1;
      console.log(comprobante);

  
      cambioPromesa = Pedir(arrBot,baraja,"bot",cartaExample,sumArray);


    }

    ponerSumEnTablero(cambioPromesa,"Bot")

    ganador(cambioPromesa,sumGlobal);
  })

}


function ponerSumEnTablero(sum, ente) {
  //!Hay que acomodar el puntaje para el bot cuando se presione me quedo

  console.log(ente)
  let child = document.createElement("h1");

  if (document.getElementById("player") == null && document.getElementById("playerScore") != null && ente == "player" ) {

    document.getElementById("scoreEnd").innerText = "PLAYER : " + sum;

  }else if(document.getElementById("bot") == null && document.getElementById("BotScore") != null && ente == "bot"){
     document.getElementById("scoreEndBot").innerText = "Bot : " + sum;
   }else{
    
   
  if(document.getElementById("player") != null ){
    document.getElementById("playerScore").removeChild(document.getElementById("player"));
  }else if(document.getElementById("bot") != null ){
    document.getElementById("BotScore").removeChild(document.getElementById("bot"));

  }

    let place = "";

    if (ente == "player") {
      place = document.getElementById("playerScore");
      child.innerText = "PLAYER : " + sum;
      child.id = "scoreEnd";

      place.appendChild(child);

    } else {
      console.log("Primera entrada en tablero BOT")
      place = document.getElementById("BotScore"); //!Establecer Logica para bot******************************
      child.innerText = "Bot : " + sum;
      child.id = "scoreEndBot";

      place.appendChild(child);
    }
  }
}


async function popUp(configuracionAlerta) {
  const { value: color } = await Swal.fire(configuracionAlerta);

  return color;
}

// let valor = popUp(optionAlert);
// console.log(typeof valor);

// async function waiter (promesaTest){ //!Example

//   promesaTest.then(valor =>{
//     if (valor) {
//       Swal.fire({ html: `You selected: ${valor}` })
//     }
//   })
// }

// waiter(valor);

function botLogic(sum) {
  if (sum <= 10) {
    return 11;
  } else {
    return 1;
  }
}

function Pedir(arr, baraja, ente = "player", cartaexample, promesaSecuencial) {

  console.log(baraja)
  let img;
  let tipo = aleatorio(baraja); //Define un tipo estatico

    if (tipo == "diamante") {
      img = "img/D";
    } else if (tipo == "trebol") {
      img = "img/T";
    } else if (tipo == "pica") {
      img = "img/P";
    } else if (tipo == "corazon") {
      img = "img/C";
    }

    let valor = baraja.get(tipo).shift(); //Define un valor estatico

    
  arr.push(new platillaCarta(tipo, valor, img + valor))

  console.log(baraja)

  console.log(arr)

  let clone = cartaexample.cloneNode(true);

  indecesCard += 1;
  let clase ="";
  let place ="";
  let id ="";

  if (ente == "player") {
    place = document.getElementById("barajaPlayer");
    clase = "cardplayer";
    console.log(arr.length-1)
    id = "cardplayer"+(arr.length-1);
  } else {
    console.log("Estoy acá")
    place = document.getElementById("botBaraja");
    clase = "cardbot";
    id = "cardbot"+(arr.length-1);
  }

  clone.className = clase;
  console.log(id)
  clone.id = id;

  place.appendChild(clone);

  console.log(document.getElementById(clone.id))
  console.log(img + valor+".png")

  document.getElementById(clone.id).src = img + valor+".png";

  //Sumatoria por ente
  if(ente == "player"){
    promesaSecuencial(arr, ente, sumGlobal).then((valor) => {
      sumGlobal = valor;      
      console.log(sumGlobal);
      ponerSumEnTablero(sumGlobal, ente);
    });
  }else{
    console.log("Estoy cerca")
    return botSum(arr);

  }

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
        let card = document.createElement("img"); //Crea etiq uetas de HTML
        card.className = "cardplayer";
        card.id = "cardplayer" + j;
        card.src = arr1[j].img + ".png"; //Dirreciòn

        let placePlayer = document.getElementById("barajaPlayer");

        placePlayer.appendChild(card);
      }
    } else {
      for (let b = 0; b < arr2.length; b++) {
        let card = document.createElement("img");
        card.className = "cardbot";
        card.id = "cardbot" + b;

        card.id == "cardbot0"
          ? (card.src = "img/back.png")
          : (card.src = arr2[b].img + ".png"); //!Una carta del Bot boca bajo

        let placebot = document.getElementById("botBaraja");

        placebot.appendChild(card);
      }
    }
  }
}

function borrarboton() {
  let w = document.getElementById("btn-place");

  let x = document.getElementById("boton");

  let borrado = w.removeChild(x);

  return borrado;
}

function ponerBotones(borrado) {
  let place = document.getElementById("btn-place");

  let quedar = borrado.cloneNode(true);

  quedar.innerText = "Quedar";
  quedar.onclick = "";
  quedar.id = "quedar";

  let pedir = borrado.cloneNode(true);

  pedir.removeEventListener("click", newGame);
  pedir.onclick = "";
  pedir.innerText = "Pedir";
  pedir.id = "pedir";

  place.appendChild(pedir);
  place.appendChild(quedar);
}

function cartas() {
  let Array = [];

  for (let i = 1; i <= 13; i++) {
    if (i == 11 || i == 12 || i == 13 || i == 1) {
      //Refactorizar
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

async function sumArray(arr, ente, sumAnterior = null) {
  if (ente == "player") {
    let sum = 0;

    const propiedades = {
      title: "Usted tiene un AS",
      icon: "question",
      text: "¿ Qué valor deseas tomar?",
      confirmButtonText: "ACEPTAR",
      allowOutsideClick: false, //!Propiedad que permite que la ventana
      allowEscapeKey: false, //!No permite que otros eventos por tecla funcione
      allowEnterKey: true, //!Bloque la función de ENTER en el popUp
      stopKeydownPropagation: false,
      customClass: {
        title: "titulo-pop",
        text: "text-pop",
      },
      width: "20%",
      confirmButtonColor: "red",
      input: "radio",
      inputOptions: new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            1: "1",
            11: "11",
          });
        }, 1000);
      }),
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas seleccionar algo primero!";
        }
      },
    };

    if (sumAnterior == null) {
      console.log("Soy la primera suma");

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].valor == 11 || arr[i].valor == 12 || arr[i].valor == 13) {
          sum += 10;
        } else if (arr[i].valor == 1) {
          if (ente == "player") {
            let { value: valor } = await swal.fire(propiedades);

            sum += parseInt(valor);
          } else {
            sum += botLogic(sum);
          }
        } else {
          sum += arr[i].valor;
        }
      }

    } else {
      if (arr[arr.length - 1].valor == 1) {
        let { value: valor } = await swal.fire(propiedades);

        sumGlobal += parseInt(valor);
        sum = sumGlobal;

        // return sum; //!POSIBLE ERROR A
      } else if (
        arr[arr.length - 1].valor == 11 ||
        arr[arr.length - 1].valor == 12 ||
        arr[arr.length - 1].valor == 13
      ) {
        sumGlobal += 10;
        sum = sumGlobal;
      } else {
        sumGlobal += arr[arr.length - 1].valor;

        sum = sumGlobal;
      }
    }

    if (sum == 21) {
      endGame(ente);
    } else if (sum > 21) {
      let ganadorFinal = ente == "player" ? "bot" : "player";
      console.log("Gnador en sumArray " + ganadorFinal);
      endGame(ganadorFinal);
    }

    console.log("Valor de retorno :" + sum);
    sumGlobal = sum;

    return sum;
  } else {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].valor == 11 || arr[i].valor == 12 || arr[i].valor == 13) {
        sum += 10;
      } else if (arr[i].valor == 1) {
        sum += botLogic(sum);
      } else {
        sum += arr[i].valor;
      }
    }

    console.log("Soy la suma del bot" + sum);
    return sum;
  }
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

//sumatoria de cartas del jugador
function sumatoria(ENTE, participante) {
  //Hay que cambiar
  //Cambiar logica
  let sum = 0;
  console.log(ENTE);

  for (i = 0; i < ENTE.length; i++) {
    if (ENTE[i].valor == 11 || ENTE[i].valor == 12 || ENTE[i].valor == 13) {
      sum += 10;
    } else if (ENTE[i].valor == 1) {
      //CONDICIONAL //!Se convierte en promesa o en un numero entero
      participante == "player"
        ? popUp(optionAlert).then((valor) => {
            sum += valor;
          })
        : (sum += botLogic(sum)); //!Sumatoria
      console.log(sum);
    } else {
      sum += ENTE[i].valor;
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
  let place1 = document.getElementById("barajaPlayer"); //-->creamos variable que sea igual a la llamada del div id "barajaPlayer"//

  let cards; //-->creamos variable que almacene a las imagenes por class "card"//
  let borrado;

  for (let i = 0; i < 8; i++) {
    cards = document.getElementById("cardplayer" + i);
    place1.removeChild(cards);
  }

  let place2 = document.getElementById("botBaraja");

  for (let i = 0; i < 8; i++) {
    cards = document.getElementById("cardbot" + i);
    borrado = place2.removeChild(cards);
    
  }


  return borrado;

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
    baraja.set(clave, _.shuffle(valor)); //!No devulve todos los valores
  });

  //dar dos cartas a cada jugador//

  let img;

  for (let i = 0; i <= 3; i++) {
    let tipo = aleatorio(baraja); //Define un tipo estatico

    if (tipo == "diamante") {
      img = "img/D";
    } else if (tipo == "trebol") {
      img = "img/T";
    } else if (tipo == "pica") {
      img = "img/P";
    } else if (tipo == "corazon") {
      img = "img/C";
    }

    let valor = baraja.get(tipo).shift(); //Define un valor estatico

    if (i < 2) {
      jugador.push(new platillaCarta(tipo, valor, img + valor));
    } else {
      bot.push(new platillaCarta(tipo, valor, img + valor));
    }
  }

  //FUNCION PARA LIMPIAR EEL TABLERO
  let eliminado = deleteCards();
  //FUncion eliminar boton

  let btnBorrado = borrarboton();

  ponerBotones(btnBorrado);



  document.getElementById("pedir").addEventListener("click", (_) => {
    Pedir(jugador, baraja,"player", eliminado, sumArray);
  });

  ponerCartasIniciales(jugador, bot);

  sumArray(jugador, "player").then( valor =>{

    ponerSumEnTablero(valor,"player");

  })

  document.getElementById("quedar").addEventListener("click", (_) => {
    
    quedar(bot,eliminado,baraja)
  });


  console.log(jugador);
  console.log(bot);
  
}

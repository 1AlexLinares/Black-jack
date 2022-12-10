




function sumatoria(ENTE,participante) {
    //Hay que cambiar
    //Cambiar logica
    let sum = 0;
    console.log(ENTE);
  
    
      for (i = 0; i < ENTE.length; i++) {
        if (ENTE[i].valor == 11 || ENTE[i].valor == 12 ||  ENTE[i].valor == 13) {
          sum += 10;
        } else if (ENTE[i].valor == 1) {
  
          //CONDICIONAL //!Se convierte en promesa o en un numero entero
          (participante == "player") ? popUp(optionAlert).then(valor => {sum+=valor}): sum+=botLogic(sum); //!Sumatoria
          console.log(sum)
        } else {
          sum += ENTE[i].valor;
        }
      }
    
      return sum;
  
  }



  document.getElementById("test").addEventListener("click",(_) =>{

    sumatoria(ENTE,"player")


  });
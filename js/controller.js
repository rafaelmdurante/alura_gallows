var criaController = function(jogo) {

  var $entrada = $('.entrada');
  var $lacunas = $('.lacunas');

  // consulta jogo.getLacunas() e exibe para o usuário cada lacuna
  var exibeLacunas = function () {
    $lacunas.empty();
    jogo.getLacunas().forEach(function(lacuna) {
      $('<li>')
        .addClass('lacuna')
        .text(lacuna)
        .appendTo($lacunas);
    });
  };

  // muda o texto do placeHolder do campo de entrada
  var mudaPlaceHolder = function (texto) {
    $entrada
      .val('')
      .attr('placeholder', texto);
  };

  // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller.
  var guardaPalavraSecreta = function () {
    try {
      jogo.setPalavraSecreta($entrada.val().trim());
      $entrada.val('');
      exibeLacunas();
      mudaPlaceHolder('chuta a letra');
    } catch(err) {
      alert(err.message);
    }
  };

  // lê chute e interpreta pontuaçãoptimize
  var leChute = function() {
    try {
      var chute = $entrada.val().trim().substring(0,1);
      $entrada.val('');
      jogo.processaChute(chute);
      exibeLacunas();

      if (jogo.ganhouOuPerdeu()) {
        setTimeout(function() {
          if(jogo.ganhou()) {
            alert('Ganhou!');
          } else if (jogo.perdeu()) {
            alert('Uma pena, tente novamente!');
          }
          reiniciaController();
        }, 200);
      }  
    } catch(err) {
      alert(err.message);
    }
  };

  var reiniciaController = function() {
    $lacunas.empty();
    mudaPlaceHolder('Palavra secreta');
    jogo.reinicia();
  }

  // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
  var inicia = function () {

    $entrada.keypress(function (event) {
      if (event.which == 13) {
        switch (jogo.getEtapa()) {
          case 1:
            guardaPalavraSecreta();
          break;
          case 2:
            leChute();
          break;
        }
      }
    });
  }
  // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado.
  return { inicia: inicia };

}

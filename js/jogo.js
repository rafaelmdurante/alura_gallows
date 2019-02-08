//recebe sprite como parâmetro
var criaJogo = function (sprite) {

  // ===== VARIABLES =====
  var etapa = 1;
  var lacunas = [];
  var palavraSecreta = '';

  // ===== FUNCTIONS =====
  // processa o chute
  var processaChute = function(chute) {
    var exp = new RegExp(chute, 'gi'),
        res,
        acertou = false;

    while (res = exp.exec(palavraSecreta)) {
      lacunas[res.index] = chute;
      acertou = true;
    }

    if (!acertou) sprite.nextFrame();

  };
  // adiciona uma lacuna em branco para cada letra da palavraSecreta
  var criaLacunas = function () {
    lacunas = Array(palavraSecreta.length).fill('');
  };

  // muda o estado da variável etapa para indicar a próxima e última etapa
  var proximaEtapa = function () {
    etapa++;
  };

  // guarda a palavra secreta, cria as lacunas e vai para a próxima etapa
  var setPalavraSecreta = function (palavra) {
    palavraSecreta = palavra;
    criaLacunas();
    proximaEtapa();
  };

  // única maneira de termos acesso às lacunas fora da função `criaJogo()`
  var getLacunas = function () {
    return lacunas;
  };

  // permite consultar em qual etapa o jogo se encontra
  var getEtapa = function () {
    return etapa;
  };

    // resultado
  let ganhou = function() {
      // lacunas preenchidas
      // funcao some testa se existe alguma condicao assim na array
      return lacunas.length
        ? !lacunas.some(function(lacuna) {
          return lacuna == '';
        })
        : false;
  };

  let perdeu = function() {
      // sprites finalizados
      return sprite.isFinished();
  };

  let ganhouOuPerdeu = function() {
      // boolean
      return ganhou() || perdeu();
  };

  let reinicia = function() {
      // jogo no status zero
      etapa = 1;
      palavraSecreta = '';
      lacuans = [];
      sprite.reset();
  };

  /*
  Tornou acessível apenas as funções que fazem sentido serem chamadas por quem utilizar nosso jogo.
  A função `proximaEtapa()` é de uso interno e só foi criada para melhorar a legibilidade e manutenção do código, a
  mesma coisa para a função `criaLacunas()`.
  */
  // ===== RETURN =====
  return {
    setPalavraSecreta: setPalavraSecreta,
    getLacunas: getLacunas,
    getEtapa: getEtapa,
    processaChute: processaChute,
    ganhou: ganhou,
    perdeu: perdeu,
    ganhouOuPerdeu: ganhouOuPerdeu,
    reinicia: reinicia
  }
};

const grid = document.querySelector('.grid');
const nomeJogadorUm = document.getElementById('jogadorUm');
const nomeJogadorDois = document.getElementById('jogadorDois');
const placarJogadorUm = document.querySelector('.ponto.Um');
const placarJogadorDois = document.querySelector('.ponto.Dois');
const placar = document.querySelector('.placar');
const jogavez = document.querySelector('.jogadordavez');


const Ods = [
'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze'
];

nomeJogadorUm.innerHTML = localStorage.getItem('jogadorUm');
nomeJogadorDois.innerHTML = localStorage.getItem('jogadorDois');

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let primeiraCarta = '';
let segundaCarta = '';
let jogadorAtual = 1;
let acertosConsecutivosJogadorUm = 0;
let errosConsecutivosJogadorUm = 0;
let acertosConsecutivosJogadorDois = 0;
let errosConsecutivosJogadorDois = 0;

const qmganhou = () => {
  const Um = parseInt(placarJogadorUm.textContent);
  const Dois = parseInt(placarJogadorDois.textContent);
  const Empate = 'empate';
  const jogadorum = localStorage.getItem('player-um');
  const jogadordois = localStorage.getItem('player-dois');
    
  if (Um > Dois) {
    localStorage.setItem('ganhador', jogadorum) 
  } else if (Um === Dois) {
    localStorage.setItem('ganhador', Empate);
  } else {
    localStorage.setItem('ganhador', jogadordois); 
  }
};


const final = () => {
    const acertouFinal = document.querySelectorAll('.acertou')
    const numeroOds = Ods.length * 2 ;
    
    if (acertouFinal.length == numeroOds){
        window.location = 'TelaFinal.html';
    }

    qmganhou();
}

const checkCartas = () => {

    const primeiraOds = primeiraCarta.getAttribute('data-par');
    const segundaOds = segundaCarta.getAttribute('data-par');

    if (primeiraOds === segundaOds) {

        primeiraCarta.firstChild.classList.add('acertou');
        segundaCarta.firstChild.classList.add('acertou');
        primeiraCarta = '';
        segundaCarta = '';


        acertouOPar();
        final();


    } else {

        setTimeout(() => {

            primeiraCarta.classList.remove('revelar-carta');
            segundaCarta.classList.remove('revelar-carta');

            primeiraCarta = '';
            segundaCarta = '';
            jogadorAtual = jogadorAtual === 1 ? 2 : 1;;
        }, 500)

        errouOPar();

    }

}


    


const acertouOPar = () => {
    if (jogadorAtual === 1) {
        placarJogadorUm.textContent = parseInt(placarJogadorUm.textContent) + 1;
        errosConsecutivosJogadorUm = 0;
        acertosConsecutivosJogadorUm++;
        if (acertosConsecutivosJogadorUm === 2) {
            placarJogadorUm.textContent = parseInt(placarJogadorUm.textContent) + 5;
            acertosConsecutivosJogadorUm = 0;
        }
    } else {
        placarJogadorDois.textContent = parseInt(placarJogadorDois.textContent) + 1;
        errosConsecutivosJogadorDois = 0;
        acertosConsecutivosJogadorDois++;
        if (acertosConsecutivosJogadorDois === 2) {
            placarJogadorDois.textContent = parseInt(placarJogadorDois.textContent) + 5;
            acertosConsecutivosJogadorDois = 0;
        }
    }
};

const errouOPar = () => {


if(placar > 0 ){
    if (jogadorAtual === 1 ) {
        placarJogadorUm.textContent = parseInt(placarJogadorUm.textContent) - 1;
        acertosConsecutivosJogadorUm = 0;
        errosConsecutivosJogadorUm++;
        if (errosConsecutivosJogadorUm === 2) {
            placarJogadorUm.textContent = parseInt(placarJogadorUm.textContent) - 2;
            errosConsecutivosJogadorUm = 0;
        }
    } else {
        placarJogadorDois.textContent = parseInt(placarJogadorDois.textContent) - 1;
        acertosConsecutivosJogadorDois = 0;
        errosConsecutivosJogadorDois++;
        if (errosConsecutivosJogadorDois === 2) {
            placarJogadorDois.textContent = parseInt(placarJogadorDois.textContent) - 2;
            errosConsecutivosJogadorDois = 0;
            }
        }
    }
    nomevez();
};





const revelarCarta = ({ target }) => {

    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }

    if (primeiraCarta === '') {

        target.parentNode.classList.add('revelar-carta');
        primeiraCarta = target.parentNode;

    }
    else if (segundaCarta === '') {
        target.parentNode.classList.add('revelar-carta');
        segundaCarta = target.parentNode;

        checkCartas();

    }
}

const createCarta = (Ods) => {
    const carta = createElement('div', 'carta');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(   '../img/${Ods}.jpeg')`

    carta.appendChild(front);
    carta.appendChild(back);

    carta.addEventListener('click', revelarCarta);

    carta.setAttribute('data-par', Ods);

    return carta;
};

const loadGame = () => {

    const duplicateOds = [...Ods, ...Ods];

    const embaralharArray = duplicateOds.sort(() => Math.random() - 0.5);

    embaralharArray.forEach((Ods) => {
        const carta = createCarta(Ods);
        grid.appendChild(carta);
    });
};
window.onload = () => {

    nomeJogadorUm.innerHTML = localStorage.getItem('player-um');
    nomeJogadorDois.innerHTML = localStorage.getItem('player-dois');
    loadGame();
    nomevez();
}


const nomevez = () => {

    if(jogadorAtual === 1){

        jogavez.innerHTML = 'vez do: ' + localStorage.getItem('player-um')

    } else{
        jogavez.innerHTML = 'vez do: ' + localStorage.getItem('player-dois');
    }
}
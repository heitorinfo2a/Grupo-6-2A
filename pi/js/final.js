const recomecar = document.querySelector('.recomeçar')

const inicio = document.querySelector('.inicio')

const musica = document.querySelector('audio')

musica.play();

const recomeço= () => {
  window.location = 'game.html'
}
const início = () => {
  window.location = '/index.html'
}

const txt = document.querySelector('.txt')


const vencedor = () => {
  const ganhador = localStorage.getItem('ganhador'); 
  if (ganhador === 'empate') {
    txt.innerHTML = 'Houve um empate';
  } else {
    txt.innerHTML = `O vencedor foi ${ganhador}` ; // Exibe o nome do vencedor
  }
  return;
};
 vencedor();


musica.addEventListener('ended', () => {musica.play()});
recomecar.addEventListener('click', recomeço )
inicio.addEventListener('click', início )
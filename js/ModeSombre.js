let button = document.querySelector('.icon-moon');
let span = document.querySelector('span');

if(localStorage.getItem('theme')) {
  if(localStorage.getItem('theme') == 'sombre') {
    modeSombre();
  }
  console.log(localStorage)
}

button.addEventListener('click', () => {
  if(document.body.classList.contains('dark')) {
     // Mode actuel : clair
    document.body.className = '';
   
  }
  else {
    // Mode sombre
    modeSombre();
  }
  
});

function modeSombre() {
  document.body.className = 'dark';

}
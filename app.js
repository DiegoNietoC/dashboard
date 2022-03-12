/**
 * Se necesita un dashboard con un login muy sencillo para la validación de un CRUD de los datos almacenados en el formulario de contacto.
 * En casos de éxito se maqueta con la siguiente API en listando la imagen, autor y la url de la descarga y es un slider:
 * 
 * Esta es la página
 * https://picsum.photos/
 * 
 * y esta la api a utlizar:
 * https://picsum.photos/v2/list
 * 
 */

const API_URL = "https://picsum.photos/v2/list";
const xhr = new XMLHttpRequest();

function onRequestHandler(){
    if(this.readyState === 4 && this.status === 200){
        const data = JSON.parse(this.response);
        console.log(data);

        const template = data.map( (x, index) => `
            <div class="elem" id="test">
                <img src="${x.download_url}">
                    <article>
                    <h1>${x.author}</h1>
                    <p>Link de descarga:</p>
                    <a href="${x.url}">${x.url}</a>
                    </article>
            </div>
            `);
        const apiAuthor = data.map( (b) => `<li>${b.author}</li>` );
        const apiUrl = data.map( (c) => `<li>${c.url}</li>` );

        document.getElementById('app').innerHTML = `
            <span id="">${template}<span>
            `;
    }
}

xhr.addEventListener("load",onRequestHandler);
xhr.open("GET", `${API_URL}`);
xhr.send();

const buttonRight = document.getElementById('right');
const buttonLeft = document.getElementById('left');

buttonRight.onclick = function () {
  document.getElementById('app').scrollLeft += 100;
};
buttonLeft.onclick = function () {
  document.getElementById('app').scrollLeft -= 100;
};

document.getElementById('ok').onclick = function(){

    let user = document.getElementById('nameAccess').value;
    let mail = document.getElementById('email').value;
    let pw = document.getElementById('pw').value;

    if(pw=="a1b23e4c" && mail=="apiaccess@gmail.com" && user=="admin"){
        window.location.href = "./slider.html";
    } else {
        alert("Nombre, email o contraseña incorrecta!");
    }

};
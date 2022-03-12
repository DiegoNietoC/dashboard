const API_URL = "https://picsum.photos/v2/list";
const xhr = new XMLHttpRequest();

let isContent = /\w+|[^\s]+/;

function onRequestHandler(){
    if(this.readyState === 4 && this.status === 200){
        const data = JSON.parse(this.response);
        console.log(data);

        function show(){
            const template = data.map( (x, index) => `
            
            <div class="elem" id="test">
                <img src="${x.download_url}">
                    <article>
                        <h1>${x.author}</h1><container id="indiceContainer">ID. ${index}</container>
                        <p>Link de descarga:</p>
                        <a href="${x.url}">${x.url}</a>
                    </article>
            </div>
            `);
            document.getElementById('app').innerHTML = `<span id="">${template}<span>`;
        }
        show();

        //Functionality:

        //Delete:
        document.getElementById('del').onclick = function(){
            let idToDelete = document.getElementById('delId').value;
            idToDelete = parseInt(idToDelete);

            if(isNaN(idToDelete)){
                alert("Please, write a number");
            } else {
                data.splice(idToDelete,1);
                show();
                alert("Deleted element "+idToDelete);  
            }

        };

        //form:
        document.getElementById('showForm').onclick = function(){
            document.getElementById('addOrEdit').style.display="flex";
        }
        document.getElementById('closeForm').onclick = function(){
            document.getElementById('addOrEdit').style.display="none";
        }

        //Create:
        document.getElementById('add').onclick = function(){

            let imgAdd = document.getElementById('Img').value;
            let authAdd = document.getElementById('Auth').value;
            let urlAdd = document.getElementById('Url').value;

            if(!isContent.test(imgAdd) || !isContent.test(authAdd) || !isContent.test(urlAdd)){
                alert("All fields are required");
            } else {
                data.push({"download_url":imgAdd, "author":authAdd, "url":urlAdd});
                show();
                alert("Created element.");  
            }

        };

        //Edit:
        document.getElementById('edit').onclick = function(){

            let idEdit = document.getElementById('idAddOrEdit').value;
            idEdit = parseInt(idEdit);
            let imgAdd = document.getElementById('Img').value;
            let authAdd = document.getElementById('Auth').value;
            let urlAdd = document.getElementById('Url').value;

            if(!isContent.test(imgAdd) || !isContent.test(authAdd) || !isContent.test(urlAdd) || isNaN(idEdit)){
                alert("All fields are required");
            } else {
                alert(data[idEdit]);
                data[idEdit] = {"download_url":imgAdd, "author":authAdd, "url":urlAdd};
                show();
                alert("Modified element.");  
            }

        };

    }
}

xhr.addEventListener("load",onRequestHandler);
xhr.open("GET", `${API_URL}`);
xhr.send();


//Buttons:
const buttonRight = document.getElementById('right');
const buttonLeft = document.getElementById('left');

buttonRight.onclick = function () {
  document.getElementById('app').scrollLeft += 150;
};
buttonLeft.onclick = function () {
  document.getElementById('app').scrollLeft -= 150;
};


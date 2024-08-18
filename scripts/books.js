const modal = document.querySelector('#modal');
const form = document.querySelector('#form');

let myLibrary = [];
let idx = 0;

function Book(title,author,genre,picture,pageNum,id){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.picture = picture;
    this.pageNum = pageNum;
    this.id = id;
}

function addBookToLibrary(event){
    event.preventDefault();
    const formData = new FormData(form);
    idx += 1;
    
    const title = formData.get('title');
    const author = formData.get('author');
    const genre = formData.get('genre');
    const picture = formData.get('cover');
    const pageNum = formData.get('pagenum');
    myLibrary.push(new Book(title,author,genre,picture,pageNum,idx));

    modal.close();
    displayBook();
}

Book.prototype.getPicture = function(){
    return this.picture;
}

function displayBook(){
    const book = myLibrary[idx - 1];
    let genre = document.querySelector(`.${book.genre} .book`);

    const newDiv = document.createElement('div');
    const newImg = document.createElement('img');
    const newDiv2 = document.createElement('div');
    const Icon1 = document.createElement('img');
    const Icon2 = document.createElement('img');

    newDiv.setAttribute('style','min-height:95%;');
    
    newImg.setAttribute('src',`${book.getPicture()}`);
    newImg.setAttribute('alt',`${book.title}`);
    newImg.setAttribute('style','height:90%; width:100%');
    Icon1.setAttribute('src','../Images/icons/delete.svg');
    Icon1.setAttribute('id','delete');
    Icon2.setAttribute('src','../Images/icons/task2.svg');
    Icon2.setAttribute('id','check');
    newDiv2.setAttribute('style','padding:5px;');


    newDiv2.appendChild(Icon1);
    newDiv2.appendChild(Icon2);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newDiv2);
    genre.appendChild(newDiv);  
}

function addGlobalEventListeners(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e);
    });
}

function changeCheck(event){
    if (event.target.src == 'http://127.0.0.1:5500/Images/icons/task1.svg' || event.target.src == 'https://abnsol.github.io/Images/icons/task1.svg'){
        event.target.src = '../Images/icons/task2.svg';
    }else{
        event.target.src = '../Images/icons/task1.svg';
    }
}

function delBook(picURL){
    myLibrary = myLibrary.filter(book => book.picture != picURL);
}


addGlobalEventListeners('click','#addcircle img',() => {
    modal.showModal();
});

addGlobalEventListeners('submit','#form',addBookToLibrary);
addGlobalEventListeners('click','#check',changeCheck);
addGlobalEventListeners('click','#delete',(event) => {
    const grandparentDiv = event.target.closest('div').parentElement;
    delBook(grandparentDiv.children[0].src);
    grandparentDiv.remove();
});


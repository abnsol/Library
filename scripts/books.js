const myLibrary = [];
let idx = 0;

function Book(title,author,genre,picture){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.picture = picture;
}

function addBookToLibrary(){
    let title = prompt("Book Title:");
    let author = prompt("Author");
    let genre = prompt("Genre:");
    let picture = prompt("cover of the book(Enter url from internet)");

    myLibrary.push(new Book(title,author,genre,picture));
    console.log(myLibrary);
}

Book.prototype.getPicture = function(){
    return this.picture;
}

function displayBook(){
    console.log("been here");
    

    const book = myLibrary[idx];
    console.log(book.genre);
    let genre = document.querySelector(`.${book.genre} .book`);

    const newDiv = document.createElement('div');
    const newImg = document.createElement('img');

    newDiv.setAttribute('style','min-height:95%');
    
    newImg.setAttribute('src',`${book.getPicture()}`);
    newImg.setAttribute('alt',`${book.title}`);
    newImg.setAttribute('style','height:100%; width:100%');


    newDiv.appendChild(newImg);
    genre.appendChild(newDiv);  
    idx++;   
}

function addGlobalEventListeners(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e);
    });
}

addGlobalEventListeners('click','#addcircle img',() => {
    addBookToLibrary();
    displayBook();
});
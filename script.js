const btns = document.querySelectorAll('.btn');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');

console.log(theHobbit.info());


function addShadow() {
    btns.forEach(btn => {
        btn.onmousedown = () => {
            btn.classList.add('btn-inner-shadow');
            console.log('mouse down');
        };
        btn.onmouseup = () => {
            btn.classList.remove('btn-inner-shadow');
        };
    });
}

addShadow();
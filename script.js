const openPopUpBtn = document.querySelector('.add-book-btn');
const overlay = document.querySelector('.overlay');
const closePopUpBtn = document.querySelector('.close-window');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const check = document.getElementById('status');
const form = document.querySelector('form');
const grid = document.querySelector('.grid');

class Book {
    constructor(bookTitle, bookAuthor, bookPages, bookStatus) {
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookPages = bookPages;
        this.bookStatus = bookStatus;
    }

    info() {
        return `${this.bookTitle} by ${this.bookAuthor}, ${this.bookPages} pages, ${this.bookStatus}------------------`;
    }
}

const myLibrary = [];

function popUpWindow() {
    overlay.style.display = "flex";
}

function hidePopUpWindow() {
    overlay.style.display = 'none';
}

function checkStatus() {
    if(check.checked){
        return 'read';
    }
    return 'TBR';
}

function clearForm() {
    title.value = '';
    author.value = '';
    pages.value = '';
    check.checked = false;
}

function displayBook(array) {
    grid.textContent = '';
    for(let i = 0; i < array.length; i++) {
        grid.innerHTML += `
        <div class="book ${i}">
            <div class="name">${array[i].bookTitle}</div>
            <div class="author">${array[i].bookAuthor}</div>
            <div class="pages">${array[i].bookPages}</div>
            <div class="btn status" data-index=${i}>${array[i].bookStatus}</div>
            <div class="btn delete">delete</div>
        </div>`;

        const statusBtnBook = document.querySelectorAll('.status');

        statusBtnBook.forEach(stat => {
            if(array[stat.dataset.index].bookStatus === "TBR") {
                stat.classList.add('tbr');
            }
            
        });
    }
    
    const statusBtn = document.querySelectorAll('.status');
    
    statusBtn.forEach(stat => {
        function changeStatus() {
            stat.classList.toggle('tbr');
            if(stat.classList.contains('tbr')) {
                stat.textContent = 'TBR';
            } else {
                stat.textContent = 'read';
            }
        }
        stat.onclick = () => changeStatus();
    });


    const btns = document.querySelectorAll('.btn');

    function addShadow() {
        btns.forEach(btn => {
            btn.onmousedown = () => {
                btn.classList.add('btn-inner-shadow');
            };
            btn.onmouseup = () => {
                btn.classList.remove('btn-inner-shadow');
            };
        });
    };
    addShadow();
}

function addBookToLibrary() {
    const newBook = new Book(title.value, author.value, pages.value, checkStatus());
    myLibrary.push(newBook);

    console.log(newBook.info());
}

openPopUpBtn.onclick = () => popUpWindow();
closePopUpBtn.onclick = () => {
    hidePopUpWindow();
    clearForm();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    hidePopUpWindow();
    clearForm();
    displayBook(myLibrary);
});
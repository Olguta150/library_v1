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
        return true;
    }
    return false;
}

function clearForm() {
    title.value = '';
    author.value = '';
    pages.value = '';
    check.checked = false;
}

function addBookToLibrary() {
    const newBook = new Book(title.value, author.value, pages.value, checkStatus());
    myLibrary.push(newBook);
}

function bookDetails() {
    const totalBooks = document.querySelector('.total-books');
    const readBooks = document.querySelector('.read-books');
    const tbrBooks = document.querySelector('.tbr-books');
    const pagesRead = document.querySelector('.pages-read');

    let readCounter = 0;
    let tbrCounter = 0;
    let pagesCounter = 0;
    totalBooks.textContent = 0;
    readBooks.textContent = 0;
    tbrBooks.textContent = 0;
    pagesRead.textContent = 0;

    for(let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].bookStatus === true) {
            pagesCounter += parseInt(myLibrary[i].bookPages);
            readCounter += 1;
            pagesRead.textContent = pagesCounter;
            readBooks.textContent = readCounter;
        } else if(myLibrary[i].bookStatus === false) {
            tbrCounter += 1;
            tbrBooks.textContent = tbrCounter;
        }
        totalBooks.textContent = myLibrary.length;
    }
}
bookDetails();

function displayBook(array) {
    bookDetails();
    grid.textContent = '';
    for(let i = 0; i < array.length; i++) {
        grid.innerHTML += `
        <div class="book data-index=${i}">
            <div class="name">${array[i].bookTitle}</div>
            <div class="author">${array[i].bookAuthor}</div>
            <div class="pages">${array[i].bookPages}</div>
            <div class="btn status" data-index=${i}>${array[i].bookStatus}</div>
            <div class="btn delete" data-index=${i}>delete</div>
        </div>`;

        const statusBtnBook = document.querySelectorAll('.status');

        statusBtnBook.forEach(stat => {
            if(array[stat.dataset.index].bookStatus === false) {
                stat.classList.add('tbr');
                stat.textContent = 'TBR';
            } else {
                stat.textContent = 'read';
            }
            
        });
    }
    
    const statusBtn = document.querySelectorAll('.status');
    const deleteBtn = document.querySelectorAll('.delete');
    
    statusBtn.forEach(stat => {
        function changeStatus() {
            stat.classList.toggle('tbr');
            if(array[stat.dataset.index].bookStatus === false) {
                stat.textContent = 'read';
                array[stat.dataset.index].bookStatus = true;
            } else if(array[stat.dataset.index].bookStatus === true) {
                stat.textContent = 'TBR';
                array[stat.dataset.index].bookStatus = false;
            }
            bookDetails();
        }

        stat.onclick = () => changeStatus();
    });

    deleteBtn.forEach(btn => {
        function deleteBook(arr, index) {
            arr.splice(index, 1);
            displayBook(myLibrary);
        }

        btn.onclick = () => deleteBook(array, btn.dataset.index);
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
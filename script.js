// const btns = document.querySelectorAll('.btn');
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
        return `${this.bookTitle} by ${this.bookAuthor}, ${this.bookPages} pages, ${this.bookStatus}`;
    }
}

let myLibrary = [];

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
        <div class="book">
            <div class="name">${array[i].bookTitle}</div>
            <div class="author">${array[i].bookAuthor}</div>
            <div class="pages">${array[i].bookPages}</div>
            <div class="btn status">${array[i].bookStatus}</div>
            <div class="btn delete">delete</div>
        </div>`;

        const statusBtnBook = document.querySelector('.status');
        console.log("status btn: ", statusBtnBook);

        // statusBtnBook.forEach(stat => {
        //     if(array[i].bookStatus === "TBR") {
        //         console.log("array status: ", array[i].bookStatus === "TBR");
        //         stat.classList.add('tbr');
        //     } else {
        //         console.log(grid.innerHTML);
        //         stat.classList.add('read');
        //     }
        // });

        // if(array[i].bookStatus === "TBR") {
        //     console.log("array status: ", array[i].bookStatus !== "read");
        //     statusBtnBook.classList.add('tbr');
        //     console.log(grid.innerHTML);
        // } else if(array[i].bookStatus === "read"){
        //     statusBtnBook.classList.add('read');
        // }
        
        // statusBtnBook.forEach(stat => {
        //     if(array[i].bookStatus !== "read") {
        //         console.log("array status: ", array[i].bookStatus !== "read");
        //         stat.classList.add('tbr');
        //     } else {
        //         console.log(grid.innerHTML);
        //         stat.classList.remove('tbr');
        //     }
        // });

        // if(array[i].bookStatus !== "read") {
        //     console.log("array status: ", array[i].bookStatus !== "read");
        //     statusBtnBook.forEach(stat => {
        //         stat.classList.add('tbr');
        //     });
        //     console.log(grid.innerHTML);
        // } else {
        //     stat.classList.remove('tbr');
        // }
    }

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

// displayBook(myLibrary);

function createBook() {
    const newBook = new Book(title.value, author.value, pages.value, checkStatus());
    myLibrary.push(newBook);
    // displayBook(myLibrary);

    console.log(newBook.info());
    // console.log(myLibrary);
}

openPopUpBtn.onclick = () => popUpWindow();
closePopUpBtn.onclick = () => {
    hidePopUpWindow();
    clearForm();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    createBook();
    hidePopUpWindow();
    clearForm();
    displayBook(myLibrary);
});
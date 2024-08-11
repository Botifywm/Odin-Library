const tbody = document.querySelector('tbody');

// Show form
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const confrimBtn = dialog.querySelector("#confrimBtn")

// Form inputs
const ftitle = document.querySelector("#title");
const fauthor = document.querySelector("#author");
const fpages = document.querySelector("#pages");
const fstatus = document.querySelector("#status");

// Book Function and Prototype
function Book (title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} yet`
}

Book.prototype.toggleRead = function() {
    if (this.status === "Not read") {
        this.status = "Read";
    }
    else {
        this.status = "Not read";
    }
}

// Display library
const myLibrary = [];

let book1 = new Book('The hobbit', 'RKK', '295', 'Not read');
myLibrary.push(book1);

function displayLibrary() {
    // before looping, we want to empty the table body so it does not 
    // keep the rows from the previous execution of this function - which will
    // create duplicates
    const allrows = document.querySelectorAll('tbody tr');
    allrows.forEach((rows) => {
        rows.remove();
    });

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');
        const num = document.createElement('td');
        num.textContent = index;
        row.appendChild(num);

        // iterating over the object to make it dynamic instead of hardcoding
        Object.values(book).forEach((val, index) => {
            const content = document.createElement('td');
            content.textContent = val;
            // index is hardcoded here - have to find a way to let it identify the object keys in the future
            if (index === 3) {
                const btn = document.createElement('button');
                btn.textContent = "Change Status"
                btn.setAttribute('class', 'statusToggle')
                btn.addEventListener('click', () => {
                    book.toggleRead();
                    content.textContent = book.status;
                    content.append(btn);
                })
                content.append(btn);
            }

            row.appendChild(content);
        })
        // creating a remove button that is outside of the object
        const removeBook = document.createElement('td')
        const removeSvg = '<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>remove</title> <path d="M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.25 17.625l3.563 3.594c0.438 0.438 1.156 0.438 1.594 0 0.406-0.406 0.406-1.125 0-1.563l-3.563-3.594 3.563-3.594c0.406-0.438 0.406-1.156 0-1.563-0.438-0.438-1.156-0.438-1.594 0l-3.563 3.594-3.563-3.594c-0.438-0.438-1.156-0.438-1.594 0-0.406 0.406-0.406 1.125 0 1.563l3.563 3.594-3.563 3.594c-0.406 0.438-0.406 1.156 0 1.563 0.438 0.438 1.156 0.438 1.594 0z"></path> </g></svg>'
        removeBook.innerHTML = removeSvg;
        removeBook.addEventListener('click', () => {
            row.remove();
            const x = myLibrary.splice(index, 1);
            console.log(myLibrary)
        })
        row.appendChild(removeBook);
        tbody.appendChild(row);
    })
}

displayLibrary();

// Dialog form
showButton.addEventListener("click", () => {
    dialog.showModal();
  });

closeButton.addEventListener("click", () => {
  dialog.close();
});

confrimBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let book = new Book(ftitle.value, fauthor.value, fpages.value, fstatus.value);
    myLibrary.push(book);
    dialog.close();
    displayLibrary();
})
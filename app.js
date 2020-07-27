//Book Class: Rep a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI task
//JSON Placeholder data 🤔
//Static is so you don't instantiate
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: 'Book One',
    //     author: 'John Doe',
    //     isbn: '3434343',
    //   },
    //   {
    //     title: 'Book Two',
    //     author: 'Helen Keller',
    //     isbn: '45545',
    //   },
    // ];

    const books = Store.getBooks();

    const books = storedBooks;

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    //creating table row with table data for more responsiveness
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      //removing the tr element
      console.log(el.classList);
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

//Store Class: handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      //returns an array of objects...
      books = JSON.parse(localStorage.getItem(books));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    //serializes array of objects to string format
    localStorage.setItem('books', JSON.stringify());
  }
  static remove(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem(books, JSON.stringify(books));
  }
}

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //prevent default behavior
  e.preventDefault();

  //Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //validation
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    //instantiate book
    const book = new Book(title, author, isbn);
    console.log(book);

    //Add book to UI
    UI.addBookToList(book);

    //Add book store

    //success
    UI.showAlert('book added', 'success');

    //clear fields
    UI.clearFields();
  }
});

//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Remove a book
//event propagation with e.target select the parent of the target element
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  UI.showAlert('book deleted', 'success');
});

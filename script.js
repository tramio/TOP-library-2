let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const DOM = (() => {
  const renderLibrary = () => {
    myLibrary.forEach(bookObject => {
      renderBook(bookObject);
    });
  }
  const renderBook = (bookObject) => {
    const bookElement = createBook(bookObject);
    const libraryElement = document.getElementById("library");
    libraryElement.appendChild(bookElement);
  }
  const createBook = (book) => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.appendChild(createTitle(book));
    div.appendChild(createAuthor(book));
    div.appendChild(createPages(book));
    div.appendChild(createReadingStatus(book));
    return div;
  }
  const createTitle = (book) => {
    const element = document.createElement("h1");
    element.textContent = book.title;
    return element;
  }
  const createAuthor = (book) => {
    const element = document.createElement("h2");
    element.textContent = book.author;
    return element;
  }
  const createPages = (book) => {
    const element = document.createElement("p");
    element.textContent = book.pages;
    return element;
  }
  const createReadingStatus = (book) => {
    const element = document.createElement("p");
    let readingStatus;
    book.isRead ? readingStatus = "Read" : readingStatus = "Not read yet";
    element.textContent = readingStatus;
    return element;
  }
  return {
    renderLibrary,
  }
})();

function createSample() {
  const lotr = new Book("lotr", "tolkien", 418, true);
  const hp = new Book("hp", "jk rowling", 435, false);
  addBookToLibrary(lotr);
  addBookToLibrary(hp);
}

createSample();
DOM.renderLibrary();
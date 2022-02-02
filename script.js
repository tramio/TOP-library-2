function Book({title, author, pages, isRead}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const Library = (() => {
  const content = [];
  const addBook = (book) => {
    content.push(book);
  }
  return {
    content,
    addBook,
  }
})();

const DOM = (() => {
  const renderLibrary = () => {
    Library.content.forEach(bookObject => {
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
  const lotr = new Book({title: "lotr", author: "tolkien", pages: 418, isRead: true});
  Library.addBook(lotr);
}

createSample();
DOM.renderLibrary();

const Form = (() => {
  const form = document.getElementById("form-add-book");
  const display = () => {
    if (form.classList.contains("hidden")) {
      form.classList.toggle("hidden");
    }
  }
  const hide = () => {
    form.classList.add("hidden");
  }
  const getValueOf = (ElementID) => {
    return document.getElementById(ElementID).value;
  }
  const getInput = () => {
    const title = getValueOf("title-input");
    const author = getValueOf("author-input");
    const pages = getValueOf("pages-input");
    const isRead = getValueOf("is-read-input");
    return {
      title, author, pages, isRead
    }
  }
  const formInformation = document.getElementById("form-info");
  const sayThankYou = () => {
    formInformation.textContent = "Thank you for your submission!";
  }
  const clearInformation = () => {
    formInformation.textContent = "";
  }
  return {
    form,
    display,
    hide,
    getInput,
    sayThankYou,
    clearInformation,
  }
})();

const ButtonAddBook = (() => {
  const btn = document.getElementById("btn-add-book");
  const enable = () => {
    btn.addEventListener("click", () => {
      Form.display();
      disable();
    });
  };
  const disable = () => {
    btn.disabled = true;
  };
  return {
    enable,
  }
})();

const ButtonSubmitForm = (() => {
  const btn = document.getElementById("btn-submit-form");
  const enable = () => {
    btn.addEventListener("click", () => {
      const newBook = new Book(Form.getInput());
      Library.addBook(newBook);
      Form.form.reset();
      Form.sayThankYou();
      setTimeout(Form.clearInformation, 1000);
    });
  }
  return {
    enable,
  }
})();

ButtonAddBook.enable();
ButtonSubmitForm.enable();
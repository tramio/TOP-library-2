let bookCounter = 0;
let myValue = 0;

function Book({title, author, pages, isRead}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.dataValue = bookCounter;
}

const Library = (() => {
  const content = [];
  const addBook = (book) => {
    content.push(book);
  }
  const getLastBook = () => {
    return content[content.length-1];
  }
  const deleteBook = (index) => {
    content.splice(index, 1);
  }
  const getIndexOfBookWithMyValue = () => {
    return content.findIndex(hasMyValue);
  }
  const hasMyValue = (book) => {
    return book.dataValue == myValue;
  }
  return {
    content,
    addBook,
    getLastBook,
    deleteBook,
    getIndexOfBookWithMyValue,
  }
})();

const DOM = (() => {
  const libraryElement = document.getElementById("library");
  const renderBook = (bookObject) => {
    const bookElement = createBook(bookObject);
    libraryElement.appendChild(bookElement);
  }
  const renderLastBook = () => {
    renderBook(Library.getLastBook());
  }
  const createBook = (book) => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.appendChild(createTitle(book));
    div.appendChild(createAuthor(book));
    div.appendChild(createPages(book));
    div.appendChild(createReadingStatus(book));
    div.appendChild(createDeleteButton(book));
    div.appendChild(createEditReadingStatusButton(book));
    div.setAttribute("data-value", book.dataValue);
    return div;
  }
  const deleteBookElement = (dataValue) => {
    let mySelector = `[data-value="${dataValue}"]`
    const bookElement = document.querySelector(mySelector);
    libraryElement.removeChild(bookElement);
  }
  const createDeleteButton = (book) => {
    const element = document.createElement("span");
    element.setAttribute("data-value", book.dataValue);
    element.classList.add("material-icons");
    element.textContent = "delete";

    element.addEventListener("click", (value) => {
      let index = Library.getIndexOfBookWithMyValue();
      myValue = element.dataset.value;
      Library.deleteBook(index);
      deleteBookElement(myValue);
    })

    return element;
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
  let readingStatus;
  const createReadingStatus = (book) => {
    const element = document.createElement("p");
    element.setAttribute("id", `reading-status-${book.dataValue}`)
    setReadingStatus(book);
    element.textContent = readingStatus;
    return element;
  }
  const setReadingStatus = (book) => {
    book.isRead == "true" ? setReadingStatusAsRead() : setReadingStatusAsNotRead();
  }
  const setReadingStatusAsRead = () => {
    readingStatus = "Read";
  }
  const setReadingStatusAsNotRead = () => {
    readingStatus = "Not read yet";
  }
  const createEditReadingStatusButton = (book) => {
    const element = document.createElement("span");
    function setIcon() {
      if (book.isRead == "true" || book.isRead == true) {
        element.textContent = "check_circle";
      } else {
        element.textContent = "unpublished";
      }
    }
    element.setAttribute("data-value", book.dataValue);
    element.classList.add("material-icons");
    setIcon();
    element.addEventListener("click", () => {
      const index = Library.getIndexOfBookWithMyValue();
      const status = document.getElementById(`reading-status-${book.dataValue}`);
      if (Library.content[index].isRead == "true" || Library.content[index].isRead == true) {
        Library.content[index].isRead = false;
        status.textContent = "Not read yet";
      } else {
        Library.content[index].isRead = true;
        status.textContent = "Read";
      }
      setIcon();
    });
    return element;
  }
  return {
    renderLastBook,
  }
})();

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
      DOM.renderLastBook();
      bookCounter++;
    });
  }
  return {
    enable,
  }
})();

ButtonAddBook.enable();
ButtonSubmitForm.enable();
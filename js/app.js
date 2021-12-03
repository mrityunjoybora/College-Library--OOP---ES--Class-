console.log("This is college library app");

// Todos
// 1. Store all the data to localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view


// constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// display constructor
function Display() {}

// add methods to display prototype
let tableBody;
Display.prototype.add = function (book) {
  console.log("Addding to UI");
  tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                  </tr>`;
  tableBody.innerHTML += uiString;
};

// implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// implemment the validate function
Display.prototype.validate = function (book) {
  if (book.name.length > 2 || book.author.length > 2) {
    return true;
  } else {
    return false;
  }
};

// implemment the show function
Display.prototype.show = function (type, displayMessage) {
  let boldText
  if(type=="success"){
    boldText="Success!";
  }
  else{
    boldText="Error!";
  }
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${boldText}</strong>  ${displayMessage}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

  setTimeout(function () {
    message.innerHTML = ``;
  }, 5000);
};

// add submit event listener to from
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("You have submitted Libbrary Form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("authorName").value;

  let chemistry = document.getElementById("chemistry");
  let physics = document.getElementById("physics");
  let programming = document.getElementById("programming");

  let type;
  if (chemistry.checked) {
    type = chemistry.value;
  } else if (physics.checked) {
    type = physics.value;
  } else if (programming.checked) {
    type = programming.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();

    display.show("success", "Your book has been succesfully added.");
  } else {
    // show error to the user

    display.show("danger", "Sorry, you cannot add this book.");
  }

  e.preventDefault();
}

const form = document.querySelector(".container");
const containerNotes = document.querySelector(".notes");
const textInput = document.querySelector(".textInput");
const btn1 = document.querySelector(".btn1");
const title = document.querySelector(".title");
const notesDrop = document.querySelector(".note");


btn1.addEventListener("click", (e) => {
  if (textInput.value == "") {
    return alert("Please add note");
  }

  let notes = localStorage.getItem("notes2");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: title.value,
    text: textInput.value,
  };

  notesObj.push(myObj);
  localStorage.setItem("notes2", JSON.stringify(notesObj));
  textInput.value = "";

  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes2");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <li class="note">
              <p class="note-title">${element.title}</p>
              <p class="note-text">${element.text}</p>
              <div class="flex-button">
                  <button id="${index}" onclick="editNote(this.id)" class="trash">
                    <img src="./img/pencil.png" alt="">
                  </button>
                 <button id="${index}" onclick="deleteNote(this.id)" class="trash">
                    <img src="./img/trash.png" alt="">
                  </button>
              </div>
            
        </li>

      `;
  });

  let noteElm = document.querySelector(".notes2");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "No notes yet";
  }
}

function deleteNote(index) {
  let confirmDel = confirm("Are you sure?");

  if (confirmDel == true) {
    let notes = localStorage.getItem("notes2");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);

    localStorage.setItem("notes2", JSON.stringify(notesObj));
    showNotes();
  }
}

function editNote(index){
  let notes = localStorage.getItem('notes2');
  let addTitle = document.querySelector(".note-title");
  let addText = document.querySelector(".note-text");

  if(addTitle.value !== "" || addText.value !== ""){
    return alert("Please clear the form");
  }
      if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
      console.log(notesObj);

      notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addText.value = element.text;
      });
      notesObj.splice(index, 1);
      localStorage.setItem("notes2", JSON.stringify(notesObj));
      showNotes();
}


showNotes();

const notesContainer = document.querySelector(".notes-box");
const createBtn = document.querySelector(".notes-button");
let notes = document.querySelectorAll(".notes")

// Notes storing in  the localstorage
function notesStoring (){
  notesContainer.innerHTML = "";

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach ((noteText) => {
    createNote(noteText);
    
  });
}
// creation of notesbox and delete the box.
function createNote( text =" "){
  let noteWarper = document.createElement("div");    
    noteWarper.className ="note-warper";

    let inputBox = document.createElement("p");    
    inputBox.className ="notes";
    inputBox.setAttribute("contenteditable","true");
    inputBox.innerHTML = text;

    inputBox.addEventListener("keyup",() =>{
      saveNotes()
    });

    let dlt =document.createElement("BUTTON");
    let dlttext = document.createTextNode("delete");
    dlt.appendChild(dlttext);
    dlt.className ="delete";
     
    dlt.addEventListener("click",() =>{
        
        noteWarper.remove(); 
        saveNotes();    
       
     })

     noteWarper.appendChild(inputBox)
     noteWarper.appendChild(dlt)

    notesContainer.appendChild(noteWarper);
    
  

}

// note saving

function saveNotes() {
  let notes = [];
  document.querySelectorAll(".notes").forEach(note =>{
    notes.push(note.innerHTML);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

createBtn.addEventListener("click",() =>{
  createNote()
});

notesStoring();


    
    
    
    
    



    










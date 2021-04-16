console.log('This is my notes taking application');
showNotes()

// Function to set alert
function setAlert (type, heading, message) {
    let alert = document.getElementById('alert')

    let html = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${heading}!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

    alert.innerHTML = html;
    setInterval(() => {
        alert.innerHTML = '';
    }, 5000);
}


const submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener('click', addNotes);

// Function to add notes
function addNotes (e) {
    const addTitle = document.getElementById('addTitle');
    const addDesc = document.getElementById('addDesc');
    const notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        desc: addDesc.value
    }

    if(addTitle.value == '' || addDesc.value == '') {
        setAlert('danger', 'Warning', 'Please, enter a valid note');
    }
    else {
        notesObj.push(myObj);
        addTitle.value = '';
        addDesc.value = '';

        setAlert('success', 'Success', 'Your note has been successfully submitted')
    }

    localStorage.setItem('notes', JSON.stringify(notesObj));
    console.log(notesObj);
    showNotes()
}


// Function to display notes in the notes section
function showNotes () {
    const addTitle = document.getElementById('addTitle');
    const addDesc = document.getElementById('addDesc');
    const notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach((element, index) => {
        html += `<div class="notes" id="${index}">
                    <h3>${element.title}</h3>
                    <p>${element.desc}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="notesbtn">Delete</button>
                </div>`
    });

    let output = document.getElementById('output');

    if(notesObj != 0) {
        output.innerHTML = html;
    }
    else {
        output.innerHTML = `<h5>Nothing to show! Use "Add a Note" section above to add notes</h5>`
    }
}


// Function to Delete a Note
function deleteNote(index) {
    // console.log("I am deleting the note", index);

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = []; // Setting notesObj as null
    }
    else {
        notesObj = JSON.parse(notes); // Parsing notes into notesObj
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj)); // Setting the item in notesObj
    showNotes();

    setAlert('success', 'Success', 'Your note has been successfully deleted')
}
// import marked from 'marked';
const renderer = new marked.Renderer();
renderer.checkbox = function(checked) {
  return `<input type="checkbox" ${checked ? 'checked' : ''} disabled>`;
}

marked.use({ renderer });

var zIndexCounter = (localStorage.getItem('zIndexCounter')) ? localStorage.getItem('zIndexCounter') : 0;
localStorage.setItem('zIndexCounter', zIndexCounter);

// Create a sticky note when you click on the sticky note icon
noteIcon.addEventListener('click', loadStickyNote);

// Load existing sticky notes when page is opened
document.addEventListener("DOMContentLoaded", () => {

    var existingNotes = JSON.parse(localStorage.getItem('notesList')) || {};
    for (let noteID in existingNotes) {
        var note = existingNotes[noteID];
        let loadedNote = loadStickyNote(noteID, note.text, note.coords, note.size);
        // loadedNote.innerHTML = md.render(note.text);
        loadedNote.innerHTML = marked.parse(note.text);
        // loadedNote.querySelector('textarea').style.display = "none";
        if (!(loadedNote.querySelector('textarea'))) {
            var textArea = document.createElement("textarea");
            textArea.value = note.text;
            loadedNote.appendChild(textArea);
        }
        addMarkdown(loadedNote, textArea);
        addPin(loadedNote);
        loadedNote.querySelector('textarea').style.display = "none";
    }
})

function createNote(noteID, text, coords, size) {
    var textArea = document.createElement("textarea");

    const note = document.createElement("div");
    note.className = "sticky";
    var xCord = Math.random() * (window.innerWidth - 500);
    var yCord = Math.random() * (window.innerHeight - 500);
    note.style.left = xCord + "px";
    note.style.top = yCord + "px";
    note.style.zIndex = zIndexCounter++;
    if (noteID)
        note.dataset.noteID = noteID;
    else
        note.dataset.noteID = (localStorage.getItem('notesList') == null) ? ((1 ^ Date.now()) % 999) : ((localStorage.getItem('notesList').length ^ Date.now()) % 999);

    if (size) {
        note.style.width = size[0] + "px";
        note.style.height = size[1] + "px";
    }

    if (coords) {
        note.style.left = coords[0] + "px";
        note.style.top = coords[1] + "px";
    }

    if (text)
        textArea.value = text;

    note.appendChild(textArea);

    return note;
}

function addPin(note) {
    var pin = document.createElement("img");
    pin.src = "../assets/pin.png";
    pin.dataset.isPin = "1";
    pin.dataset.noteID = note.dataset.noteID;

    pin.addEventListener('dragend', () => {
        const notesList = JSON.parse(localStorage.getItem('notesList'));

        if (notesList[pin.dataset.noteID])
            delete notesList[pin.dataset.noteID];
        else
            console.log("Error fetching and deleting Note " + pin.dataset.noteID)

        localStorage.setItem('notesList', JSON.stringify(notesList))
        note.classList.add("stickyDel");
        // note.style.opacity = 0;
        // note.style.display = "none";
    });

    note.appendChild(pin);
}

function addDragAndResize(note) {
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY;
    let startX, startY;
    let initialWidth, initialHeight;

    note.addEventListener("mousedown", (e) => {
        if (e.button === 0) { // Left mouse button
            isDragging = true;
            offsetX = e.clientX - note.getBoundingClientRect().left;
            offsetY = e.clientY - note.getBoundingClientRect().top;
        } else if (e.button === 2) { // Right mouse button
            isResizing = true;
            initialWidth = note.clientWidth;
            initialHeight = note.clientHeight;
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            note.style.left = e.clientX - offsetX + "px";
            note.style.top = e.clientY - offsetY + "px";

            // update local storage
            const notesList = JSON.parse(localStorage.getItem('notesList')) || {};
            notesList[note.dataset.noteID].coords = [parseInt(note.style.left), parseInt(note.style.top)];
            localStorage.setItem('notesList', JSON.stringify(notesList));
        }
        if (isResizing) {
            const newWidth = initialWidth + (e.clientX - startX);
            const newHeight = initialHeight + (e.clientY - startY);
            note.style.width = newWidth + "px";
            note.style.height = newHeight + "px";

            // update local storage
            const notesList = JSON.parse(localStorage.getItem('notesList')) || {};
            notesList[note.dataset.noteID].size = [parseInt(note.style.width), parseInt(note.style.height)];
            localStorage.setItem('notesList', JSON.stringify(notesList));

        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
    });
}

function addMarkdown(note, textArea) {
    // Handle Markdown rendering when the textarea loses focus
    textArea.addEventListener("blur", () => {
        const markdownText = textArea.value;
        // note.innerHTML = md.render(markdownText);
        note.innerHTML = marked.parse(markdownText);
        note.appendChild(textArea);
        addPin(note);
        textArea.style.display = "none";

        // update local storage
        const notesList = JSON.parse(localStorage.getItem('notesList')) || {};
        notesList[note.dataset.noteID].text = textArea.value
        localStorage.setItem('notesList', JSON.stringify(notesList));
    });

    note.addEventListener("dblclick", () => {
        textArea.style.display = "block";
        textArea.focus();
    });
}

function loadStickyNote(noteID, text, coords, size) {
    var note;
    var textArea;
    if (noteID && text && coords && size) {
        note = createNote(noteID, text, coords, size);
    }
    else
        note = createNote();
    textArea = note.querySelector('textarea');
    addDragAndResize(note);

    addMarkdown(note, textArea);



    var noteObj = {
        ID: note.dataset.noteID,
        text: textArea.value,
        coords: [parseInt(note.style.left), parseInt(note.style.top)],
        size: [parseInt(note.style.width), parseInt(note.style.height)]
    };

    // Get the existing notes from local storage or initialize an empty array
    var existingNotes = JSON.parse(localStorage.getItem('notesList')) || {};

    // Add the new note to the array
    existingNotes[note.dataset.noteID] = noteObj;

    // Store the updated notes list in local storage
    localStorage.setItem('notesList', JSON.stringify(existingNotes));
    document.body.appendChild(note);
    return note;
}

document.addEventListener('contextmenu', event => event.preventDefault());
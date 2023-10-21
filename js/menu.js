var menuOn = false;
toggleBar('0em');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menuOn = !menuOn;
    if (menuOn)
        toggleBar('1.5em');
    else
        toggleBar('0em');
});

noteIcon.addEventListener('click', createStickyNote);

function toggleBar(size) {
    pomodoroIcon.style.width = noteIcon.style.width = clockIcon.style.width = timeBar.style.height = size;
}

document.addEventListener("DOMContentLoaded", () => {
    var existingNotes = JSON.parse(localStorage.getItem('notesList')) || {};
    for (let noteID in existingNotes) {
        var note = existingNotes[noteID];
        loadStickyNote(noteID, note.text, note.coords)
    }
})

function loadStickyNote(noteID, text, coords) {
    // Create a new sticky note element
    const stickyNote = document.createElement('div');
    stickyNote.classList.add('stickynote');
    makeRightDraggable(stickyNote);
    makeEditable(stickyNote);

    const span = document.createElement('span');
    span.textContent = text;
    stickyNote.appendChild(span);

    // Set the coordinates for the sticky note
    // stickyNote.style.left = coords[0] + 'px';
    // stickyNote.style.top = coords[1] + 'px';

    const maxWidth = document.documentElement.clientWidth - 160;
    const maxHeight = document.documentElement.clientHeight - 160;

    // Ensure the sticky note stays within the viewport bounds
    stickyNote.style.left = Math.min(coords[0], maxWidth) + 'px';
    stickyNote.style.top = Math.min(coords[1], maxHeight) + 'px';

    // Add the ID as a data attribute to the sticky note
    stickyNote.dataset.noteId = noteID;

    // Append the sticky note to the document
    document.body.appendChild(stickyNote);
}


function createStickyNote() {
    const x = 100; // Adjust the initial position as needed
    const y = 100; // Adjust the initial position as needed

    const stickyNote = document.createElement('div'); // Use a div for content editable
    stickyNote.classList.add('stickynote');
    makeRightDraggable(stickyNote);
    makeEditable(stickyNote);

    const span = document.createElement('span');
    span.textContent = 'This is a sticky note!';
    stickyNote.appendChild(span);

    const maxWidth = document.documentElement.clientWidth - 160;
    const maxHeight = document.documentElement.clientHeight - 160;

    // Ensure the sticky note stays within the viewport bounds
    stickyNote.style.left = Math.min(x, maxWidth) + 'px';
    stickyNote.style.top = Math.min(y, maxHeight) + 'px';

    // Define the note object
    newNoteID = (localStorage.getItem('notesList') == null) ? ((1 ^ Date.now()) % 94) : ((localStorage.getItem('notesList').length ^ Date.now()) % 94);

    var note = {
        ID: newNoteID,
        text: span.textContent,
        coords: [x, y]
    };

    // Get the existing notes from local storage or initialize an empty array
    var existingNotes = JSON.parse(localStorage.getItem('notesList')) || {};

    // Add the new note to the array
    existingNotes[newNoteID] = note;

    // Store the updated notes list in local storage
    localStorage.setItem('notesList', JSON.stringify(existingNotes));

    stickyNote.dataset.noteId = newNoteID;
    document.body.appendChild(stickyNote);
    
}

function makeRightDraggable(element) {
    let isDragging = false;

    element.addEventListener('mousedown', (e) => {
        noteID = element.dataset.noteId;
        if (e.button === 2) { // Right-click button is clicked
            isDragging = true;
            const offsetX = e.clientX - element.getBoundingClientRect().left;
            const offsetY = e.clientY - element.getBoundingClientRect().top;

            // Prevent text selection during drag
            element.style.userSelect = 'none';

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(e) {
                if (isDragging) {
                    element.style.left = e.clientX - offsetX + 'px';
                    element.style.top = e.clientY - offsetY + 'px';
                }
            }

            function onMouseUp() {
                isDragging = false;

                // Re-enable text selection after dragging
                element.style.userSelect = 'auto';
                
                // Update element x, y
                var existingNotes = JSON.parse(localStorage.getItem('notesList')) || {};
                existingNotes[noteID].coords = [parseInt(element.style.left), parseInt(element.style.top)]
                localStorage.setItem('notesList', JSON.stringify(existingNotes));
            
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        }
    });
}

function makeEditable(element) {
    let isEditing = false;

    element.addEventListener('dblclick', () => {
        element.contentEditable = 'true';
        element.focus();
        isEditing = true;
    });

    element.addEventListener('blur', () => {
        if (isEditing) {
            element.contentEditable = 'false';
            isEditing = false;

            // update text
            var existingNotes = JSON.parse(localStorage.getItem('notesList')) || {};
            existingNotes[noteID].text = element.textContent;
            localStorage.setItem('notesList', JSON.stringify(existingNotes));
            console.log('Updated text content for ${noteID}}')
        }
    });

    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            element.contentEditable = 'false';
            event.preventDefault();
        }
    });
}

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

    document.body.appendChild(stickyNote);
}

function makeRightDraggable(element) {
    let isDragging = false;

    element.addEventListener('mousedown', (e) => {
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
        }
    });

    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            element.contentEditable = 'false';
            event.preventDefault();
        }
    });
}

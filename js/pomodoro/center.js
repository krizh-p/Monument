var showSeconds = false;
var hoverShowSeconds = false;
const sessionInputMinute = document.getElementById("sessionInputMinute")
const sessionInputSecond = document.getElementById("sessionInputSecond")

sessionInputMinute.addEventListener('input', function () {
    if (this.value.length === parseInt(this.getAttribute('maxlength'), 10)) {
        sessionInputSecond.focus();
    }
});

sessionInputSecond.addEventListener('input', function () {
    if (this.value.length === parseInt(this.getAttribute('maxlength'), 10)) {
        breakInputMinute.focus();
    }
});

breakInputMinute.addEventListener('input', function () {
    if (this.value.length === parseInt(this.getAttribute('maxlength'), 10)) {
        breakInputSecond.focus();
    }
});
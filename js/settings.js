/**
 * Make the settings icon have a dropdown menu upon load
 */
document.addEventListener('DOMContentLoaded', function () {
    var dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
    dropdownSubmenus.forEach(function (submenu) {
        submenu.addEventListener('click', function (e) {
            e.stopPropagation();
            // Check if the clicked element is an <input>
            if (e.target.tagName.toLowerCase() !== 'input') {
                var nextEl = submenu.querySelector('.dropdown-menu');
                if (nextEl) {
                    nextEl.classList.toggle('show');
                }
            }
        });
    });
});
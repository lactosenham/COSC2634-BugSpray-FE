document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
        var mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('show');
    });
});
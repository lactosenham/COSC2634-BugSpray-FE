// Hamburger navbar function
const mobileMenu = document.querySelector("#navBarButton");
const mobileMenuContainer = document.querySelector("#mobile-menu-2");
mobileMenu.addEventListener("click", () => {
    mobileMenuContainer.classList.toggle("hidden");
});

// Search bar function
document.addEventListener('DOMContentLoaded', (event) => {
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const form = document.querySelector('form');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        // display search bar with animation
        if (searchBar.classList.contains('hidden')) {
            searchBar.classList.remove('hidden');
            searchBar.classList.remove('opacity-0');
            searchBar.classList.add('opacity-100');
        } else {
            // hide search bar with animation
            searchBar.classList.remove('opacity-100');
            searchBar.classList.add('opacity-0');
            setTimeout(() => searchBar.classList.add('hidden'), 300);
        }
    });

    closeSearchBtn.addEventListener('click', () => {
        searchBar.classList.remove('opacity-100');
        searchBar.classList.add('opacity-0');
        setTimeout(() => searchBar.classList.add('hidden'), 300);
    });

    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     const query = searchInput.value;
    //     const data = { searchQuery: query };
    //     console.log(JSON.stringify(data));
    // });
});
// Global variable to store the popup callback function
var popupCallback = null;

function showPopup(title, message, callback) {
    var modal = document.getElementById('myPopup');
    
    // Set the title and message of the modal
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popBody').innerText = message;

    // Conditionally apply the loading variant class
    if (title === 'Loading...') {
        modal.classList.add('popup-loading');
    } else {
        modal.classList.remove('popup-loading');
    }

    // Display the modal
    document.getElementById('myPopup').style.display = 'block';

    // Store the callback function
    popupCallback = callback;

    // Set a timeout to automatically close the popup after 5 seconds
    setTimeout(function() {
        // Check if the modal is still displayed before closing
        if (document.getElementById('myPopup').style.display === 'block') {
            closePopup();
        }
    }, 3000); // 5000 milliseconds = 5 seconds
}

function closePopup() {
    var modal = document.getElementById('myPopup');
    modal.style.display = "none";
    if (popupCallback) {
        popupCallback();
        popupCallback = null; // Reset the callback after execution
    }
}

// Close modal script
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    closePopup();
}

window.onclick = function(event) {
    var modal = document.getElementById('myPopup');
    if (event.target == modal) {
        closePopup();
    }
}



// Global variable to store the popup callback function
var popupCallback = null;

function showPopup(title, message, callback) {
    // Set the title and message of the modal
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popBody').innerText = message;

    // Display the modal
    document.getElementById('myPopup').style.display = 'block';

    // Store the callback function
    popupCallback = callback;
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



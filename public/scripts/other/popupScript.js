// modal.js
function showPopup(title, message) {
    // Set the title and message of the modal
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popBody').innerText = message;

    // Display the modal
    document.getElementById('myPopup').style.display = 'block';
}

// Close modal script
var modal = document.getElementById('myPopup');
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

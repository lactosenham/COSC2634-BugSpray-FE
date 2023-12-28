function closeModal(modalId) {
    var modal = document.querySelector(`[data-modal-toggle="${modalId}"]`);
    if (modal) {
        modal.click();
    }
}

function extractIdFromUrl() {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.length - 1];
}
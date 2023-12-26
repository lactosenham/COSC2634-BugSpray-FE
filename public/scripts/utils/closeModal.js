function closeModal(modalId) {
    var modal = document.querySelector(`[data-modal-toggle="${modalId}"]`);
    if (modal) {
        modal.click();
    }
}
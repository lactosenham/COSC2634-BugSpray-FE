// Get the role select element and vendor info input fields
const roleSelect = document.querySelector('#role');
const roleInfos = {
    'Developer': document.querySelectorAll('.developer-info'),
};

// Listen for changes on the role select element
roleSelect.addEventListener('change', function () {
    // hide all role-specific fields
    document.querySelectorAll('.role-info').forEach(info => info.style.display = 'none');
    // show the selected role's fields
    if (this.value in roleInfos) {
        roleInfos[this.value].forEach(info => info.style.display = 'block');
    }
});

var isInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    isInitialized = true;

    initializeRoleFields();
    setupRegistrationForm();
});

function initializeRoleFields() {
    const roleSelect = document.querySelector('#role');
    const roleInfos = {
        'Developer': document.querySelectorAll('.developer-info'),
    };

    function updateRoleFields() {
        hideAllRoleSpecificFields();
        showSelectedRoleFields(roleSelect.value, roleInfos);
    }

    updateRoleFields();
    roleSelect.addEventListener('change', updateRoleFields);
}

function hideAllRoleSpecificFields() {
    document.querySelectorAll('.role-info').forEach(info => info.style.display = 'none');
    document.querySelectorAll('.role-info select').forEach(select => select.removeAttribute('required'));
}

function showSelectedRoleFields(selectedRole, roleInfos) {
    if (selectedRole in roleInfos) {
        roleInfos[selectedRole].forEach(info => {
            info.style.display = 'block';
            if (info.tagName === 'SELECT') {
                info.setAttribute('required', '');
            }
        });
    }
}

function setupRegistrationForm() {
    const form = document.getElementById('registerForm');
    const roleSelect = document.querySelector('#role');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitRegistrationForm(form, roleSelect);
    });
}

async function submitRegistrationForm(form, roleSelect) {
    const formData = extractFormData(form, roleSelect);

    try {
        const response = await axios.post('/api/auth/register', formData);
        handleRegistrationSuccess(response);
    } catch (error) {
        handleRegistrationError(error);
    }
}

function extractFormData(form, roleSelect) {
    const username = form.querySelector('#username').value;
    const password = form.querySelector('#password').value;
    const name = form.querySelector('#name').value;
    const role = roleSelect.value;
    let developerType = role === "Developer" ? form.querySelector('#developerType').value : null;

    return {
        username: username,
        password: password,
        name: name,
        role: role,
        developerType: developerType
    };
}

function handleRegistrationSuccess(response) {
    console.log(response);
    isInitialized = false;
    showPopup('Register', 'User ' + response.data.username + ' registered', () => {
        window.location.href = '/login';
    });
}

function handleRegistrationError(error) {
    showPopup('Register Error', error.response.data, () => {});
}


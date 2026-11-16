let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

window.onload = function() {
    if (currentUser) {
        showMainApp();
    }
};

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    currentUser = { name: "Utilisateur Pro", email: email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showMainApp();
}

function showMainApp() {
    document.getElementById('auth-screen').classList.add('hidden-section');
    document.getElementById('main-screen').classList.remove('hidden-section');
    document.getElementById('current-username').innerText = currentUser.name;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('main-screen').classList.add('hidden-section');
    document.getElementById('auth-screen').classList.remove('hidden-section');
}

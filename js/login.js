let users = JSON.parse(localStorage.getItem("users"))
let checkuser = document.querySelector('.checkuser');
let valid = document.querySelector('.valid');
btn_login = document.querySelector('.btn-login');
btn_login.addEventListener('click', function (e) {
    e.preventDefault();
    let username = document.querySelector('.username').value;
    let password = document.querySelector('.password').value;
    let check
    for (let i = 0; i < users.length; i++) {
        check = 0;
        if (username === users[i].username && password === users[i].password) {
            window.location.href = "index.html";
            let account = users[i];
            localStorage.setItem("account", JSON.stringify(account));
        } else if (username == "" || password == "") {
            check = 1
        } else {
            check = 2;
        }
    }
    if (check == 1) {
        valid.style.display = 'block'
        checkuser.style.display = 'none'
    } else if (check == 2) {
        checkuser.style.display = 'block'
        valid.style.display = 'none'
    }
});
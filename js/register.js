let btn_register = document.querySelector('.btn-register');
let checkuser = document.querySelector('.checkuser')
let checkpassword = document.querySelector('.checkpassword');
let checknumber = document.querySelector('.checknumber');
let checkemail = document.querySelector('.checkemail');
let valid = document.querySelector('.valid');
btn_register.addEventListener('click', function (e) {
    e.preventDefault();
    let username = document.querySelector('.username').value;
    let password = document.querySelector('.password').value;
    let re_password = document.querySelector('.re-password').value;
    let birthday = document.querySelector('.birthday').value;
    let phonenumber = document.querySelector('.phonenumber').value;
    let email = document.querySelector('.email').value;
    let user = {
        username: username,
        password: password,
        re_password: re_password,
        birthday: birthday,
        phonenumber: phonenumber,
        email: email,
    };
    let users = [];
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
    } else {
        localStorage.setItem("users", JSON.stringify(users));
    }
    users.push(user);
    checkvalid(username, password, re_password, birthday, phonenumber, email);
    checkUser(username);
    checkPassword(password, re_password);
    checkEmail(email)
    checkNumber(phonenumber)
    if (checkvalid(username, password, re_password, birthday, phonenumber, email)
        && checkUser(username) && checkPassword(password, re_password) && checkEmail(email)
        && checkNumber(phonenumber)) {
        localStorage.setItem("users", JSON.stringify(users));
        alert("Yes!!! Thượng đế đã đăng ký tài khoản thành công");
        window.location.href = "login.html";
    }

    // localStorage.setItem("users", JSON.stringify(users));
    // alert("Yes!!! Thượng đế đã đăng ký tài khoản thành công");
    // window.location.href = "login.html";
});
function checkvalid(username, password, re_password, birthday, phonenumber, email) {
    let check = true;
    if (username == "" || password == "" || re_password == "" || birthday == "" || phonenumber == "" || email == "") {
        valid.style.display = 'block';
        check = false;
    } else {
        valid.style.display = 'none';
        check = true;
    }
    return check;
}
function checkUser(user) {
    let check = true;
    checkuser.style.display = 'none';
    let account = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < account.length; i++) {
        if (account[i].username === user) {
            checkuser.style.display = 'block';
            check = false;
        }
    }
    return check;
}
function checkPassword(password, re_password) {
    let check = true;
    checkpassword.style.display = 'none';
    if (password !== re_password) {
        checkpassword.style.display = 'block';
        check = false;
    }
    else {
        checkpassword.style.display = 'none';
        check = true;
    }
    return check;
}
function checkEmail(mail) {
    let check = true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        checkemail.style.display = 'none';
        check = true;
    } else {
        checkemail.style.display = 'block';
        check = false;
    }
    return check;
}
function checkNumber(number) {
    let check = true;
    if (isNaN(number)) {
        checknumber.style.display = 'block';
        check = false;
    } else {
        checknumber.style.display = 'none';
        check = true;
    }
    return check;
}


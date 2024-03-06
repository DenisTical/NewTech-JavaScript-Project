// First Section - Data from Register HTML //


//Data from Register HTML
let email = document.querySelector('#register-email');
let username = document.querySelector('#register-username');
let password = document.querySelector('#register-password');
let fname = document.querySelector('#register-fname');
let lname = document.querySelector('#register-lname');
let age = document.querySelector('#register-age');
let regbtn = document.querySelector('#register-button');
let logbtn = document.querySelector('#login-button');
let arr1 = JSON.parse(localStorage.getItem("users")) || [];


// Second Section - Functions and Buttons for Register HTML //


function Register(email, username, password, fname, lname, age){
    this.email = email;
    this.username = username;
    this.password = password;
    this.fname = fname;
    this.lname = lname;
    this.age = age;
};

regbtn.addEventListener('click', function register(event){
    event.preventDefault();

    if(!email.value.includes("@") || !email.value.includes(".")){
        alert("Email must contain `@` and `.` characters!");
        return;
    };
    if(username.value.length <= 6){
        alert('Username is too short!');
        return;
    };
    if(password.value.length <= 6){
        alert('Password is too short!');
        return;
    };
    if(fname.value.length <= 2){
        alert('First Name is too short!');
        return;
    };
    if(lname.value.length <= 2){
        alert('Last Name is too short!');
        return;
    };
    if(!(age.value >= 18 && age.value <= 65)){
        alert('Your age must be between 18 and 65');
        return;
    };

    let user = new Register(email.value, username.value, password.value, fname.value, lname.value, age.value);
    
    arr1.push(user);
    localStorage.setItem("users", JSON.stringify(arr1));
    window.location.href = "login.html";
});

logbtn.addEventListener("click", function login(event){
    event.preventDefault();
    window.location.href = "login.html"
});
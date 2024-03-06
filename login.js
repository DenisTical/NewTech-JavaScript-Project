// First Section - Data from Login HTML //

//Data from Login HTML
let loginUsername = document.querySelector("#login-username");
let loginPassword = document.querySelector("#login-password");
let forgotBtn = document.querySelector("#forgot-button");
let loginBtn = document.querySelector("#login-button");
let users;

if(localStorage.users != null){
    users = JSON.parse(localStorage.getItem('users'));
}else{
    users = [];
};


// Second Section - Register and Login Buttons //


forgotBtn.addEventListener("click", function register(event){
    event.preventDefault();
    
    const index = users.findIndex(el => {
        return el.username === loginUsername.value;
    });
    
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = "register.html";
});

loginBtn.addEventListener("click", function login(element){
    element.preventDefault();
    
    const user = users.find(el => {
        return el.username === loginUsername.value;
    });

    const pasw = users.find(el => {
        return el.password === loginPassword.value;
    });
    
    if(user === undefined || pasw === undefined){
        alert("Username or Password is incorrect");
    };
    if(pasw.password === loginPassword.value && user.username === loginUsername.value){
        localStorage.setItem("token", JSON.stringify(user));
        window.location.href = "main.html";
    }
    
});
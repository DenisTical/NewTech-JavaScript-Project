// First Section - Index / LocalStorage Elements //


//Index Global
let indexGlobal;

//Elements from LocalStorage
let token = JSON.parse(localStorage.getItem('token'));
let users = JSON.parse(localStorage.getItem("users")) || [];
let user = users.find(element => element.username === token.username);


// Second Section - The Top-Bar Display //


//Home Image Display
let mainLogo = document.querySelector('.image');

mainLogo.addEventListener('click', () => {
    removeHiddenClass(searchShiftDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, editProfileDiv);
});

//Search Display
let searchShiftDiv = document.querySelector(".search-container");

//Add Shift Display
let addShiftDiv = document.querySelector('.add-shift');
let addShiftBtn = document.querySelector('#addBtn');

addShiftBtn.addEventListener('click', () => {
    removeHiddenClass(addShiftDiv);
    addHiddenClass(editShiftDiv, editProfileDiv, searchShiftDiv);
});

//Edit Shift Display
let editShiftDiv = document.querySelector('.edit-shift');
let editShiftBtn = document.querySelector('#editBtn');

editShiftBtn.addEventListener('click', () => {
    removeHiddenClass(editShiftDiv);
    addHiddenClass(addShiftDiv, editProfileDiv, searchShiftDiv);
});

//Edit Profile Display
let editProfileDiv = document.querySelector('.editProfile');
let editProfileBtn = document.querySelector('#profileBtn');

editProfileBtn.addEventListener('click', () => {
    removeHiddenClass(editProfileDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, searchShiftDiv);
    
    editEmail.value = user.email;
    editPassword.value = user.password;
    editFName.value = user.fname;
    editLName.value = user.lname;
    editAge.value = user.age;
});

//Username Display
window.addEventListener('load', () => {
    let para = document.querySelector('.paraUser');
    para.innerHTML = `Hello, ${token.username}`;
});

//Logout Button Display
let logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "login.html";
})

//Remove Class Hidden
function removeHiddenClass(){
    const arg = Array.from(arguments);
    
    for (let i = 0; i < arg.length; i++){
        arg[i].classList.remove("hidden")
    }
};

//Add Class Hidden
function addHiddenClass(){
    const arg = Array.from(arguments);
    
    for (let i = 0; i < arg.length; i++){
        arg[i].classList.add("hidden")
    }
};


// Third Section - Add Shift / Edit Shift / Edit Profile //


//Add-Shift
let addDate = document.querySelector('.add-date-input');
let addBegTime = document.querySelector('.add-time-input');
let addEndTime = document.querySelector('.add-end-input');
let addPrice = document.querySelector('.add-price-input');
let addShift = document.querySelector('.add-shift-input');
let addSlug = document.querySelector('.add-slug-input');
let addComments = document.querySelector('.add-textarea-input');
let addAddBtn = document.querySelector('#add-add-btn');
let addCloseBtn = document.querySelector('#add-close-btn');

addAddBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let timeStart = new Date(`${addDate.value} ${addBegTime.value}`);
    let timeEnd = new Date(`${addDate.value} ${addEndTime.value}`);
    let salaryPerShift;

    let timeShift = (timeEnd.getHours() + (timeEnd.getMinutes() / 60) - (timeStart.getHours() + timeStart.getMinutes() / 60));
    
    if(timeShift > 0){
        salaryPerShift = +(timeShift * (addPrice.value)).toFixed(2);
    }else {
        salaryPerShift = +(-timeShift * (addPrice.value)).toFixed(2);
    }

    if(user.userShifts === undefined){
        user.userShifts = [];
    }

    let userShift = new Object();

    if(addDate.value !== ''){
        userShift.addDate = addDate.value;
    }else {
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }

    if(addBegTime.value !== ''){
        userShift.addBegTime = addBegTime.value;
    }else {
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }

    if(addEndTime.value !== ''){
        userShift.addEndTime = addEndTime.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }

    if(addPrice.value !== ''){
        userShift.addPrice = addPrice.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }

    if(addShift.value !== ''){
        userShift.addShift = addShift.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }

    if(addSlug.value !== ''){
        userShift.addSlug = addSlug.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }

    let nameShift = user.userShifts.filter(element => element.addSlug === addSlug.value);
    if(nameShift.length > 0 || addSlug.value == ''){
        alert("Slug already registered!");
        return;
    }

    userShift.salaryPerShift = salaryPerShift;
    userShift.addComments = addComments.value;
    user.userShifts.push(userShift);
    users.splice(users.indexOf(user), 1, user);
    localStorage.setItem('users', JSON.stringify(users));
    table(user.userShifts);
    removeHiddenClass(searchShiftDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, editProfileDiv);
    clearInputs();
})

addCloseBtn.addEventListener('click', () => {
    removeHiddenClass(searchShiftDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, editProfileDiv);
});

//Edit-Shift
let editDate = document.querySelector('.edit-date-input');
let editBegTime = document.querySelector('.edit-time-input');
let editEndTime = document.querySelector('.edit-end-input');
let editPrice = document.querySelector('.edit-price-input');
let editShift = document.querySelector('.edit-shift-input');
let editSlug = document.querySelector('.edit-slug-input');
let editComments = document.querySelector('.edit-textarea-input');
let editApplyBtn = document.querySelector('#edit-apply-btn');
let editCancelBtn = document.querySelector('#edit-cancel-btn');

editApplyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    let timeStart = new Date(`${editDate.value} ${editBegTime.value}`);
    let timeEnd = new Date(`${editDate.value} ${editEndTime.value}`);
    let salaryPerShift;

    let timeShift = (timeEnd.getHours() + (timeEnd.getMinutes() / 60) - (timeStart.getHours() + timeStart.getMinutes() / 60));
    
    if(timeShift > 0){
        salaryPerShift = +(timeShift * (editPrice.value)).toFixed(2);
    }else {
        salaryPerShift = +(-timeShift * (editPrice.value)).toFixed(2);
    }

    let editedShift = user.userShifts[indexGlobal];
    if(editDate.value !== ''){
        editedShift.addDate = editDate.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }
    if(editBegTime.value !== ''){
        editedShift.addBegTime = editBegTime.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }
    if(editEndTime.value !== ''){
        editedShift.addEndTime = editEndTime.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }
    if(editPrice.value !== ''){
        editedShift.addPrice = editPrice.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }
    if(editShift.value !== ''){
        editedShift.addShift = editShift.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }
    if(editSlug.value !== ''){
        editedShift.editSlug = editSlug.value;
    }else{
        alert("All `*` inputs must be filled out before submitting the shift");
        return;
    }
    
    editedShift.salaryPerShift = salaryPerShift;
    user.userShifts.splice(indexGlobal, 1, editedShift);
    users.splice(users.indexOf(user), 1, user);
    localStorage.setItem('users', JSON.stringify(users));

    clearInputs();
    table(user.userShifts);
    removeHiddenClass(searchShiftDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, editProfileDiv);
})

editCancelBtn.addEventListener('click', () => {
    removeHiddenClass(searchShiftDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, editProfileDiv);
});

//Editing shift function
function editingShift(index){
    editDate.value = user.userShifts[index].addDate;
    editBegTime.value = user.userShifts[index].addBegTime;
    editEndTime.value = user.userShifts[index].addEndTime;
    editPrice.value = user.userShifts[index].addPrice;
    editShift.value = user.userShifts[index].addShift;
    editSlug.value = user.userShifts[index].addSlug;
    indexGlobal = index;

    removeHiddenClass(editShiftDiv);
    addHiddenClass(addShiftDiv, editProfileDiv, searchShiftDiv);
}

//Edit-Profile
let editEmail = document.querySelector(".edit-email");
let editPassword = document.querySelector('.edit-password');
let editFName = document.querySelector('.edit-fname');
let editLName = document.querySelector('.edit-lname');
let editAge = document.querySelector('.edit-age');
let editSaveBtn = document.querySelector('#edit-savechange-btn');

editSaveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(editEmail.value.includes("@") && editEmail.value.includes(".")){
        user.email = editEmail.value;
        token.email = editEmail.value;
    }else{
        alert("Email must contain `@` and `.` characters!");
        return;
    }

    if(editPassword.value.length >= 6){
        user.password = editPassword.value;
        token.password = editPassword.value;
    }else {
        alert("Password must contain at least 6 characters!");
        return;
    }

    if(editFName.value.length >= 2){
        user.fname = editFName.value;
        token.fname = editFName.value;
    }else {
        alert("First Name must contain at least 2 letters!");
        return;
    }

    if(editLName.value.length >= 2){
        user.lname = editLName.value;
        token.lname = editLName.value;
    }else {
        alert("Last Name must contain at least 2 letters!");
        return;
    }

    if(editAge.value >= 18 && editAge.value <= 65){
        user.age = editAge.value;
        token.age = editAge.value;
    }else {
        alert("Age must be between 18 and 65");
        return;
    }

    users.splice(users.indexOf(user), 1, user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('token', JSON.stringify(token));
    removeHiddenClass(searchShiftDiv);
    addHiddenClass(addShiftDiv, editShiftDiv, editProfileDiv);
});


// Fourth Section - Table and Search //


//Table
let tbody = document.querySelector("#tbody");
function table(arr){
    let earningsPerShift = [];
    let row = '';

    if(arr !== undefined){
        arr.forEach((elem, index) => {
            row +=
            `<tr>
                <td>${elem.addDate}</td>
                <td>${elem.addBegTime}</td>
                <td>${elem.addEndTime}</td>
                <td>${elem.addPrice}</td>
                <td>${elem.addShift}</td>
                <td>${elem.addSlug}</td>
                <td>${elem.salaryPerShift}</td>
                <td><button id="action" onclick="editingShift(${index})">Edit</button></td>
            </tr>`;
            earningsPerShift.push(elem.salaryPerShift);
        })
    }else{
        return;
    }

    tbody.innerHTML = row;

    let mostProfitableShift = Math.max(...earningsPerShift);
    let mostProfitableShiftIndex = earningsPerShift.indexOf(mostProfitableShift);
    let mostProfitableShiftData = arr[mostProfitableShiftIndex];
    let profit = document.querySelector(".profit");
    profit.innerHTML = `The most profitable shift is ${mostProfitableShift}$ from the date of ${mostProfitableShiftData.addDate}`;
}
table(user.userShifts);

//Search by date
let searchFromDate = document.querySelector('.search-fdate-input');
let searchToDate = document.querySelector('.search-tdate-input');
let searchByDateBtn = document.querySelector('#search-bdate-btn');

searchByDateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let earningsPerShift = [];
    let searchShiftByDate = [];
    let row = '';
    
    for(let [index, el] of user.userShifts.entries()) {
        if((new Date(el.addDate)) >= (new Date(searchFromDate.value)) &&
        (new Date(el.addDate)) <= (new Date(searchToDate.value))) {
            searchShiftByDate.push(el);
            row += 
            `<tr>
                <td>${el.addDate}</td>
                <td>${el.addBegTime}</td>
                <td>${el.addEndTime}</td>
                <td>${el.addPrice}</td>
                <td>${el.addShift}</td>
                <td>${el.addSlug}</td>
                <td>${el.salaryPerShift}</td>
                <td><button id="action" onclick="editingShift(${index})">Edit</button></td>
            </tr>`;
            earningsPerShift.push(el.salaryPerShift);
        }
    }
    
    if(searchFromDate.value === '' && searchToDate.value === ''){
        window.location.reload();
    }

    
    tbody.innerHTML = row;

    searchFromDate.value = '';
    searchToDate.value = '';
});

//Search by name
let searchByName = document.querySelector('.search-shift-input');
let searchByNameBtn = document.querySelector('#search-bname-btn');

searchByNameBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let earningsPerShift = [];
    let searchShiftByName = [];

    let row = '';
    for (let [index, el] of user.userShifts.entries()) {
        if (el.addSlug.includes(searchByName.value)) {
            searchShiftByName.push(el);

            row += 
            `<tr>
                <td>${el.addDate}</td>
                <td>${el.addBegTime}</td>
                <td>${el.addEndTime}</td>
                <td>${el.addPrice}</td>
                <td>${el.addShift}</td>
                <td>${el.addSlug}</td>
                <td>${el.salaryPerShift}</td>
                <td><button id="action" onclick="editingShift(${index})">Edit</button></td>
            </tr>`;
            earningsPerShift.push(el.salaryPerShift);
        }
    }

    tbody.innerHTML = row;

    searchByName.value = '';
});

//Clear Inputs
function clearInputs(){
    addDate.value = '';
    addBegTime.value = '';
    addEndTime.value = '';
    addPrice.value = '';
    addShift.value = '';
    addSlug.value = '';
    addComments.value = '';
}
const addAdmin = document.querySelector(`.add-admin-list`);
const addList = document.querySelector(`.add-list`);
const back = document.querySelector(`.back`);
const closeList = document.querySelector(`.list-text i`);

addAdmin.addEventListener(`click`, () => {
    addList.classList.add(`active`);
    back.classList.add(`active`);
});

closeList.addEventListener(`click`, () => {
    if(addList.classList.contains(`active`)){
        addList.classList.remove(`active`);
        back.classList.remove(`active`);
    }
});


let userName = document.querySelector(`.name`);
let userEmail = document.querySelector(`.email`);
let phoneNumber = document.querySelector(`.phone-number`);
let selectCity = document.querySelector(`.list select`);
let submit = document.querySelector(`.submit`);
let todo = document.querySelector(`.todo`);

let todoList = [];

if(localStorage.getItem('todoList')){
    todoList = JSON.parse(localStorage.getItem('todoList'));
    addAdminList();
}

submit.addEventListener(`click`, () => {
    addAdminTodoList();
});

function addAdminTodoList() {
    let gender = document.querySelector(`.genders input[type='radio']:checked`);
    
    let newTodo = {
        nameValue: userName.value,
        emailValue: userEmail.value,
        phoneValue: phoneNumber.value,
        cityValue: selectCity.value,
        genderValue: gender ? gender.value : null
    }
    
    let a = false;
    todoList.forEach(elem => {
        a = a || elem.nameValue == userName.value || 
                elem.emailValue == userEmail.value || 
                elem.phoneNumber == phoneNumber.value
    });

    if(
        userName.value !== '' && 
        userEmail.value !== '' && 
        phoneNumber.value !== '' && 
        selectCity.value !== '')
    {
        if(a){
            alert('Iltimos formani tekshirib qaytadan tering!')
        }else {
            addList.classList.remove(`active`);
            back.classList.remove(`active`);
            todoList.push(newTodo);
            addAdminList();
        }
    }else {
        alert(`Iltimos formani to'ldiring!`);
    }

    localStorage.setItem(`todoList`, JSON.stringify(todoList));
    
    userName.value = '';
    userEmail.value = '';
    phoneNumber.value = '';
    selectCity.value = ''
};

function addAdminList() {
   let addList = '';

   todoList.forEach((text, index) => {
        addList += `
            <ul id="${index}">
                <input type="text" id="name" value="${text.nameValue}" readonly>
                <input type="email" id="email" value="${text.emailValue}" readonly>
                <input type="text" id="number" value="${text.phoneValue}" readonly>
                <input type="text" id="city" value="${text.cityValue}" readonly>
                <input type="text" id="gender" value="${text.genderValue}" readonly>
                <li class="cheged-delet">
                    <i class="edet bx bxs-pencil"></i>
                    <i class="bx bx-x"></i>
                </li>
            </ul>
        `
    });
    todo.innerHTML = addList;
}


// eded and delet list
let inputCheck = false;

todo.addEventListener(`click`, (e) => {
    let parentElem = e.target.parentNode.parentNode;
    let parentId = parentElem.id;
    let parentElemInput = parentElem.querySelectorAll(`input`);

    todoList.forEach((elem, indexes) => {

        if(e.target.classList.contains(`bx-x`)){
            if(parentId == indexes){
                if(confirm(`Are sure`)){
                    parentElem.remove();
                    todoList.splice(indexes, 1);
                    localStorage.setItem('todoList', JSON.stringify(todoList));
                }
            }
        }

        if(e.target.classList.contains(`edet`)){
            if(parentId == indexes){
                inputCheck = !inputCheck;
                parentElemInput.forEach(inputElem => {

                    if(inputCheck){
                        e.target.classList.add(`bx-check`);
                        e.target.classList.remove(`bxs-pencil`);
                        inputElem.classList.add(`active`);
                        inputElem.removeAttribute('readonly');

                        if(inputElem.id == 'number'){
                            inputElem.type = 'number';
                        }
                        
                        inputElem.addEventListener(`keyup`, (el) => {
                            if(el.target.id == 'name'){
                                elem.nameValue = el.target.value;
                            }
                            if(el.target.id == 'email'){
                                elem.emailValue = el.target.value;
                            }
                            if(el.target.id == 'number'){
                                elem.phoneValue = el.target.value;
                            }
                            if(el.target.id == 'city'){
                                elem.cityValue = el.target.value;
                            }
                            if(el.target.id == 'gender'){
                                elem.genderValue = el.target.value;
                            }
                        });
                    }else {
                        e.target.classList.remove(`bx-check`);
                        e.target.classList.add(`bxs-pencil`);
                        inputElem.classList.remove(`active`);
                        inputElem.setAttribute('readonly', '');
                        addAdminList();
                        localStorage.setItem(`todoList`, JSON.stringify(todoList));
                    }
                })
            }
        }
    });
});

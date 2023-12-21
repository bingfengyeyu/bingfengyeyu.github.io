import { TodoRealtime } from './class/TodoRealtime.js';
// import { UID } from './class/UID.js';
import { App } from './Firebase/App.js' 
import {Auth} from './Firebase/Auth.js'


const app = await App.init();
const auth = new Auth(app);

let todoApp = document.querySelector('#todo-app');
let uidApp = document.querySelector('#uid-app');


let email = 'Jackeylove0103@gmail.com'
let password = '123456789'

// let user = await auth.register(email,password)註冊
// let user = await auth.signIn(email,password);登入
// console.log(user);


const authed = (user) =>{
    let uid = UID.read();
    todoApp.classList.add('active');
    // TODO Application.
    let elInput = document.querySelector('#todo-in');
    let elAddBtn = document.querySelector('#todo-add-btn');
    let elItem = document.querySelector('#todo-item');
    let elChangeUid = document.querySelector('#change-uid-btn');
    let todo = new TodoRealtime(elItem, uid);


    

    const addTodo = () => {
        let value = elInput.value;
        if (!value) {
            elInput.focus();
            return; // void
        }

        elInput.value = '';
        elInput.focus();

        todo.add(value);
        todo.render();
    }

    elAddBtn.addEventListener('click', (e) => {
        addTodo();
    })


    elInput.addEventListener('keyup', (e) => {
        if (e.key.toString().toUpperCase() == 'ENTER') {
            addTodo();
        }
    })

    elChangeUid.addEventListener('click', (e) => {
        e.preventDefault();
        UID.clear();
        location.reload();
    })
}


    let elCurentUid = document.querySelector('#current-uid');
    elCurentUid.innerHTML = uid

    const unauthed = () =>{

    uidApp.classList.add('active');

    let elUid = document.querySelector('#todo-uid');
    let elBtn = document.querySelector('#todo-uid-btn');
    elBtn.addEventListener('click', (e) => {
        let value = elUid.value;
        if (value) {
           
            location.reload();
        }
    })
}

auth.onChange(authed, unauthed);
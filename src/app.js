import page from "../node_modules/page/page.mjs";
import {html, render} from "../node_modules/lit-html/lit-html.js";
import {getUserData} from "./util.js";
import {logout} from "./api/data.js"
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
let root = document.querySelector('main');

function decorateContent(ctx,next) {
    ctx.render = (content) => render(content,root);
    ctx.updateUserNav = updateUserNav;

    next();
};

export function updateUserNav() {
    let userData = getUserData();

    if(userData) {
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.guest').style.display = 'inline-block';
        document.querySelector('.user').style.display = 'none';
    }
}

document.getElementById('logoutBtn').addEventListener('click',(e) => {
    logout();
    updateUserNav();
    page.redirect('/');
})

page(decorateContent);
updateUserNav();
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page.start();
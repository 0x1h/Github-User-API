"use strict";
const input = document.querySelector("input");
const form = document.querySelector("form");
const mainContainer = document.querySelector(".main-container");
const USER_API = "https://api.github.com/users/";
var keyCode;
(function (keyCode) {
    keyCode[keyCode["Enter"] = 13] = "Enter";
})(keyCode || (keyCode = {}));
class UserAPI {
    constructor(follower, following, userName, userAvatar, repos) {
        this.follower = follower;
        this.following = following;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.repos = repos;
        this.main;
    }
    fetchRepos() {
        const repo_cont = document.querySelector('.repo-container');
        this.repos.forEach(element => {
            const userReposSpan = document.createElement('span');
            repo_cont.appendChild(userReposSpan);
            userReposSpan.innerText = element.name;
        });
    }
    generateUser() {
        const main = document.createElement("main");
        mainContainer.appendChild(main);
        form.addEventListener('submit', (e) => {
            main.remove();
            e.preventDefault();
        });
        main.innerHTML = `
<div class="user-profile">
    <img src="${this.userAvatar} data-border" />
    <p>${this.userName}</p>
</div>
<div class="data">
    <div class="data-conatiner">
        <div class="user-stats">
            <span class="Followers">
                <p>Followers:</p>
            <span class="fol-num" />${this.follower}</span>
            </span>
                <span class="Following">
                 <p >Following: </p>
                <span class="foll-num" />${this.following}</span>
            </span>
            </div>
        <p style="color: #fff; margin-top: 20px">Public Repositories:</p>
        <div class="repo-container" style="margin-top: 10px">
        </div>
    </div>
</div>
`;
    }
}
const fetchData = async (userName) => {
    const fetchUser = await fetch(USER_API + userName);
    const dataJSON = await fetchUser.json();
    const repositories = await fetch(dataJSON.repos_url);
    const repositories_names = await repositories.json();
    const userAPI = new UserAPI(dataJSON.followers, dataJSON.following, dataJSON.login, dataJSON.avatar_url, repositories_names);
    userAPI.generateUser();
    userAPI.fetchRepos();
};
const outputData = () => {
    localStorage.setItem("user", input.value);
    fetchData(input.value);
    input.value = "";
};
form.addEventListener("submit", (e) => {
    outputData();
    e.preventDefault();
});
window.addEventListener("load", () => {
    const user = localStorage.getItem("user");
    fetchData(user);
});
//# sourceMappingURL=app.js.map
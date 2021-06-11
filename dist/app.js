"use strict";
const btn = document.querySelector("button");
const input = document.querySelector("input");
const USER_API = "https://api.github.com/users/";
var keyCode;
(function (keyCode) {
    keyCode[keyCode["Enter"] = 13] = "Enter";
})(keyCode || (keyCode = {}));
const mainContainer = document.querySelector(".main-container");
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
        this.repos.forEach(function (element) {
            const userReposSpan = document.createElement('span');
            userReposSpan.setAttribute('data-border', '');
            repo_cont.appendChild(userReposSpan);
            userReposSpan.innerText = element.name;
        });
    }
    generateUser() {
        const main = document.createElement("main");
        mainContainer.appendChild(main);
        btn.addEventListener('click', () => {
            main.remove();
        });
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === keyCode.Enter)
                main.remove();
        });
        main.innerHTML = `
<div class="user-profile">
    <img src="${this.userAvatar} data-border" style='cursor: pointer' />
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
    const promise = new Promise((resolve, reject) => {
        if (dataJSON.login !== undefined) {
            resolve('Search Github User');
            userAPI.generateUser();
            userAPI.fetchRepos();
        }
        else {
            reject('User name Doesnt Exist');
        }
    });
    promise.then(response => input.setAttribute('placeholder', String(response)))
        .catch(err => {
        input.setAttribute('placeholder', `${err}`);
    });
};
const outputData = () => {
    fetchData(input.value);
    input.value = '';
};
window.addEventListener('keyup', (e) => {
    if (e.keyCode === keyCode.Enter) {
        outputData();
    }
});
btn.addEventListener('click', outputData);
//# sourceMappingURL=app.js.map
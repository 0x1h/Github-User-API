const btn = document.querySelector("button") as HTMLButtonElement;
const input = document.querySelector("input") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement

const mainContainer = document.querySelector(".main-container") as HTMLDivElement;

const USER_API: string = "https://api.github.com/users/";

enum keyCode {Enter = 13}
class UserAPI {
  public follower: number;
  public following: number;
  public userName: string;
  public  userAvatar: string;
  public repos: string[] 

  main: any

  constructor(follower: number, following: number, userName: string, userAvatar: string, repos: string[]) {
    this.follower = follower;
    this.following = following;
    this.userName = userName;
    this.userAvatar = userAvatar
    this.repos = repos
    this.main;
  }

  fetchRepos(){
    const repo_cont = document.querySelector('.repo-container') as HTMLDivElement

    this.repos.forEach(element => {
        const userReposSpan = document.createElement('span');

        repo_cont.appendChild(userReposSpan)
        userReposSpan.innerText = element.name
    });
  }
  generateUser() {
    const main = document.createElement("main");
    mainContainer.appendChild(main);

    btn.addEventListener('click', ()=> {
        main.remove()
    })

    window.addEventListener('keyup', (e: any)=> {
        if(e.keyCode === keyCode.Enter) main.remove()
    })

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
`
  }
}

const fetchData = async (userName: string) => {  
    const fetchUser: any = await fetch(USER_API + userName)
    const dataJSON: any = await fetchUser.json()

    const repositories: any = await fetch(dataJSON.repos_url)
    const repositories_names: any = await repositories.json()

    const userAPI = new UserAPI(dataJSON.followers, dataJSON.following, dataJSON.login, dataJSON.avatar_url, repositories_names)
    const promise = new Promise((resolve, reject)=> {
      if(dataJSON.login !== undefined){
          resolve('Search Github User')
          userAPI.generateUser()
          userAPI.fetchRepos()
      } else{
          reject('User name Doesnt Exist')
      }
    })

    promise.then(response => input.setAttribute('placeholder', String(response)))
    .catch(err => {
        input.setAttribute('placeholder', `${err}`)
    })
}

const outputData = () => {
    fetchData(input.value)
    input.value = ''
}

form.addEventListener("submit", (e)=> {
    e.preventDefault()

    outputData()
})

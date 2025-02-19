import { makeAutoObservable } from "mobx";

const users = [
  {
    login: "vlad",
    password: "vlad771",
    name: "Влад",
  },
];

class MainStore {
  name: string = "";
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  logIn(login: string, password: string) {
    const user = users.find(
      (user) => user.login === login && user.password === password
    );
    if (user) {
      this.isAuth = true;
      this.name = user.name;
      this.saveToLocalStorage();
    } else {
      alert("Неверный логин или пароль");
    }
  }

  logOut() {
    this.name = "";
    this.isAuth = false; // Исправлено
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(
      "mobxData",
      JSON.stringify({ name: this.name, isAuth: this.isAuth })
    );
  }

  loadFromLocalStorage() {
    const savedData = localStorage.getItem("mobxData");
    if (savedData) {
      const { name, isAuth } = JSON.parse(savedData);
      this.name = name;
      this.isAuth = isAuth;
    }
  }
}

const mainStore = new MainStore();
export default mainStore;

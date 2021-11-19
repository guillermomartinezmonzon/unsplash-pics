// Data Examples for Testing
// import { IDexample, initialStateExample } from "./Examples";

/// LocalStorage (Favorites) ///
export function saveLocal(array) {
  localStorage.setItem("state", JSON.stringify(array));
}

export function loadLocal() {
  try {
    if (!localStorage.getItem("state")) {
      saveLocal([]); // replace with initialStateExample for testing
    }
    return JSON.parse(localStorage.getItem("state"));
  } catch (e) {
    console.log(e);
  }
}

/// LocalStorage (IDs) ///
export function saveLocalID(array) {
  localStorage.setItem("ids", JSON.stringify(array));
}

export function loadLocalID() {
  try {
    if (!localStorage.getItem("ids")) {
      saveLocalID([]); // replace with IDexample for testing
    }
    return JSON.parse(localStorage.getItem("ids"));
  } catch (e) {
    console.log(e);
  }
}

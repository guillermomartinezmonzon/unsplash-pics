import { createSlice } from "@reduxjs/toolkit";
import {
  loadLocal,
  loadLocalID,
  saveLocal,
  saveLocalID,
} from "../data/LocalStorage";

export const MainSlice = createSlice({
  name: "listimages",
  initialState: {
    listRandom: [], // list render on RandomPage
    listFavorites: loadLocal(), // list render on FavoriteList
    listIDs: loadLocalID(), // only IDs for faster search
  },
  reducers: {
    addOneFavorite: (state, action) => {
      if (state.listIDs.indexOf(action.payload.id) < 0) {
        state.listFavorites.push(action.payload);
        state.listIDs.push(action.payload.id);
        saveLocal(state.listFavorites);
        saveLocalID(state.listIDs);
      } else {
        alert("pic already added");
      }
    },
    deleteOne: (state, action) => {
      const indexID = state.listIDs.indexOf(action.payload.id);
      const index = state.listFavorites.indexOf(action.payload.id);
      if (indexID < 0) {
        alert("pic not found");
      } else {
        state.listFavorites.splice(index, 1);
        state.listIDs.splice(indexID, 1);
        saveLocal(state.listFavorites);
        saveLocalID(state.listIDs);
      }
    },
    addAllToRandomList: (state, action) => {
      state.listRandom = action.payload;
    },
    editDescription: (state, action) => {
      const index = state.listFavorites.findIndex(
        (i) => i.id === action.payload.id
      );
      state.listFavorites[index].description = action.payload.description;
      saveLocal(state.listFavorites);
      saveLocalID(state.listIDs);
    },
    toggleRandomMode: (state, action) => {
      state.random = action.payload;
    },
    sortDate: (state, action) => {
      const arr2 = state.listFavorites.slice().sort(compareDates);
      state.listFavorites = arr2;
    },
    sortLikes: (state, action) => {
      const arr2 = state.listFavorites.slice().sort(compareLikes);
      state.listFavorites = arr2;
    },
    sortWidth: (state, action) => {
      const arr2 = state.listFavorites.slice().sort(compareWidth);
      state.listFavorites = arr2;
    },
    sortHeigth: (state, action) => {
      const arr2 = state.listFavorites.slice().sort(compareHeigth);
      state.listFavorites = arr2;
    },
  },
});

/// Compare Functions for sort ///

function compareDates(a, b) {
  if (a.dateAdded < b.dateAdded) {
    return -1;
  }
  if (a.dateAdded > b.dateAdded) {
    return 1;
  }
  return 0;
}
function compareLikes(a, b) {
  if (a.likes < b.likes) {
    return -1;
  }
  if (a.likes > b.likes) {
    return 1;
  }
  return 0;
}
function compareWidth(a, b) {
  if (a.width < b.width) {
    return -1;
  }
  if (a.width > b.width) {
    return 1;
  }
  return 0;
}
function compareHeigth(a, b) {
  if (a.height < b.height) {
    return -1;
  }
  if (a.height > b.height) {
    return 1;
  }
  return 0;
}

export const {
  addOneFavorite,
  populateRandom,
  toggleRandomMode,
  addAllToRandomList,
  deleteOne,
  sortDate,
  sortLikes,
  sortWidth,
  sortHeigth,
  searchFavorites,
  editDescription,
} = MainSlice.actions;

export const selector = (state) => state.listimages;

export default MainSlice.reducer;

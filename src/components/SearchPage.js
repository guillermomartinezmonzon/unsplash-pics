import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import EditIcon from "@mui/icons-material/Edit";

import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  ImageList,
} from "@mui/material";

import { unsplash } from "../data/unsplash";

import {
  selector,
  addAllToRandomList,
  addOneFavorite,
  deleteOne,
} from "../redux/MainSlice.js";
import { NavMain } from "./NavMain";

export const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { listRandom, listIDs } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    getRandomImages();
  }, []);

  useEffect(() => {
    if (!loaded && listRandom.length) setLoaded(true);
  }, [listRandom]);

  function getRandomImages() {
    unsplash.photos
      .getRandom({
        count: 30,
      })
      .then((res) => {
        dispatch(addAllToRandomList(res.response));
      })
      .catch((e) => console.log(e));
  }

  function remove(img) {
    dispatch(deleteOne(img));
  }

  function add(img) {
    const obj = { ...img };
    obj["dateAdded"] = Date.now();
    dispatch(addOneFavorite(obj));
  }

  function imageOpenHandler(img) {
    window.open(img.urls.full, "_blank");
  }

  function isFavorite(img) {
    if (listIDs.indexOf(img.id) < 0) {
      return <FavoriteIcon key={img.id} sx={{ color: "gray" }} />;
    } else {
      return <FavoriteIcon key={img.id} sx={{ color: "red" }} />;
    }
  }

  function favHandler(img) {
    if (listIDs.indexOf(img.id) < 0) {
      add(img);
    } else {
      remove(img);
    }
  }

  function dateAdded(img) {
    if (img.dateAdded) {
      return <div>{img.dateAdded}</div>;
    }
  }

  function handleSearch(e) {
    unsplash.search
      .getPhotos({
        query: searchText,
        perPage: 10,
      })
      .then((res) => {
        dispatch(addAllToRandomList(res.response.results));
      })
      .catch((e) => console.log(e));
  }

  if (loaded && listRandom.length > 0) {
    return (
      <center>
        <div style={{ maxWidth: 800 }}>
          <NavMain
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            link="/favorites"
            random
          />
          <ImageList sx={{ width: "100%" }} rowHeight={164}>
            {listRandom.map((img) => (
              <Card key={img.id}>
                <CardMedia
                  component="img"
                  height="88%"
                  image={img.urls.small}
                />
                <CardActions height="12%" disableSpacing>
                  <IconButton onClick={() => favHandler(img)}>
                    {isFavorite(img)}
                  </IconButton>
                  <IconButton onClick={() => imageOpenHandler(img)}>
                    <OpenInNewIcon />
                  </IconButton>
                  <div
                    style={{
                      flexDirection: "column",
                      color: "gray",
                      marginLeft: "auto",
                      marginRight: 12,
                      marginTop: 8,
                    }}
                  >
                    {dateAdded(img)}
                    Likes: {img.likes} <br />
                    {img.width}x{img.height}
                  </div>
                </CardActions>
              </Card>
            ))}
          </ImageList>
        </div>
      </center>
    );
  } else {
    return (
      <div style={{ maxWidth: 800, align: "center" }}>
        <NavMain
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          link="/favorites"
        />
        <center>
          <h2>Loading... </h2>
        </center>
      </div>
    );
  }
};

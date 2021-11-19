import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditModal from "./EditModal";

import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  ImageList,
} from "@mui/material";

import {
  selector,
  addOneFavorite,
  deleteOne,
  editDescription,
} from "../redux/MainSlice.js";
import { NavMain } from "./NavMain";

export const FavoritePage = () => {
  const [searchText, setSearchText] = useState("");
  // const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);

  const dispatch = useDispatch();
  const { listFavorites, listIDs } = useSelector(selector);

  function remove(img) {
    dispatch(deleteOne(img));
  }

  function add(img) {
    dispatch(addOneFavorite(img));
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
      let date2 = new Date(img.dateAdded).toLocaleDateString("es-ES");
      return <div style={{ right: 0 }}>{date2}</div>;
    }
  }

  function changeDescription(newDescription) {
    dispatch(editDescription({ id: editing.id, description: newDescription }));
    setEditing(null);
  }

  if (listFavorites.length > 0) {
    return (
      <>
        <center>
          <div>
            <NavMain
              searchText={searchText}
              setSearchText={setSearchText}
              link="/"
            />
            <div
              style={{
                maxWidth: 800,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageList sx={{ width: "100%" }} rowHeight={164}>
                {listFavorites
                  .filter((img) => {
                    return searchText.length
                      ? img.description &&
                          img.description
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                      : true;
                  })
                  .map((img) => (
                    <Card key={img.id}>
                      <CardMedia
                        component="img"
                        height="88%"
                        image={img.urls.small}
                      />
                      <CardActions height="12%" disableSpacing>
                        <IconButton
                          size="large"
                          onClick={() => favHandler(img)}
                          aria-label="add to favorites"
                        >
                          {isFavorite(img)}
                        </IconButton>
                        <IconButton
                          size="large"
                          onClick={() =>
                            setEditing({
                              id: img.id,
                              description: img.description,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          aria-label="open in new tab"
                          onClick={() => imageOpenHandler(img)}
                        >
                          <OpenInNewIcon />
                        </IconButton>
                        <div
                          style={{
                            color: "gray",
                            marginLeft: "auto",
                            marginRight: 12,
                            marginTop: 8,
                          }}
                        >
                          {dateAdded(img)}
                          Likes: {img.likes}
                        </div>
                      </CardActions>
                    </Card>
                  ))}
              </ImageList>
            </div>
          </div>
        </center>
        <EditModal
          oldDescription={editing && editing.description}
          open={editing !== null}
          handleClose={() => {
            setEditing(null);
          }}
          changeDescription={changeDescription}
        />
      </>
    );
  } else {
    return (
      <center>
        <div style={{ maxWidth: 800, align: "center" }}>
          <NavMain
            searchText={searchText}
            setSearchText={setSearchText}
            link="/"
          />
          <h2>Favorite pictures not added yet... </h2>
          <h1>:(</h1>
        </div>
      </center>
    );
  }
};

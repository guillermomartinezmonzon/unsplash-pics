import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SortModal from "./SortModal";

export const NavMain = (props) => {
  function setInputSearch(e) {
    props.setSearchText(e.target.value);
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          maxWidth: 800,
          alignItems: "center",
          display: "flex",
        }}
      >
        <TextField
          placeholder={
            props.random ? "Search in Unsplash" : "Search in Favorites"
          }
          onInput={setInputSearch}
          sx={{ width: "100%" }}
          value={props.searchText}
        />
        {!props.random ? <SortModal /> : null}

        {props.random ? (
          <IconButton onClick={props.handleSearch} sx={{ fontSize: "medium" }}>
            <SearchIcon />
          </IconButton>
        ) : null}

        <Link to={props.link}>
          <IconButton sx={{ fontSize: "large" }}>
            <BookmarkBorderIcon />
          </IconButton>
        </Link>
      </Stack>
    </div>
  );
};

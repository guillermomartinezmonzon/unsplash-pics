import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { useDispatch } from "react-redux";
import { sortDate, sortHeigth, sortLikes, sortWidth } from "../redux/MainSlice";

export default function SortModal() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function sortByDate() {
    dispatch(sortDate());
  }

  function sortByHeigth() {
    dispatch(sortHeigth());
  }

  function sortByLikes() {
    dispatch(sortLikes());
  }

  function sortByWidth() {
    dispatch(sortWidth());
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SortIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={sortByDate}>Date</MenuItem>
        <MenuItem onClick={sortByWidth}>Width</MenuItem>
        <MenuItem onClick={sortByHeigth}>Heigth</MenuItem>
        <MenuItem onClick={sortByLikes}>Likes</MenuItem>
      </Menu>
    </div>
  );
}

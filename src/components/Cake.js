import React from "react";
//import classes from './Cake.css';

/**card component */
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from '@material-ui/lab/Rating';

const cake = props => (
  <div className="cake-card" onClick={ () => props.clicked(props.key)}>
    <div className="cake-image">
      <img src={props.imageUrl} alt={props.name}></img>
    </div>
    <div className="cake-info">
      <div className="cake-title">{props.name}</div>
      <IconButton aria-label="settings">
        <FavoriteIcon />
      </IconButton>
    </div>
    {/* <Rating
      name="simple-controlled"
      value={props.rating}
    //   onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}
    /> */}
  </div>
);

export default cake;

import React, { Component } from "react";
import axios from "./../baseUrl";
import Cake from "./../components/Cake";
import "./CakesView.scss";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddCake from "./../components/AddCake";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
/**card component */
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

class CakeDetails extends Component {
  state = {
    cake: [],
    error: false
  };

  componentDidMount() {
    const url = this.props.location.pathname;
    const cakeId = url.split("/").slice(-1)[0];
    axios
      .get("/cakes/" + cakeId)
      .then(response => {
        this.setState({ cake: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <section className="cakesContainer">
        <div className="cakeView-title">{this.state.cake.name}</div>
        <div className="cakeWrapper">
          <div className="cake-card-horisontal">
            <div className="cake-image">
              <img
                src={this.state.cake.imageUrl}
                alt={this.state.cake.name}
              ></img>
            </div>
            <div className="cake-info">
              <div className="cake-title">{this.state.cake.name}</div>
              <IconButton aria-label="settings">
                <FavoriteIcon />
              </IconButton>
              <Rating
                name="simple-controlled"
                value={this.state.cake.yumFactor}
                readOnly
              />
              <div className="comments">
              {this.state.cake.comment}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CakeDetails;

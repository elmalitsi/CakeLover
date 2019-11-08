import React, { Component } from "react";
import axios from "./../baseUrl";
import Cake from "./../components/Cake";
import "./CakesView.scss";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddCake from "./../components/AddCake";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

class Cakes extends Component {
  state = {
    cakes: [],
    error: false,
    ModalIsOpen: false,
    cakesLoaded : false
  };

  componentDidMount() {
    this.GetCakes()
  }

  GetCakes(){
    axios
    .get("/cakes")
    .then(response => {
      this.setState({ cakes: response.data });
    })
    .catch(error => {
      this.setState({ error: true });
    });
  }

  cakeSelectedHandler = id => {
    this.props.history.push('/cake/' + id)
  };

  AddCake = () => {
    console.log('add cake')
    this.setState({
      ModalIsOpen: true
    });
  };

  CloseModal = () =>{
    this.setState({
      ModalIsOpen: false
    });
    this.GetCakes()
  }

  render() {
    let cakes = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      cakes = this.state.cakes.map(cake => {
        //just some basic validation there are a lot of bad URLs to images
        return (
          <Cake
            key={cake.id}
            name={cake.name}
            imageUrl={cake.imageUrl}
            rating={cake.yumFactor}
            clicked={() => this.cakeSelectedHandler(cake.id)}
          />
        );
      });
    }

    return (
      <section className="cakesContainer">
        <div className="cakeView-title">Only for Cake Lovers</div>
        <div className="cakeWrapper">{cakes}</div>
        <Fab
          color="primary"
          aria-label="add"
          className="addCake btn blue"
          onClick={() => this.AddCake()}
        >
          <AddIcon />
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="addCake-modal"
          open={this.state.ModalIsOpen}
          onClose={this.CloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.ModalIsOpen}>
            <AddCake className={useStyles.paper}/>
            {/* <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">
                react-transition-group animates me.
              </p>
            </div> */}
          </Fade>
        </Modal>
      </section>
    );
  }
}

export default Cakes;

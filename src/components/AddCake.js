import React from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import axios from "./../baseUrl";
import { stat } from "fs";

class AddCake extends React.Component {
  state = {
    rating: 0,
    name: "",
    comment: "",
    ImageUrl:"",
    wrongInput: false,
    formSubmited: false
  };

  componentDidMount() {
    this.setState({
      rating: 0,
      name: "",
      comment: "",
      ImageUrl:"",
      wrongInput: false,
      formSubmited: false
    })
  }

  AddCake = () => {
    let postCake ={}
    if (this.state.name === "" || this.state.comment === "" || this.state.imageUrl === ""){
      this.setState({
        wrongInput : true
      })
    }else{
      postCake = {
        name: this.state.name,
        comment: this.state.comment,
        imageUrl: this.state.ImageUrl,
        yumFactor: this.state.rating
      };
      axios({
        method: "post",
        url: "/cakes",
        data: postCake
      }).then(res => {
        this.setState({
          formSubmited:true
        })
      });
    }
  };

  HandleChange = name => event => {
  if (name === "rating" && (event.target.value > 5 || event.target.value < 0)){

  }else{
    this.setState({
      [name]: event.target.value
    })
  }
  };

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-title">Add you favorite cake</div>
        {!this.state.formSubmited ? 
        <div className="add-wrapper">
          <form className="form" noValidate autoComplete="off">
            <TextField
              required
              id="outlined-required"
              placeholder="Add Cake title"
              className="cake-title-input"
              margin="normal"
              onChange={this.HandleChange("name")}
            />
            <TextField
              required
              id="outlined-required"
              placeholder="Comment"
              className="cake-title-input"
              margin="normal"
              onChange={this.HandleChange("comment")}
            />
            <TextField
              required
              id="outlined-required"
              placeholder="Image Url"
              className="cake-title-input"
              margin="normal"
              onChange={this.HandleChange("ImageUrl")}
            />
            <TextField
              id="standard-number"
              label="Number"
              value={this.state.rating}
              onChange={this.HandleChange("rating")}
              type="number"
              className="cake-title-input"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
          </form>
          {this.state.wrongInput && <div className="errorMessages">All field are required</div>}
          <div className="btn primary" onClick={() => this.AddCake()}>
            Add
          </div>
        </div>
        : <div className="CakeAdded">Congratulations. You are a true Cake lover</div>}
      </div>
    );
  }
}
export default AddCake;

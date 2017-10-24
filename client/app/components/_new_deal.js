import React from 'react';
import { browserHistory } from 'react-router'
import {postDeal} from '../server';

export default class PostItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      newTitle: "",
      newDescription:"",
      newMinPrice: "",
      newExpiration: "",
      newURL: "",
      newImg: "",
      newTags: "",
      imageUri: ""
    };
  }

  //Converts input date to javascript date object. Then convert that to unix time.
  convertDate(date){
    var expirationDate = date.split("/");
    //Date counts months from 0-11, so -1.
    var newDate = new Date(expirationDate[2], expirationDate[0]-1, expirationDate[1]);
    //Convert new date to unix timestamp
    return newDate.getTime();
    //newdeal sends minPrice as a string, but not int
  }

  //On button press, call postDeal server method to post a new deal
  postNewDeal(){
    //Use helper method to get unix time for expiration
    var expiration = this.convertDate(this.state.newExpiration);
    if(isNaN(this.state.newMinPrice)){
      alert("Invalid Minimum Price"); //Replace later with better msg
    }
    else if(expiration<Date.now()){
      alert("Deal has already expired"); //Replace later with better msg
    }
    else{
      postDeal("000000000000000000000001",
        this.state.newTitle,
        this.state.newDescription,
        this.state.newMinPrice,
        this.state.newURL,
        expiration,
        this.state.imageUri,
        this.state.newTags,
        (newDeal) => {
          this.setState({ _id: newDeal._id });
          browserHistory.push('/#/deal/' + this.state._id);
          window.location.reload();
        }
      );
      alert("Your deal has been posted"); //Replace later with better confirmation msg
    }

  }

  handleChange(e,type) {
    //Calls setState repeatedly whenever a value is changed in order to save that value for future use
    e.preventDefault();
    if(type=="title"){
      this.setState({ newTitle: e.target.value });
    }
    if(type=="description"){
      this.setState({ newDescription: e.target.value });
    }
    if(type=="minPrice"){
      this.setState({ newMinPrice: e.target.value });
    }
    if(type=="expiration"){
      this.setState({ newExpiration: e.target.value });
    }
    if(type=="URL"){
      this.setState({ newURL: e.target.value });
    }
    if(type=="tags"){
      this.setState({ newTags: e.target.value });
    }

  }

  triggerImageUpload(e) {
    e.preventDefault();
    // Click the input HTML element to trigger a file selection dialog.
    this.refs.file.click();
  }

  uploadImage(e) {
    e.preventDefault();
    // Read the first file that the user selected (if the user selected multiple
    // files, we ignore the others).
    var reader = new FileReader();
    var file = e.target.files[0];

    // Called once the browser finishes loading the image.
    reader.onload = (upload) => {
      this.setState({
        imageUri: upload.target.result
      });
    };
    // Tell the brower to read the image in as a data URL!
    reader.readAsDataURL(file);
  }

  render(){
    return(
      <div className="container panel-item">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-8">
                    <h1>
                      <input type="text" className="form-control" placeholder="Title of Deal" value={this.state.newTitle} onChange={(e) => this.handleChange(e,"title")}/>
                    </h1>
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="URL" value={this.state.newURL} onChange={(e) => this.handleChange(e,"URL")}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">Select File for Deal Image</label>
                    <div style={{height: 0, overflow: "hidden"}}>
                      <input ref="file" type="file" name="file" accept=".jpg,.jpeg,.png,.gif" onChange={(e) => this.uploadImage(e)}/>
                    </div>
                    <button type="button" className="btn btn-default" onClick={(e) => this.triggerImageUpload(e)}>
                      Add Deal Picture
                    </button>
                    <img style={{width: "100%"}} src={this.state.imageUri} />
                  </div>
                  <div className="col-md-5">
                    <div className="row">
                      <p>Minimum Price:</p>
                      <input type="text" className="form-control" placeholder="Enter Minimum Price Wanted" value={this.state.newMinPrice} onChange={(e) => this.handleChange(e,"minPrice")}/>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col-md-2">
                        <p>Expires</p>
                      </div>
                      <div className="col-md-10">
                        <input type="text" className="form-control inline" placeholder="mm/dd/yyyy" value={this.state.newExpiration} onChange={(e) => this.handleChange(e,"expiration")}/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <h2>The Deal</h2>
                    <input type="text" className="form-control" placeholder="Describe your deal in detail" value={this.state.newDescription} onChange={(e) => this.handleChange(e,"description")}/>
                    <br></br>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="inline">Tags </h3>
                    <br></br>
                    <br></br>
                    <input type="text" className="form-control" placeholder="Add tags users might search to find your deal, e.g. Jeans, Women, Pants" value={this.state.newTags} onChange={(e) => this.handleChange(e,"tags")}/>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
              <button className="btn btn-default deal-button" onClick={ (e) => this.postNewDeal(e)}>
                <h3>Post Deal</h3>
              </button>
          </div>
        </div>

      </div>
    );
  }
}

/*<div id="pairMeModal" className="modal fade" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Pair me!</h4>
      </div>
      <div className="modal-body">
        <p>{this.state.pairee === 1 ? "Congrats, you have" : "Damn I screwed up, you have not"} been paired!</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>*/

//contains what is now profile details and toggles edit button btw owner and guest
//also contains the shipping payment button for just the owner
import React from 'react';
// import {Link} from 'react-router';
import UserDeals from './_user_deals';
import {getUserData, editUserProfileField} from '../server';
import {unixTimeToString, hideElement} from '../util';

import uuid from 'node-uuid';
import UserDetails from './_user_details.js';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        userFields: [
          {
            id: uuid.v4(),
            userInfo: 'Enter name here.',
            type:"fullName"
          },
          {
            id: uuid.v4(),
            userInfo: 'Enter email address here.',
            type:"email"
          },
          {
            id: uuid.v4(),
            userInfo: 'Enter your current location here.',
            type:"currentLocation.city"
          }
        ],
        userData: {fullName:"", imagePath:"", _id:"", email:"", currentLocation:{city:"", state:""}},
        guestView: true
      }
  }

  refresh(){
    getUserData(this.props.userId, (user) => {
      var temp = this.state.userFields;
      temp[0].userInfo = user.fullName;
      temp[1].userInfo = user.email;
      temp[2].userInfo = user.currentLocation.city;
      if(this.props.userId === "000000000000000000000001"){
        this.setState({
          userData:user,
          userFields:temp,
          guestView:false
        });
      }
      else{
        this.setState({
          userData:user,
          userFields:temp,
          guestView:true
        });
      }

    });
  }

  componentDidMount(){
    this.refresh();
  }

  // onEditCancel(e) {
  //   e.preventDefault();
  //   this.setState({
  //     editing: false,
  //     editSubmitted: false
  //   });
  // }
  //
  // handleEditChange(e, str) {
  //   e.preventDefault();
  //   switch(str){
  //     case "fullName": this.setState({editedName: e.target.value }); break;
  //     case "email":    this.setState({editedEmail: e.target.value }); break;
  //     case "city":     this.setState({editedCity: e.target.value }); break;
  //     case "USstate":   this.setState({editedState: e.target.value }); break;
  //     default:           window.alert(str + " is not a case in handleEditChange");
  //   }
  // }

  // //TODO: If user does not edit field, it will erase
  // onEdit(e) {
  //   e.preventDefault();
  //
  //   if(this.state.editedName !== undefined){
  //     editUserProfileField(this.state.userData._id, "fullName", this.state.editedName,(user) => {
  //       this.setState({userData:user, editing: false});
  //     });
  //   }
  //
  //   if(this.state.editedEmail !== undefined){
  //     editUserProfileField(this.state.userData._id, "email", this.state.editedEmail,(user) => {
  //       this.setState({userData:user, editing: false});
  //     });
  //   }
  //
  //   if(this.state.editedCity !== undefined){
  //     editUserProfileField(this.state.userData._id, "city", this.state.editedCity,(user) => {
  //       this.setState({userData:user, editing: false});
  //     });
  //   }
  //
  //   if(this.state.editedState !== undefined){
  //     editUserProfileField(this.state.userData._id, "USstate", this.state.editedState,(user) => {
  //       this.setState({userData:user, editing: false});
  //     });
  //   }
  // }

  render() {

    const userFields = this.state.userFields;
    return (
      <div>
        <div className="profile-container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <h3><center>{this.state.userData.fullName}</center></h3>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <div className="profile">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 profile-details">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-details-left profile-details-top">
                    <img src={this.state.userData.imagePath} className="profile-pic" />
                  </div>
                </div>
                <br/>
                <div className="col-md-3">

                    <UserDetails userFields={userFields}
                           onEdit={this.editField.bind(this)} guestView={this.state.guestView} />

                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        <UserDeals userId={this.props.userId}/>
      </div>
    );
  }

  editField(id, userInfo) {
    // Iterate over the dealFields and update the one with the
    // matching id.
    //
    var fieldType;

    const userFields = this.state.userFields.map(userField => {
      if (userField.id === id) {
        userField.userInfo = userInfo;
      }
      return userField;
    });

    //Retrieve field type of the userField we are editing
    for(var i=0; i<userFields.length;i++){
      if(this.state.userFields[i].id === id){
        fieldType = this.state.userFields[i].type;
      }
    }
    editUserProfileField(this.props.userId, fieldType, userInfo, (user)=> {
      var temp = this.state.userFields;
      temp[0].userInfo = user.fullName;
      temp[1].userInfo = user.email;
      temp[2].userInfo = user.currentLocation.city;
      this.setState({
        userData:user,
        userFields:temp
      });
    });
    // Set the state to re-render.
    //this.setState({ userFields : userFields });
  }

}

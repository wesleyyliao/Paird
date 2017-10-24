import React from 'react';
import {Link} from 'react-router';

export default class ProfileDetails extends React.Component{

  onEdit() {
    this.context.router.push({ pathname: "/editProfilePage/"
    });
  }

  render(){
    return(
      <div>
      <div className="profile-container">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3">
                <Link to={"/profilePageGuest/"}>
                  <button className="btn btn-default btn-xs pull">
                    View as Guest
                  </button>
                </Link>
              </div>
              <div className="col-md-6">
                <h3><center>John Hopkins Profile</center></h3>
              </div>
              <div className="col-md-3">
                <div className="profile-title">
                  <button className="btn btn-default" onClick={(e) => this.onEdit(e)}>
                    Edit <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
          </div>
        </div>
        <div className="profile">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8 profile-details">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-details-left profile-details-top">
                    <img className ="profile-pic" src="../img/profilepicture.jpg" />
                  </div>
                </div>
                <br />
                <div className="col-md-3">
                  <table className="profile-details-table">
                    <tr>
                      <td>Name:</td>
                      <td>John Hopkins</td>
                    </tr>
                    <tr>
                      <td>Username:</td>
                      <td>jhopkins03</td>
                    </tr>
                    <tr>
                      <td>Email Address:</td>
                      <td>jhopkins@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Date Of Birth:</td>
                      <td>01/02/1903</td>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>Phone Number:</td>
                      <td>(987)-654-3210</td>
                    </tr>
                    <tr>
                      <td>Join Date:</td>
                      <td>01/01/2015</td>
                    </tr>
                    <tr>
                      <td>Last Visited:</td>
                      <td>Yesterday</td>
                    </tr>
                    <tr>
                      <td>Location:</td>
                      <td>Amherst:</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
        </div>

        <div className="col-md-2">
        </div>
      </div>
  );
  }
}

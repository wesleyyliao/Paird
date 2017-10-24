import React from 'react';
import {Link} from 'react-router';
/*import {getUserData} from '../server';*/


export default class ProfileGuestHistory extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
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
              <br></br>
            </div>
          </div>
          <div className="col-md-2">
          </div>
        </div>
        <div className="profile">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
              <div className="profile-details">
                <div className="row">
                  <div className="col-md-5">
                    <div className="profile-details-left profile-details-top">
                      <img src="img/profilepicture.jpg" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    {/*getUserData(this.props.profile, (user) => {
                        this.setState(user)
                    })*/}
                  <br />
                    <h3>John Hopkins{/*this.state.fullName*/}</h3>
                    <ul className="guest-list-details">
                      <li><h5>jhopkins@gmail.com{/*this.state.email*/}</h5></li>
                      <li><h5>01/02/1903</h5></li>
                      <li><h5>Male</h5></li>
                      <li><h5>(987)-654-3210</h5></li>
                      <li><h5>San Diego, CA</h5></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
        <div className="profile-tabwidget">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <ul className="nav nav-pills">
                <li role="presentation"><Link to={"/profilePageGuest/"}>Your Active Deals</Link> {this.props.children}</li>
                <li role="presentation" className="active"><Link to={"/profilePageGuestHistory/"}>Deals History</Link> {this.props.children} </li>
              </ul>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <ul className="media-list">
                    <li className="media">
                      <div className="media-left media-top">
                        <span className="glyphicon glyphicon-star"></span>
                      </div>
                      <div className="media-body">
                        <Link to={"/itemPage/"}>Spend $50, Save $10 Deal #437433</Link>:<br></br><img src="img/exampleDeal5.jpg" />
                      </div>
                    </li>
                    <hr></hr>
                    <li className="media">
                      <div className="media-left media-top">
                        <span className="glyphicon glyphicon-star"></span>
                      </div>
                      <div className="media-body">
                        <Link to={"/itemPage/"}>Spend $60, 20% Off Total #392423</Link>:<br></br><img src="img/exampleDeal4.jpg" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
      <div className="col-md-2">
      </div>
    </div>

  );
  }
}

import React from 'react';
import {Link} from 'react-router';
import ProfileDetails from '../components/profiledetails';

export default class DealsHistory extends React.Component{
  render() {
    return (
      <div>
        <ProfileDetails />
        <div className="profile-tabwidget">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <ul className="nav nav-pills">
                <li role="presentation"><Link to={"/activeDealsPage/"}>Your Active Deals</Link> {this.props.children}</li>
                <li role="presentation" className="active"><Link to={"/dealsHistoryPage/"}>Deals History</Link> {this.props.children} </li>
                <li role="presentation"><Link to={"/shippingPaymentPage/"}>Shipping & Payment</Link> {this.props.children} </li>
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
    );
  }
}

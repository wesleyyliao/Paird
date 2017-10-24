import React from 'react';
import {Link} from 'react-router';
import ProfileDetails from '../components/profiledetails';

export default class ActiveDeals extends React.Component { 

  onPost() {
    this.context.router.push({ pathname: "/postItem/"
    });
  }

  render() {
    return(
        <div>
          <ProfileDetails />
          <div className="profile-tabwidget">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <ul className="nav nav-pills">
                  <li role="presentation" className="active"><Link to={"/activeDealsPage/"}>Your Active Deals</Link> {this.props.children}</li>
                  <li role="presentation"><Link to={"/dealsHistoryPage/"}>Deals History</Link> {this.props.children} </li>
                  <li role="presentation"><Link to={"/shippingPaymentPage/"}>Shipping & Payment</Link> {this.props.children} </li>
                </ul>
              </div>
            <div className="col-md-2"></div>
          </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="panel panel-default">
                  <div className="panel-body profilepills">
                    <button className="btn btn-lg pull-right" id="postNewDeal" onClick={(e) => this.onPost(e)}>
                      Post New Deal <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <br />
                    <br />
                    <br />
                    <hr />
                    <ul className="media-list">
                      <li className="media">
                        <div className="media-left media-top">
                          <span className="glyphicon glyphicon-star"></span>
                        </div>
                        <div className="media-body">
                          <Link to={"/itemPage/"}>30% off Deal #342222</Link>:<br></br><img src="img/exampleDeal6.jpg" />
                        </div>
                      </li>
                      <hr></hr>
                      <li className="media">
                        <div className="media-left media-top">
                          <span className="glyphicon glyphicon-star"></span>
                        </div>
                        <div className="media-body">
                          <Link to={"/itemPage/"}>Free shipping on Deal #125320</Link>:<br></br><img src="img/exampleDeal2.jpg" />
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

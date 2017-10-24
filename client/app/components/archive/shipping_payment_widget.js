import React from 'react';
import {Link} from 'react-router';
import ProfileDetails from '../components/profiledetails';

export default class ShippingPayment extends React.Component{

  onEdit() {
    this.context.router.push({ pathname: "/editProfilePage/"
    });
  }

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
                <li role="presentation"><Link to={"/dealsHistoryPage/"}>Deals History</Link> {this.props.children} </li>
                <li role="presentation" className="active"><Link to={"/shippingPaymentPage/"}>Shipping & Payment</Link> {this.props.children} </li>
              </ul>
            </div>
            <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <h5>Shipping Address:</h5>
                    <br />
                    Mall Outlets inc.
                    123 Happy Street
                    <div className="btn-group pull-right" role="group">
                      <Link to={"/editProfilePage/"}><button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"></span>
                      </button></Link>{this.props.children}
                    </div>
                    <br /> San Diego, CA, USA
                    <br /> (987)-654-3210
                    <hr />
                    <h5>Billing Address:</h5>
                    <br />
                    Jane Doe
                    <br />5844 South Oak Street
                    <div className="btn-group pull-right" role="group">
                      <Link to={"/editProfilePage/"}><button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"></span>
                      </button></Link>{this.props.children}
                    </div>
                    <br /> San Diego, CA, USA
                    <br /> (987)-444-0892
                    <hr />
                    <h5>Payment Information:</h5>
                    <br />
                    Debit Card
                    <div className="btn-group pull-right" role="group">
                      <Link to={"/editProfilePage/"}><button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"></span>
                      </button></Link>{this.props.children}
                    </div>
                    <br /> TD Bank
                    <br /> Account: 343434343434
                    <br /> Visa XXX-XXXX-XXXX-5567
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

import React from 'react';
import UserDealsOpen from './_user_deals_open';
import UserDealsClosed from './_user_deals_closed';
import UserDealsEditing from './_user_deals_editing';
import {postDeal} from '../server.js';

export default class UserDeals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dealMode: "open"
    };
  }

  onClick(e, clicked) {
    var clickedPill = clicked;
    if (clickedPill === "open" || "closed") {
      this.setState({dealMode: clickedPill});
    } else {
      this.setState({dealMode: "editing"})
    }
  }

  handleDealSubmit(title, description, minPrice, link) {
    postDeal(this.state._id, title, description, minPrice, link, (newDeal) => {
      this.setState(newDeal);
      });
    }

  renderWidget() {
    if (this.state.dealMode === "open") {
      return (
        <UserDealsOpen userId={this.props.userId}/>
      )
    } else if (this.state.dealMode === "closed") {
      return (
        <UserDealsClosed userId={this.props.userId}/>
      )
    }
    else if (this.state.dealMode === "editing"){
      return(
        <UserDealsEditing onDealSubmit={(title, description, minPrice, link) => this.handleDealSubmit(title, description, minPrice, link)}/>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="profile-tabwidget">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <ul className="nav nav-pills">
                <li role="presentation" onClick={(e) => this.onClick(e, "open")}><a>My Open Deals</a></li>
                <li role="presentation" onClick={(e) => this.onClick(e, "closed")}><a>Closed Deals</a></li>
              </ul>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-body profilepills">

                  <br />
                  <br />
                  <br />
                  <hr />
                  {this.renderWidget()}
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
/* <button className="btn btn-lg pull-right" id="postNewDeal" onClick={(e) => this.onClick(e, "editing")}>
  <span>Post New Deal <span className="glyphicon glyphicon-plus"></span></span>
 </button>*/

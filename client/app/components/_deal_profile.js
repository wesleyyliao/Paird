import React from 'react';
import {Link} from 'react-router';
import {getDealData, pairUser, editDealProfileField} from '../server';
import {unixTimeToString} from '../util.js';
import {calculateExpirationDay, hideElement} from '../util.js';

import uuid from 'node-uuid';
import DealDetails from './_deal_details.js';
import {setDeal} from './_deal_details.js';

/**
still can't read from DB, and also need to make it so only the tag/pills for
the specific deal show up on each deal profile page. In other words, not all
of the deal profile pages should show 'women', 'swim', 'jeans' like they currently do
**/

export default class DealProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dealFields: [
        {
          id: uuid.v4(),
          words: getDealData(this.props.dealId, (result)=> this.state.dealFields[0].words = "Minimum amount required is $ " + result.minPrice),
          field: "minPrice"
        },
        {
          id: uuid.v4(),
          words: getDealData(this.props.dealId, (result)=> this.state.dealFields[1].words = result.description),
          field: "description"
        },
        {
          id: uuid.v4(),
          words: getDealData(this.props.dealId, (result)=> this.state.dealFields[2].words = calculateExpirationDay(parseInt(result.expDate)/1000)),
          field: "expDate"
        }
      ],
      "owner": [],
      "description": [],
      dealId: this.props._id,
      displayModal: false
    }
  }

  getPair() {
    if (this.state.pairee === undefined){
      return "Currently unpaird";
    } else {
      return "Currently paird with " + this.state.pairee.fullName;
    }
  }

  pairUser() {
    pairUser(this.state._id, "000000000000000000000001", (deal) => {
      this.dataHasBeenFetched();
      this.setState({deal});
    });
  }

  refresh() {
    // window.alert("getDealData : " + this.props.dealId)
    getDealData(this.props.dealId, (deal) => {
      this.setState(deal);
    });

  }

  componentDidMount() {
    this.refresh();
  }

  dataHasBeenFetched() {
    this.displayModal = true;
    this.refresh();
  }

  render() {
    const dealFields = this.state.dealFields;

    return (
      <div className="container panel-item">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <h1>
                      <a href={this.state.link}>{this.state.title}</a>
                    </h1>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <img src={this.state.imagePath} width="100%" />
                    </div>
                    <div className="col-md-6">
                      <p>Posted by
                        <Link to={"/user/" + this.state.owner._id}> {this.state.owner.fullName}</Link> {unixTimeToString(this.state.postDate)}</p>

                    <DealDetails dealFields={dealFields}
                           onEdit={this.editField.bind(this)} />

                      <hr />

                      {this.getPair()}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <h2>The Deal</h2>
                    <br />
                    <h4>Want to participate in this deal?</h4>
                    <br />
                    <p>Enter the product ID#(s) of the item(s) you want:</p>
                  </div>
                  <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Product ID#" />
                  </div>
                  <div className="col-md-1">
                    <span className="glyphicon glyphicon-plus move-southwest"></span>
                  </div>
                  <div className="col-md-6">
                    <button type="button" onClick={ (e) => this.pairUser(e)} className="btn btn-default pull-right" data-toggle={this.displayModal ? "modal" : ""} data-target={this.displayModal ? "#pairMeModal" : ""}>
                      <h5>Pair me!</h5>
                    </button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="inline">Found in</h3>
                    <button type="button" className="btn btn-default tag-color-1-item search-terms">
                      Women
                    </button>
                    <button type="button" className="btn btn-default tag-color-2-item search-terms">
                      Jeans
                    </button>
                    <button type="button" className="btn btn-default tag-color-3-item search-terms">
                      Swim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div id="pairMeModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Pair me!</h4>
              </div>
              <div className="modal-body">
                <p>{this.state.pairee === "000000000000000000000001" ? "Congrats, you have" : "Damn I screwed up, you have not"} been paired!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  editField(id, words) {
    // Iterate over the dealFields and update the one with the
    // matching id.
    const dealFields = this.state.dealFields.map(dealField => {
      if (dealField.id === id && words) {
        if(dealField.words !== words){
          if(dealField.field === "minPrice"){
            var regex = "^[0-9]*[.][0-9][0-9]$"
            if(words.match(regex)){
              editDealProfileField(this.props.dealId, dealField.field, words, (results)=>console.log(results));
              words = "Minimum amount required is $" + words;
            }
            else{
              words = "Input does not match the correct format. Example of correct format is 1.99"
            }
          }
          else if(dealField.field === "expDate"){
            var regex1 = "^(1[0-2]|0[0-9]|[0-9])[/]([0-2][0-9]|3[0-1])/[0-9][0-9][0-9][0-9]$";
            if(words.match(regex1)){
                  var date = words.split("/");
                  var expDate = new Date(date[2],((parseInt(date[0]) - 1)).toString(),date[1]);
                  editDealProfileField(this.props.dealId, dealField.field, (expDate.getTime()).toString(), (results)=>console.log(results));
                  words = calculateExpirationDay(parseInt(expDate.getTime()).toString()/1000);
            }
            else{
              words = "Didn't match format: mm/dd/yyyy";
            }
          }
          else{
            editDealProfileField(this.props.dealId, dealField.field, words, (results)=>console.log(results));
          }
        }
        dealField.words = words;
      }
      return dealField;
    });

    /*
    editDealProfileField("000000000000000000000005", "minPrice", dealFields[0].words, (results)=>console.log(results));
    editDealProfileField("000000000000000000000005", "description", dealFields[1].words, (results)=>console.log(results));
    editDealProfileField("000000000000000000000005", "expDate", dealFields[2].words, (results)=>console.log(results));
    */
    // Set the state to re-render.
    this.setState({ dealFields : dealFields });
  }

  // deleteField(id) {
  //   const dealFields = this.state.dealFields.filter(dealField => dealField.id !== id);
  //   this.setState({ dealFields : dealFields });
  // }

}

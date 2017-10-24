import React from 'react';
import {Link} from 'react-router';

export default class Item extends React.Component{
  render(){
    return(
      <div className="container panel-item">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <h1><a href="http://www.ae.com/">Am. Eagle Free Shipping & 50% Off Deal</a></h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <img src="img/exampleDeal2.jpg" width="100%" />
                  </div>
                  <div className="col-md-6">
                    <p>Posted by <Link to={"/profilePageGuest/2"}>Sleeping Beauty</Link> {this.props.children}
 yesterday at 12:05PM</p>
                    <br></br>
                    <ul>
                      <li>Free shipping on $25+ orders</li>
                      <li>Separate deal - 50% off clearance items</li>
                      <li>To pair, must spend at least $10</li>
                      <li>FYI, there’s lots of swimwear on clearance!</li>
                    </ul>
                    <h5 className="pull-right">Expires in 2 days</h5>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <h2>The Deal</h2>
                    <p>There is a $30 pair of jeans on clearance that I want to buy so I can get them for $15! But I want free shipping, so I need to pair with someone who will spend at least $10 at American Eagle by the 8th at midnight.</p>
                    <br></br>
                    <h4>Want to participate in this deal?</h4>
                    <br></br>
                    <p>Enter the product ID#(s) of the item(s) you want:</p>
                  </div>
                  <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Product ID#"/>
                  </div>
                  <div className="col-md-1">
                    <span className="glyphicon glyphicon-plus move-southwest"></span>
                  </div>
                  <div className="col-md-6">
                    <button type="button" className="btn btn-default pull-right" data-toggle="modal" data-target="#pairMeModal">
                      <h5>Pair me!</h5>
                    </button>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="inline">Found in </h3>
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
        <p><h5>Congrats, you've been paired! Check your email for further details.</h5></p>
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
}

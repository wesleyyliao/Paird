import React from 'react';

export default class PostItem extends React.Component{

  onPost() {
    this.context.router.push({ pathname: "/itemPage/"
    });
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
                    <h1><input type="text" className="form-control" placeholder="Title of Deal"/></h1>
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="URL"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">Select File for Deal Image</label>
                      <input id="input-4" name="input4[]" type="file" multiple className="file-loading" />
                  </div>
                  <div className="col-md-5">
                    <div className="row">
                      <p>Details:</p>
                      <input type="text" className="form-control" placeholder="Click + to add more details"/>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col-md-2">
                        <p>Expires</p>
                      </div>
                      <div className="col-md-10">
                        <input type="text" className="form-control inline" placeholder="00:00 mm/dd/yyyy"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                    <br></br>
                    <span className="glyphicon glyphicon-plus move-southwest" id="detail-plus"></span>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <h2>The Deal</h2>
                    <input type="text" className="form-control" placeholder="Describe your deal in detail"/>
                    <br></br>
                    <h4>Want to participate in this deal?</h4>
                    <br></br>
                    <input type="text" className="form-control" placeholder="Explain to possible pairs what their part of the deal would be"/>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="inline">Tags </h3>
                    <br></br>
                    <br></br>
                    <input type="text" className="form-control" placeholder="Add tags users might search to find your deal"/>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
              <button className="btn btn-default deal-button" onClick={(e) => this.onPost(e)}>
                <h3>Post Deal</h3>
              </button>
          </div>
        </div>
      </div>
    );
  }
}

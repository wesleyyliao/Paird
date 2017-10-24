import React from 'react';

export default class TagBar extends React.Component{
  //when the user clicks the x tag should disapear, and remove from the search query
  //when user types into the search bar, a tab should be made with that word

  render(){
    return(
      <div>
        <div className="container" id="tab-container">
            <div className="col-md-2"></div>
            <div className="btn-toolbar tag-top-pad" role="toolbar">
              <div className="col-md-8">
                <button type="button" className="btn btn-default tag-color-1 search-terms">
                  <span className="glyphicon glyphicon-remove"></span>
                </button>
                <button type="button" className="btn btn-default tag-color-2 search-terms">
                  Jeans <span className="glyphicon glyphicon-remove"></span>
                </button>
                <button type="button" className="btn btn-default tag-color-3 search-terms">
                  Swim <span className="glyphicon glyphicon-remove"></span>
                </button>
              </div>
            </div>
        </div>
      </div>
  );
  }
}

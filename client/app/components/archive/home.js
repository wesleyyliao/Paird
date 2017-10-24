import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component{

render(){
  return(
  <div>
    <div className="container panel-home" id="featured-deals">
    <div className="row">
      <div className="col-md-4">
        <Link to={"/itemPage/"}><img src="img/exampleDeal2B.jpg" className="homepageDeal" /></Link>
      </div>
      <div className="col-md-4">
        <Link to={"/itemPage/"}><img src="img/exampleDeal2B.jpg" className="homepageDeal" /></Link>
      </div>
      <div className="col-md-4">
        <Link to={"/itemPage/"}><img src="img/exampleDeal2B.jpg" className="homepageDeal" /></Link>
      </div>
    </div>

    <div className="row">
      <div className="col-md-4">
        <Link to={"/itemPage/"}><img src="img/exampleDeal2B.jpg" className="homepageDeal" /></Link>
      </div>
      <div className="col-md-4">
        <Link to={"/itemPage/"}><img src="img/exampleDeal2B.jpg" className="homepageDeal" /></Link>
      </div>
      <div className="col-md-4">
        <Link to={"/itemPage/"}><img src="img/exampleDeal2B.jpg" className="homepageDeal" /></Link>
      </div>
    </div>
  </div>
    <footer>
      <div className="bottom-align">
        All rights reserved.
      </div>
    </footer>
  </div>
  );
}



}

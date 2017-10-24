import React from 'react';
//import {Link} from 'react-router';


export default class Intro extends React.Component{

  onEnter() {
    this.context.router.push({pathname: "home"});
  }

  render() {
    return (
      <div className="paird-img">
        <div className="fadein">
          <div className="col-md-4"></div>
          <div className="col-md-4" id="paird-col">
            <div className="row">
              <h1 id="paird-title">Paird</h1>
            </div>
            <div className="row">
              <p id="paird-blurb">A breakthrough in online shopping.
                Find the best deals and split at a reasonable price.
                Purchase only what you want without breaking the bank.</p>
            </div>
            <div id="cont-btns" className="row">
              <button onClick={(e) => this.onEnter(e)} className="btn btn-default">Continue as Guest</button>
              <button onClick={(e) => this.onEnter(e)} className="btn btn-default">Continue via Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

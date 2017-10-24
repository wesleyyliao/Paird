import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      input: "",
      tags: []
    };
  }

  renderTagbar(){
    if(this.context.router.isActive({pathname: "/resultPage/"})){
    return(
      <div className="container" id="tab-container">
          <div className="col-md-2"></div>
          <div className="btn-toolbar tag-top-pad" role="toolbar">
            <div className="col-md-8">
              {this.state.tags.map(function(tag){
                return(
                  <button type="button" className="btn btn-default tag-color-1 search-terms" key={tag}>
                    {tag} <span className="glyphicon glyphicon-remove"></span>
                  </button>
                )
              })}
            </div>
          </div>
      </div>
    );}
    else{
      this.state.tags = [];
    }
  }

  handleChange(e){
    this.setState({input : e.target.value});
  }

  onSearch() {
  // onSearch(searchText) {
    // If searchText is 'sandals', navigates to #/search/q?=sandals
    if(this.state.tags != undefined){
      if(this.state.tags.indexOf(this.state.input) === -1){
        this.setState({tags: this.state.tags.concat([this.state.input])});
      }
    }
    if(!this.context.router.isActive({pathname: "/resultPage/"})){
    this.context.router.push({ pathname: "/resultPage/"
        //, query: { q: this.state.input }
    });
    }
    this.state.input = "";
  }

  render(){
    return(
      <div>
        <nav className="navbar navbar-fixed-top navbar-default" id="navbar-id">
          <div className="container">
            <div className="col-md-2">
              <div className="nav navbar-nav">
                <Link to={"/homepage/"}><span className="navbar-brand glyphicon glyphicon-leaf"></span></Link> {this.props.children}
                <Link to={"/homepage/"}><span className="navbar-brand"><img src="img/logo_cream.png" id="wordmark" /></span></Link> {this.props.children}
              </div>
            </div>
            <div className="col-md-8">
              <div className="nav navbar-nav">
                <form className="navbar-form" role="search">
                  <div className="input-group expand">
                    <input type="text" className="form-control round" placeholder="Search . . ." value={this.state.input} onChange={(e) => this.handleChange(e)}/>
                    <span className="input-group-btn">
                      <button type="submit" className="btn btn-default round" onClick={(e) => this.onSearch(e)}>
                        <span className="glyphicon glyphicon-search red-search"></span>
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-2">
              <div className="nav navbar-nav navbar-right">
                  <Link to={"/postItem/"}><span className="navbar-brand glyphicon glyphicon-plus white-icons"></span></Link> {this.props.children}
                  <Link to={"/profilePage/"}><span className="navbar-brand glyphicon glyphicon-user white-icons"></span></Link> {this.props.children}
                  <Link to={"/introPage/"}><span className="navbar-brand glyphicon glyphicon-log-out white-icons"></span></Link>{this.props.children}
              </div>
            </div>
          </div>
        </nav>
        {this.renderTagbar()}
      </div>
  );
  }
}

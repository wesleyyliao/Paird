import React from 'react';
import SearchBar from './_searchbar';
//import {Link} from 'react-router';

export default class Navbar extends React.Component {

  /********/
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tags: ["", "", "", "", ""]
    };
  }

  clearTags() {
    this.setState({tags:["", "", "", "", ""]});
    this.context.router.push({
      pathname: "/search/:" + this.state.tags[0] + "/:" +this.state.tags[1] + "/:"+this.state.tags[2] + "/:"+this.state.tags[3] + "/:"+this.state.tags[4]
      //    , query: { q: this.state.input }
    });
  }


  deleteTag(tag){
      var index = this.state.tags.indexOf(tag);
      var temp = this.state.tags;
      temp[index] = "";
      this.setState({tags:temp});
      this.context.router.push({
        pathname: "/search/:" + this.state.tags[0] + "/:" +this.state.tags[1] + "/:"+this.state.tags[2] + "/:"+this.state.tags[3] + "/:"+this.state.tags[4]
        //    , query: { q: this.state.input }
      });
  }
  renderTag(index){
    if (this.state.tags[index] !== "") {

      return (

        <button type="button" className="btn btn-default tag-color-1 search-terms" key={this.state.tags[index]} onClick={()=> this.deleteTag(this.state.tags[index])}>
          {this.state.tags[index]}
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      )
    }
  }

  renderTagbar() {
    //console.log(this.context.router.isActive({pathname: "/search/"}));
   //if(this.context.router.isActive({pathname: "/search/"})){
    return (
      <div className="container" id="tab-container">
        <div className="col-md-2"></div>
        <div className="btn-toolbar tag-top-pad" role="toolbar">
          <div className="col-md-8">
            {this.renderTag(0)}
            {this.renderTag(1)}
            {this.renderTag(2)}
            {this.renderTag(3)}
            {this.renderTag(4)}
          </div>
        </div>
      </div>
    );//}
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  onNavClick() {
    this.context.router.push({pathname: "/intro/"});
  }

  /*onSearch() {
  // onSearch(searchText) {
    // If searchText is 'sandals', navigates to #/search/q?=sandals
    if(this.state.tags != undefined){
      if(this.state.tags.indexOf(this.state.input) === -1){
        this.setState({tags: this.state.tags.concat([this.state.input])});
      }
    }
    this.state.input = "";
  }*/
  onSearch() {
    // onSearch(searchText) {
    // If searchText is 'sandals', navigates to #/search/q?=sandals
    if (this.state.tags != undefined) {
      if (this.state.tags.indexOf(this.state.input) === -1) {
        for (var i = 0; i < this.state.tags.length; i++) {
          if (this.state.tags[i] === "") {
            var tags = this.state.tags;
            tags[i] = this.state.input;
            this.setState({tags: tags});
            break;
          }
        }
      }
    }
    //if (!this.context.router.isActive({pathname: "/search/"})) {
      this.context.router.push({
        pathname: "/search/:" + this.state.tags[0] + "/:" +this.state.tags[1] + "/:"+this.state.tags[2] + "/:"+this.state.tags[3] + "/:"+this.state.tags[4]
        //    , query: { q: this.state.input }
      });
    //this.state.input = "";
    //}
    this.setState({input: ""});
  }
  /*******/

  // when plus glyphicon for new deal is clicked (top right corner)
  // not sure what page this should go to??
  onPlusIcon() {
    this.context.router.push({pathname: "/postdeal/"});
  }

  // when user head glyphicon is clicked
  // not sure how to define which user this should go to
  onUserIcon() {
    this.context.router.push({pathname: "/user/" + this.props.userId});
  }

  // when logout glyphicon is clicked
  onLogoutIcon() {
    this.context.router.push({pathname: "/intro/"});
  }

  //when "Pair'd" or the leaf in the left corner is clicked
  onLogo() {
    this.context.router.push({pathname: "/"});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-default" id="navbar-id">
          <div className="container">
            <div className="col-md-2">
              <div className="nav navbar-nav">
                <a onClick={(e) => this.onLogo(e)} className="navbar-brand glyphicon glyphicon-leaf"></a>
                <a onClick={(e) => this.onLogo(e)} className="navbar-brand"><img src="img/logo_cream.png" id="wordmark"/></a>
              </div>
            </div>
            <div className="col-md-8">
              <div className="nav navbar-nav">
                <SearchBar searchTerm={this.props.searchTerm} />
              </div>
            </div>
            <div className="col-md-2">
              <div className="nav navbar-nav navbar-right">
                <a onClick={(e) => this.onPlusIcon(e)} className="navbar-brand glyphicon glyphicon-plus white-icons"></a>
                <a onClick={(e) => this.onUserIcon(e)} className="navbar-brand glyphicon glyphicon-user white-icons"></a>
                <a onClick={(e) => this.onLogoutIcon(e)} className="navbar-brand glyphicon glyphicon-log-out white-icons"></a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: props.searchTerm };
  }

  handleSearchButtonClick(e) {
    e.preventDefault();
    this.search();
  }

  search() {
    //checks if the search in not empty
    if(this.state.searchTerm !== null){
      var trimmedTerm = this.state.searchTerm.trim();
      //checks if the search is only white space
      if (trimmedTerm !== "") {
        this.context.router.push({ pathname: "/search", query: { q: trimmedTerm } });
      }
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchTerm !== null) {
      // Keep searchTerm in-sync with component changes.
      this.setState({
        searchTerm: newProps.searchTerm
      });
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      this.search();
      // window.alert(this.state.searchTerm);
    }
  }

  render() {
    // HTML forms are special: Hitting 'enter' in an input box in a form
    // submits the form to the server with a POST command and refreshes
    // the page as a default action. The onSubmit handler below prevents that
    // from happening.
    return (
      <form onSubmit={(evt) => evt.preventDefault()} className="navbar-form navbar-left" role="search">
        <div className="input-group expand">
          <input type="text" className="form-control search-bar" placeholder="Search Pair'd . . . " value={this.state.searchTerm} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}  />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default search-btn" onClick={(e) => this.handleSearchButtonClick(e)}>
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

// Tell React-Router that SearchBar needs to use the router dynamically.
SearchBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

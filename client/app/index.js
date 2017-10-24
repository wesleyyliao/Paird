import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './components/_intro';
import Home from './components/_home';
import DealProfile from './components/_deal_profile';
import DealPreview from './components/_deal_preview';
import UserProfile from './components/_user_profile';
import Navbar from './components/_navbar';
//TODO: Do we need PostDeal????
import PostDeal from './components/_new_deal';
import {hideElement} from './util';
import {searchForDeals} from './server';
import ErrorBanner from './components/_error_banner.js';
import {IndexRoute, Router, Route, hashHistory} from 'react-router';
// import {Link} from 'react-router';

// Tell React-Router that you need the "router" passed in
// through SearchBar's "context".
// This needs to be defined on the SearchBar class itself like so!

//Navbar.contextTypes allows us to route from the onClick method in the search bar icon button
Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// // for the EDIT button on the profile page
// UserProfile.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };
//
// // for the POST NEW DEAL + button on the profile page in the active deals widget
// DealProfile.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };
//
// DealPreview.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

Intro.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// SearchResults.contextTypes ={
//   router: React.PropTypes.object.isRequired
// };

class IntroPage extends React.Component {
  render() {
    return (
      <div>
        <Intro />
      </div>
    )
  }
}

class DealProfilePage extends React.Component {
  render() {
    if(this.props.params.id === undefined){
      return (
        <DealProfile dealId={this.props.params.id} editing={true} />
      )
    }
    return (
      <DealProfile dealId={this.props.params.id} editing={false} />
    )
  }
}


class UserProfilePage extends React.Component {
  render() {
    return (
      <UserProfile userId={this.props.params.id} />
    )
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

// class SearchResultsPage extends React.Component {
//      render() {
//        return (
//          <div>
//            <SearchResults tag0={this.props.params.tag0} tag1={this.props.params.tag1} tag2={this.props.params.tag2} tag3={this.props.params.tag3} tag4={this.props.params.tag4}/>
//          </div>
//       )
//      }
//    }

class PostDealPage extends React.Component {
  render() {
    return (
      <div>
        <PostDeal/>
      </div>
    )
  }
}

class SearchResultsPage extends React.Component {
  getSearchTerm() {
    // If there's no query input to this page (e.g. /foo instead of /foo?bar=4),
    // query may be undefined. We have to check for this, otherwise
    // JavaScript will throw an exception and die!
    var queryVars = this.props.location.query;
    var searchTerm = "";
    if (queryVars && queryVars.q) {
      searchTerm = queryVars.q;
      // Remove extraneous whitespace.
      searchTerm.trim();
    }
    return searchTerm;
  }
  render() {
    var searchTerm = this.getSearchTerm();
    // By using the searchTerm as the key, React will create a new
    // SearchResults component every time the search term changes.
    return (
      <SearchResults key={searchTerm} searchTerm={searchTerm}/>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      invalidSearch: false,
      results: []
    };
  }

  refresh() {
    var searchTerm = this.props.searchTerm;
    if (searchTerm !== "") {
      // Search on behalf of user "000000000000000000000001".
      searchForDeals(searchTerm, (deals) => {
        this.setState({loaded: true, results: deals});
      });
    } else {
      this.setState({invalidSearch: true});
    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="panel-home">
        <h3>Search Results for ''{this.props.searchTerm}.''</h3>
        <div className={hideElement(this.state.loaded || this.state.invalidSearch)}>Search results are loading...</div>
        <div className={hideElement(!this.state.invalidSearch)}>Invalid search query.</div>
        <div className={hideElement(!this.state.loaded)}>
          <div><h5>Found {this.state.results.length} results.</h5></div>
          {
           this.state.results.map((dealPreview) => {
             return (
               <div className="col-md-4 search-deals-spacing">
                 <DealPreview key={dealPreview._id} data={dealPreview} />
               </div>
             )
           })
         }
        </div>
      </div>
    );
  }
}

/*
 * The primary component in our application. Handles the overall layout
 * of the page.
 * The Router will give it different child Components as the user clicks
 * around the application.
 */
class App extends React.Component {
  render() {
    // If there's no query input to this page (e.g. /foo instead of /foo?bar=4),
    // query may be undefined. We have to check for this, otherwise
    // JavaScript will throw an exception and die!
    var queryVars = this.props.location.query;
    var searchTerm = null;
    if (queryVars && queryVars.searchTerm) {
      searchTerm = queryVars.searchTerm;
    }
    return (
      <div>
        <Navbar searchTerm={searchTerm} userId={"000000000000000000000001"}/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ErrorBanner />
            </div>
          </div>
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

// TODO: IMPLEMENT SEARCH LIKE JOHN DOES IN FACEBOOK
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={HomePage} />
      <Route path="home" component={HomePage} />
      <Route path="intro" component={IntroPage} />
      <Route path="user/:id" component={UserProfilePage} />
      <Route path="deal/" component={DealProfilePage} /> // where a deal can be entered in the UI aka PUT in db
      <Route path="deal/:id" component={DealProfilePage} />
      <Route path="postdeal" component={PostDealPage} />
      <Route path="search" component={SearchResultsPage} />
      // <Route path="search/:tag0/:tag1/:tag2/:tag3/:tag4" component={SearchResultsPage}/>
    </Route>
  </Router>
), document.getElementById('index'));

class ResetDatabase extends React.Component {
 render() {
   return (
     <button className="btn btn-default" type="button" onClick={() => {
       var xhr = new XMLHttpRequest();
       xhr.open('POST', '/resetdb');
       xhr.addEventListener('load', function() {
         window.alert("Database reset! Refreshing the page now...");
         document.location.reload(false);
       });
       xhr.send();
     }}>Reset Mock DB</button>
   );
 }
}

ReactDOM.render(
 <ResetDatabase />,
 document.getElementById('db-reset')
);

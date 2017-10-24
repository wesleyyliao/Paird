import React from 'react';
import DealPreview from './_deal_preview';
import {getDealsData} from '../server';
import {sixRandomIDs} from '../util';

export default class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      featuredDeals: []
    };
  }

  componentDidMount() {
    getDealsData(sixRandomIDs(), (dealsData) => {
      this.setState({featuredDeals: dealsData})
    })
  }

  render() {
    return (
      <div>
        {this.state.featuredDeals.map((deal) => {
          // window.alert("dealid: " + deal._id);
          return (
            <div key={deal._id} className="col-md-4 panel-home">
              <DealPreview data={deal} />
            </div>
          );
        })}
      </div>
    )
  }
}

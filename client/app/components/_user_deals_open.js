import React from 'react';
import {getOpenDealsData} from '../server';
import DealPreview from './_deal_preview';

export default class UserDealsOpen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deals: []
    };
  }

  refresh(){
    getOpenDealsData(this.props.userId, (deals) => {
      this.setState({deals: deals});
    });
  }

  componentDidMount(){
    this.refresh();
  }

  render() {
    return (
      <div>
        <ul className="media-list">
          <ul>
            {this.state.deals.map((deal) => {
              return (
                <li className="media" key={deal._id}>
                  <div className="media-left media-top">
                    <span className="glyphicon glyphicon-star"></span>
                  </div>
                  <div className="media-body">
                    <DealPreview data={deal} />
                  </div>
                </li>
              )
            })}
          </ul>
        </ul>
      </div>
    )
  }
}

import React from 'react';
import DealDetailsField from './_deal_details_field.js';

export default class DealDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: []
    }
  }

  render() {
    const dealFields = this.props.dealFields;
    //window.alert("THE DEAL: " + JSON.stringify(this.state.deal));

    return (
      <ul className="input-fields">
        {dealFields.map(dealField =>
          <li className="dealField" key={dealField.id}>
            <DealDetailsField words={dealField.words}
                  onEdit={this.onEdit(dealField.id)} />
          </li>
        )}
      </ul>
    );
  }

  onEdit(dealFieldId) {
    return (task) => {
      this.props.onEdit(dealFieldId, task);
    }
  }

  setDeal(deal) {
    this.setState(deal);
  }

  // onDelete={this.onDelete(dealField.id)} />

  // onDelete(dealFieldId) {
  //   return () => {
  //     this.props.onDelete(dealFieldId);
  //   }
  // }
}

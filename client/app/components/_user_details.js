import React from 'react';
import UserDetailsField from './_user_details_field.js';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

  render() {
    const userFields = this.props.userFields;
    return (
      <ul className="input-fields">
        {userFields.map(userField =>
          <li className="userField" key={userField.id}>
            <UserDetailsField userInfo={userField.userInfo}
                  onEdit={this.onEdit(userField.id)} guestView={this.props.guestView}/>
          </li>
        )}
      </ul>
    );
  }

  onEdit(userFieldId) {

    return (userInfo) => {
      this.props.onEdit(userFieldId, userInfo);
    }
  }
}

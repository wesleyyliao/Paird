import React from 'react';

export default class UserDetailsField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false      // Tracks `editing` state.
    };
  }

  render() {
    // Render the component differently based on state.
    if(this.props.guestView){
      return this.renderGuestField();
    }
    else if (!(this.props.guestView) && (this.state.editing)) {
      return this.renderEdit();
    } else {
      return this.renderUserField();
    }
  }

  renderEdit() {
    return (
      <input type="text"
             ref={(e) => e ? e.selectionStart = this.props.userInfo.length : null}
             autoFocus={true}
             defaultValue={this.props.userInfo}
             onBlur={this.finishEdit.bind(this)}
             onKeyPress={this.checkEnter.bind(this)} />
    );
  }

  //what to do if don't want to have fields deletable? How to render?
  renderUserField() {
    const onDelete = this.props.onDelete;
    return (<div onClick={this.edit.bind(this)}>
      <span className="userInfo">{this.props.userInfo}</span>
      {onDelete ? this.renderDelete() : null}
    </div>);
  }

  renderGuestField() {
    return (<div>
      <span>{this.props.userInfo}</span>
    </div>);
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(event) {
    if (event.key === 'Enter') {
      this.finishEdit(event);
    }
  }

  finishEdit(event) {
    const value = event.target.value;
    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);

      this.setState({
        editing: false
      });
    }
  }
}

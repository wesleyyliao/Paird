import React from 'react';

export default class DealDetailsField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false      // Tracks `editing` state.
    };
  }

  render() {
    // Render the component differently based on state.
    if (this.state.editing) {
      return this.renderEdit();
    } else {
      return this.renderDealField();
    }
  }

  renderEdit() {
    return (
      <input type="text"
             ref={(e) => e ? e.selectionStart = this.props.words.length : null}
             autoFocus={true}
             defaultValue={this.props.words}
             onBlur={this.finishEdit.bind(this)}
             onKeyPress={this.checkEnter.bind(this)} />
    );
  }

  //what to do if don't want to have fields deletable? How to render?
  renderDealField() {
    const onDelete = this.props.onDelete;

    return (<div onClick={this.edit.bind(this)}>
      <span className="words">{this.props.words}</span>
      {onDelete ? this.renderDelete() : null}
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

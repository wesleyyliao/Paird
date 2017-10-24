import React from 'react';

export default class UserDealsEditing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {title: '', description: '', minPrice: '', link: ''};
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleMinPriceChange(e) {
    this.setState({minPrice: e.target.value});
  }

  handleDealLinkChange(e) {
    this.setState({link: e.target.value});
  }

  handleSubmit(e) {
      e.preventDefault();
      var title = this.state.title.trim();
      var description = this.state.description.trim();
      var minPrice = this.state.minPrice.trim();
      var link = this.state.link.trim();
      if (!title || !description || !minPrice || !link) {
        return;
      }
      this.props.onDealSubmit({title: title, description: description, minPrice: minPrice, link: link});
      this.setState({title: '', description: '', minPrice: '', link: ''});
    }

  render() {
    return (
      <div>
      <form className="postDealForm" onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" placeholder="Your deal title" value={this.state.title} onChange={(e) => this.handleTitleChange(e)}/>
        <br />
        <input type="text" placeholder="Your deal description" value={this.state.description} onChange={(e) => this.handleDescriptionChange(e)}/>
        <br />
        <input type="text" placeholder="The minimum price of the deal" value={this.state.minPrice} onChange={(e) => this.handleMinPriceChange(e)}/>
        <br />
        <input type="text" placeholder="Link for the deal" value={this.state.link} onChange={(e) => this.handleDealLinkChange(e)}/>
        <br />
        <input type="submit" value="Post" />
      </form>
      </div>
    )
  }
}

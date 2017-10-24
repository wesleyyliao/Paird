import React from 'react';
import {Link} from 'react-router';

export default class DealPreview extends React.Component {

  render() {
    return (
      <Link to={"/deal/" + this.props.data._id}><img className="dealImg" src={this.props.data.imagePath} /></Link>
    );

  }
}
/*if(this.props.data.imagePath.substring(0,4) === "data"){
  alert(1);
  return (
    <Link to={"/deal/" + this.props.data._id}><img className="dealImg" src={this.props.data.imagePath} /></Link>
  );
}
else{
  return (
    <Link to={"/deal/" + this.props.data._id}><img className="dealImg" src={'../' + this.props.data.imagePath} /></Link>
  );
}*/

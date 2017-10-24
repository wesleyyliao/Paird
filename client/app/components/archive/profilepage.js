import React from 'react';
import ProfileWidget from '../components/profilewidget';

export default class Profile extends React.Component{
  render(){
    return(
      <div className="profile-padding">
        <ProfileWidget />
      </div>
  );
  }
}

import React from 'react';
import {Link} from 'react-router';


export default class EditProfile extends React.Component{
  handlePrivacy(text, id){
    document.getElementById("privacy-text"+id).innerHTML = text;
  }
  render(){
    return(
      <div>
      <div className="profile-container">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-8">
              <center><h5>Editing Profile . . .</h5></center>
          </div>
          <div className="col-md-2">
          </div>
        </div>
        <div className="profile">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-4">
              <div className="profile-details">
                <div className="row">
                  <div className="col-md-5">
                    <div className="profile-edit-details-left profile-top">
                      <img align="left" src="../img/profilepicture.jpg" />
                      <label className="control-label">Select File for Profile Picture</label>
                      <input id="input-4" name="input4[]" type="file" multiple className="file-loading" />
                    </div>
                  </div>
                  <br></br>
                  <div className="col-md-5 pull-right">
                    <table className="profile-edit-details-table">
                      <tr>
                        <td>
                          Name:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="John Hopkins"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text1">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "1")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "1")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "1")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Username:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="jhopkins03"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text2">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "2")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "2")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "2")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Email Address:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="jhopkins@gmail.com"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text3">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "3")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "3")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "3")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Date Of Birth:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="01/02/1903"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text4">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "4")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "4")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "4")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Gender:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="Male"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text5">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "5")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "5")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "5")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Phone Number:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="(987)-654-3210"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text6">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "6")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "6")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "6")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Location:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder="Amherst"></input>
                        </td>
                        <td>
                          <div className="privacy-options">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span id="privacy-text7">Everyone</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu pull-right">
                              <li><a onClick={() => this.handlePrivacy("Everyone", "7")}>Everyone</a></li>
                              <li><a onClick={() => this.handlePrivacy("Friends Only", "7")}>Friends Only</a></li>
                              <li><a onClick={() => this.handlePrivacy("Only Me", "7")}>Only Me</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Password:
                        </td>
                        <td>
                          <input type="text" className="form-control" placeholder=""></input>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
            </div>
          </div>
        </div>
      </div>

      <div className="profile-widget">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <ul className="nav nav-pills pill-widgets">
                <li role="presentation" className= "active"><a>Shipping & Payment</a></li>
              </ul>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="col-md-12">
                     <h5>Shipping Address</h5>
                     <br></br>
                     <div className= "row">
                       <div className="col-md-3">
                         <table className= "profile-edit-details-table">
                           <tr>
                             <td>
                               Address: &nbsp;&nbsp;&nbsp;
                             </td>
                             <td>
                               <input type="text" className="form-control" placeholder="Mall Outlets inc. 123 Happy Street"></input>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               City:
                             </td>
                             <td>
                               <input type="text" className="form-control" placeholder="San Diego"></input>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               State:
                             </td>
                             <td>
                               <input type="text" className="form-control" placeholder="CA"></input>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               Zipcode:
                             </td>
                             <td>
                               <input type="text" className="form-control" placeholder="92103"></input>
                             </td>
                           </tr>
                         </table>
                       </div>
                     </div>
                     <hr></hr>
                     <h5>Billing Address</h5>
                     <br></br>
                       <div className= "row">
                         <div className="col-md-3">
                           <table className= "profile-edit-details-table">
                             <tr>
                               <td>
                                 Address:&nbsp;&nbsp;&nbsp;
                               </td>
                               <td>
                                 <input type="text" className="form-control" placeholder="5844 South Oak Street"></input>
                               </td>
                             </tr>
                             <tr>
                               <td>
                                 City:
                               </td>
                               <td>
                                 <input type="text" className="form-control" placeholder="San Diego"></input>
                               </td>
                             </tr>
                             <tr>
                               <td>
                                 State:
                               </td>
                               <td>
                                 <input type="text" className="form-control" placeholder="CA"></input>
                               </td>
                             </tr>
                             <tr>
                               <td>
                                 Zipcode:
                               </td>
                               <td>
                                 <input type="text" className="form-control" placeholder="92105"></input>
                               </td>
                             </tr>
                           </table>
                         </div>
                       </div>
                       <hr></hr>
                       <h5>Payment Information</h5>
                       <br></br>
                         <div className= "row">
                           <div className="col-md-3">
                             <table className= "profile-edit-details-table">
                               <tr>
                                 <td>
                                   First Name:
                                 </td>
                                 <td>
                                   <input type="text" className="form-control" placeholder="John"></input>
                                 </td>
                               </tr>
                               <tr>
                                 <td>
                                   Last Name:
                                 </td>
                                 <td>
                                   <input type="text" className="form-control" placeholder="Hopkins"></input>
                                 </td>
                               </tr>
                               <tr>
                                 <td>
                                   Card Number:
                                 </td>
                                 <td>
                                   <input type="text" className="form-control" placeholder="XXX-XXXX-XXXX-5567"></input>
                                 </td>
                               </tr>
                               <tr>
                                 <td>
                                   Security Code:
                                 </td>
                                 <td>
                                   <input type="text" className="form-control" placeholder="XXX"></input>
                                 </td>
                               </tr>
                               <tr>
                                 <td>
                                   Expiration Date:
                                 </td>
                                 <td>
                                   <input type="text" className="form-control" placeholder="10/99"></input>
                                 </td>
                               </tr>
                             </table>
                           </div>
                         </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="col-md-2"></div>
             </div>
           </div>
           <div className="profile-save">
             <div className="row">
               <div className="col-md-2">
               </div>
               <div className="col-md-8">
                 <center>
                   <Link to={"/profilePage/"}><button className = "btn btn-default navbar-btn">Save Settings</button></Link>
                 </center>
               </div>
               <div className="col-md-2">
               </div></div>
             </div>
           </div>
         );
  }
}

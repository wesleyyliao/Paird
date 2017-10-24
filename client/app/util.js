/** Converts unix time to a string in the local time zone **/
export function unixTimeToString(time) {
  //var myDate = new Date(time*1000).toGMTString();
  //return (myDate.toLocaleString());
  var date = new Date(time*1000); //May need to change to support millisecond input only
  var days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var weekDay = days[date.getDay()];
  var day = date.getDate();
  var month = months[date.getMonth()];
  var hours = date.getHours();
  var ampm = "AM";
  var today = new Date();
  var diffDays = (today.getTime()-date.getTime())/(1000*60*60*24);
  if(hours>12){
    hours = hours-12;
    ampm = "PM";
  }
  if(Math.round(diffDays) == 0){
    return ("Today at " + hours + ampm);
  }
  if(Math.round(diffDays) == 1){
    return ("Yesterday at " + hours + ampm);
  }
  else{
    return ("on " + weekDay + ", " + month + " " + day + "," + " at " + hours + ampm);
  }
}

export function calculateExpirationDay(time){
  var expDate = new Date(time*1000);
  var timeInDay = 1000*60*60*24; //Num millisecs in a single day
  var timeInHour = 1000*60*60;
  var currentDate = new Date();
  var diff = (expDate.getTime() - currentDate.getTime());
  var diffDays = diff/timeInDay;
  var diffHours = diff/timeInHour;
  if(diffDays>2){ //Give 48 hour countdown
    return ("Expires in " + Math.round(diffDays) + " days");
  }
  if(diffDays<=0){
    return("Deal has expired");
  }
  if((diffDays>0) && (diffDays<2)){
    return("Deal expires in " + Math.round(diffHours) + " hours")
  }

}

/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}

// TODO: UNHARDCODE
/**
 * Grab 6 random IDs from a collection of IDs.
 */
export function sixRandomIDs() {
  return ["000000000000000000000005", "000000000000000000000007", "000000000000000000000001", "000000000000000000000002", "000000000000000000000003", "000000000000000000000004"];
}

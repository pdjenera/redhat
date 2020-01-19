import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

import './countdown.html';
import './countdown.js';

import './laptimes.html';
import './laptimes.js';

Template.main.helpers({
  isCountdown() {
    return Session.get('isCountdown');
  },
});

Template.main.events({
  'keypress input': function(event) {
    if (event.keyCode == 13) {
      alert('you hit enter');
      event.stopPropagation();
      return false;
    }
  }
});

Template.inputTime.events({
  'click #startTimer'(event, instance) {
      let hours = instance.find('#hrs').value;
      let minutes = instance.find('#min').value;
      let seconds = instance.find('#sec').value;

      let milliseconds = convertTimeToMilli(hours, minutes, seconds);

      if(milliseconds > 0 ){
        Session.set('countdown', milliseconds);
        Session.set('startTime', new Date().getTime());
        Session.set('isCountdown', true);
      } else {
        Bert.alert({
          message: "Can't start until the countdown is set!",
          type: 'warning',
          style: 'growl-top-right',
          icon: 'fas fa-exclamation-triangle'
        });
      }
  }
});

msToTime = function(duration) {
  let milliseconds = parseInt((duration%1000))
      , seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  let time = {'hours':hours, 'minutes': minutes, 'seconds': seconds, 'milliseconds': milliseconds}

  return time
}

function convertTimeToMilli(hours, minutes, seconds){
  let millihrs = hours*3600000;
  let millimin = minutes*60000;
  let millisec = seconds*1000;
  let total = millihrs + millimin + millisec;

  return total;
}

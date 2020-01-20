import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

import './countdown.html';
import './countdown.js';

import './laptimes.html';
import './laptimes.js';

import './infomodal.html';
import './infomodal.js';

Template.main.helpers({
  isCountdown() {
    return Session.get('isCountdown');
  },
});

Template.main.onCreated(function(){
  $(window).on("keydown",function(e) {
    if (e.keyCode == 32) {
      recordLap();
    }
    if (e.keyCode == 8) {
      deleteLap();
    }
  });

  Session.set("setTime", localStorage.getItem("setTime"));
  Session.set("countdown", localStorage.getItem("countdown"));
  Session.set("startTime", JSON.parse(localStorage.getItem("startTime")));
  Session.set("isCountdown", JSON.parse(localStorage.getItem("isCountdown")));
  Session.set("play", localStorage.getItem("play"));
  Session.set('pauseTimeTotal', localStorage.getItem("pauseTimeTotal"));
  Session.set('currentTime', localStorage.getItem("currentTime"));
  Session.set('pauseTime', localStorage.getItem("pauseTime"));

  let laps = (localStorage.getItem("lapTimes")) ? JSON.parse(localStorage.getItem("lapTimes")) : [];
  Session.set("lapTimes", JSON.stringify(laps));

});

Template.main.onRendered(function () {
  $('#info-modal').modal();
});

Template.inputTime.events({
  'click #startTimer'(event, instance) {
      let hours = instance.find('#hrs').value;
      let minutes = instance.find('#min').value;
      let seconds = instance.find('#sec').value;

      let milliseconds = convertTimeToMilli(hours, minutes, seconds);

      if(milliseconds > 0 ){

        localStorage.setItem('setTime', milliseconds);
        localStorage.setItem('countdown', milliseconds);
        localStorage.setItem('startTime', new Date().getTime());
        localStorage.setItem('isCountdown', true);
        localStorage.setItem('lapTimes', JSON.stringify([]));

        Session.set('setTime', milliseconds);
        Session.set('countdown', milliseconds);
        Session.set('startTime', new Date().getTime());
        Session.set('isCountdown', true);
        Session.set("lapTimes", JSON.stringify([]));
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

function deleteLap() {
  let laps = getLaps();
  laps.pop();
  Session.set('lapTimes', JSON.stringify(laps));
}

msToTime = function(duration) {
  let milliseconds = parseInt((duration%1000))
      , seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

  hours = (hours < 10 && hours >= 0) ? "0" + hours : hours;
  minutes = (minutes < 10 && minutes >= 0) ? "0" + minutes : minutes;
  seconds = (seconds < 10 && seconds >= 0) ? "0" + seconds : seconds;

  let time = {'hours':hours, 'minutes': minutes, 'seconds': seconds, 'milliseconds': milliseconds}

  return time
}

formatTime = function (time) {
  let timeObject = msToTime(time);
  let formattedTime = timeObject.hours + ":" + timeObject.minutes + ":" + timeObject.seconds + ":" + timeObject.milliseconds;
  return formattedTime;
};

formatAMPM = function (date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return strTime;
};

function convertTimeToMilli(hours, minutes, seconds){
  let millihrs = hours*3600000;
  let millimin = minutes*60000;
  let millisec = seconds*1000;
  let total = millihrs + millimin + millisec;

  return total;
}

import { Template } from 'meteor/templating';
import './main.js';

  Template.countdown.helpers({
    getTime() {
      let duration = Session.get('currentTime');
      return msToTime(duration);
    },

    getInterval() {
      return interval;
    }
  });

  Template.countdown.onCreated(function(){
    let startTime = Session.get('startTime');
    let interval = Meteor.setInterval(function(){
      let duration = Session.get('countdown');
      let timeNow = new Date().getTime();
      let difference = timeNow - startTime;
      Session.set('currentTime', duration - difference);
    }, 4, startTime);

    localStorage.setItem('interval', interval);
    localStorage.setItem('play', false);
    localStorage.setItem('pauseTimeTotal', 0);

    Session.set('interval', interval);
    Session.set('play', false);
    Session.set('pauseTimeTotal', 0);
  });

  Template.controls.helpers({
    playOrPause(){
      return Session.get('play');
    }
  });

  Template.controls.events({
    'click #stop'(event, instance) {
      let interval = Session.get('interval');
      Meteor.clearInterval(interval);
      $('#info-modal').modal('open');

      localStorage.setItem('stopTime', new Date().getTime());
      localStorage.setItem('isCountdown', false);

      Session.set('stopTime', new Date().getTime());
      Session.set('isCountdown', false);
    },

    'click #playpause'(event, instance) {
      let play = Session.get('play');
      if(play == false){
        let interval = Session.get('interval');
        let time = new Date().getTime();

        localStorage.setItem('pauseTime', time);
        localStorage.setItem('play', true);

        Session.set('pauseTime', time);
        Session.set('play', true);

        Meteor.clearInterval(interval);

      } else {
        let startTime = Session.get('startTime');
        setCountdown();

        let interval = Meteor.setInterval(function(){
          let duration = Session.get('countdown');
          let timeNow = new Date().getTime();
          let difference = timeNow - startTime;

          localStorage.setItem("currentTime", duration - difference);
          Session.set('currentTime', duration - difference);
        }, 4, startTime);
        Session.set('interval', interval);
        Session.set('play', false);
      }
    },

    'click #lap'(event, instance) {
        recordLap();
    }
  });

  recordLap = function() {
    if(!Session.get('play')){
      let timeNow = new Date().getTime();
      let laps = getLaps();

      let currentTime = Session.get('currentTime');
      let startTime = Session.get('setTime');
      let lapTime = {'currentTime':0, 'lapTime':0};

      if(!laps){
        laps =[];
      }

      if(laps.length === 0){
        lapTime.lapTime = startTime - currentTime;
        lapTime.currentTime = currentTime;
        laps.push(lapTime);
      } else {
        lapTime.lapTime = Math.abs((laps.reduce((a, b) => a + (b['lapTime'] || 0), 0) + currentTime) -  startTime);
        lapTime.currentTime = currentTime;
        laps.push(lapTime);
      }

      localStorage.setItem('lapTimes', JSON.stringify(laps));
      Session.set('lapTimes', JSON.stringify(laps));
    }
  }

  getLaps = function (){
    let laps = Session.get('lapTimes');
    laps = (laps) ? JSON.parse(laps) : [];
    return laps;
  };

  function setCountdown() {
    let duration = Session.get('countdown');
    let pauseTime = Session.get('pauseTime');
    let timeNow = new Date().getTime();
    let pauseDifference = timeNow - pauseTime;
    let totalPauseTime = Session.get('pauseTimeTotal');

    localStorage.setItem('pauseTimeTotal', totalPauseTime + pauseDifference);
    localStorage.setItem('countdown', duration + pauseDifference);
    Session.set('pauseTimeTotal', totalPauseTime + pauseDifference);
    Session.set('countdown', duration + pauseDifference);
  }

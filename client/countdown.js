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
    Session.set('interval', interval);
    Session.set('play', false);
    Session.set('pauseTimeTotal', 0);
    Session.set('lapTimes', []);
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
      Session.set('isCountdown', false);
      console.log(instance);
    },

    'click #playpause'(event, instance) {
      let play = Session.get('play');
      if(play == false){
        let interval = Session.get('interval');
        let time = new Date().getTime();
        Session.set('pauseTime', time);
        Meteor.clearInterval(interval);
        Session.set('play', true);

      } else {
        let startTime = Session.get('startTime');
        setCountdown();

        let interval = Meteor.setInterval(function(){
          let duration = Session.get('countdown');
          let timeNow = new Date().getTime();
          let difference = timeNow - startTime;
          Session.set('currentTime', duration - difference);
        }, 4, startTime);
        Session.set('interval', interval);
        Session.set('play', false);
      }
    },

    'click #lap'(event, instance) {
        let timeNow = new Date().getTime();
        let laps = Session.get('lapTimes');
        let duration = Session.get('countdown');
        let currentTime = Session.get('currentTime');
        let lapTime = {'currentTime':0, 'lapTime':0};

        if(laps.length === 0){
          lapTime.lapTime = duration - currentTime;
          lapTime.currentTime = currentTime;
          laps.push(lapTime);
        } else {
          let lastLapTime = laps[laps.length - 1].currentTime;
          lapTime.lapTime = (lastLapTime - currentTime);
          lapTime.currentTime = currentTime;
          laps.push(lapTime);
        }

        Session.set('lapTimes',laps);


    }
  });

  function setCountdown() {
    let duration = Session.get('countdown');
    let pauseTime = Session.get('pauseTime');
    let timeNow = new Date().getTime();
    let pauseDifference = timeNow - pauseTime
    let totalPauseTime = Session.get('pauseTimeTotal');
    Session.set('pauseTimeTotal', totalPauseTime + pauseDifference);
    Session.set('countdown', duration + pauseDifference);
  }

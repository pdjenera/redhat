Template.infomodal.events({
  "click #ok-button":function(){
    $('#info-modal').modal('close');
  }
});

Template.infomodal.helpers({
  lapTimes(){
    let lapTimes = Session.get('lapTimes');
    if(lapTimes.length > 0){
      let maxIndex = indexOfMax(lapTimes);
      let minIndex = indexOfMin(lapTimes);
      lapTimes[maxIndex].max = true;
      lapTimes[minIndex].min = true;
    }

    return lapTimes;
  },

  formatTime(time){
    return formatTime(time);
  },

  getStartTime(){
    let startTime = Session.get('startTime');
    let date = new Date(startTime)
    return formatAMPM(date);
  },

  getEndTime(){
    let startTime = Session.get('stopTime');
    let date = new Date(startTime)
    return formatAMPM(date);
  },

  getDuration(){
    let duration = Session.get('countdown');
    let pauseTime = Session.get('pauseTimeTotal')
    let currentTime = Session.get('currentTime');
    let totalTime = duration - currentTime - pauseTime;
    return formatTime(totalTime);
  },

  getPauseTime(){
    let pauseTime = Session.get('pauseTimeTotal')
    if(pauseTime > 0){
      return formatTime(pauseTime);
    } else {
      return "00:00:00:000";
    }
  },
})

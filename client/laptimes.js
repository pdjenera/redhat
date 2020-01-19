import { Template } from 'meteor/templating';
import './main.js';

Template.lapInfo.helpers({
  lapTimes:function(){
    let lapTimes = Session.get('lapTimes');
    let maxIndex = indexOfMax(lapTimes);
    let minIndex = indexOfMin(lapTimes);
    lapTimes[maxIndex].max = true;
    lapTimes[minIndex].min = true;

    return lapTimes;
  },

  formatTime: function(time){
    let timeObject = msToTime(time.lapTime);
    let formattedTime = timeObject.hours + ":" + timeObject.minutes + ":" + timeObject.seconds + ":" + timeObject.milliseconds;
    return formattedTime;
  }
});

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0].lapTime;
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i].lapTime > max) {
          maxIndex = i;
          max = arr[i].lapTime;
      }
  }

  return maxIndex;
}

function indexOfMin(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var min = arr[0].lapTime;
  var minIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i].lapTime < min) {
          minIndex = i;
          min = arr[i].lapTime;
      }
  }

  return minIndex;
}

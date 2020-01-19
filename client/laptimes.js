import { Template } from 'meteor/templating';
import './main.js';

Template.lapInfo.helpers({
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
  }
});

indexOfMax = function (arr) {
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
};

indexOfMin = function(arr) {
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
};

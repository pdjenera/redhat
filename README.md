# Timer Application
This app is a simple countdown timer. As a user you can set the time you wish to count down by. Note this timer will not stop when you have reached the end of the time that you have set. It will continue counting into negative digits until you stop the timer.

#### Additional functionality

* Stop - This stops the countdown timer and allows you to set a new time. Once you press the stop button you will see a modal with all the stats of your timer. This will include laps, duration, start time, stop time and total time paused.

* Play / Pause - The user can pause their timer and resuming by hitting the button in the middle.

* Laps - The user can use the laps button beside the play / pause control to record lap times as the countdown timer is running. Your fastest lap is highlighted with a green text color, while your slowest lap is highlighted in red.

NOTE: All values when the timer is running are cached locally and will not be reset until you stop the timer.

### Setup

First to run this project you will need to have Node.js and npm installed. If you don't have those the download is available here https://nodejs.org/en/

Next clone the https://github.com/pdjenera/redhat to a directory of your choice.

Lastly navigate to redhat-master directory the you just cloned and install meteor with the following command

Windows: ```choco install meteor```
Mac: ```curl https://install.meteor.com/ | sh```

Lastly run : ```meteor npm install```

Followed by : ```meteor```

The application will build and then be available at localhost:3000

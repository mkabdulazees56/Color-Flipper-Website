const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');


//setting 10days from dealine when reload 

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();


const futureDate = new Date(tempYear,tempMonth,tempDay+10,12,30,0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

let weekday = futureDate.getDay();
weekday = weekdays[weekday];

giveaway.textContent = `Giveaway Ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}`;

// future Date in milli seconds 

const futureTime = futureDate.getTime();


function getRemaindingTime(){
  // current date in milli seconds 
    const currentTime = new Date().getTime();
    const remTime = futureTime - currentTime;
    
    // values in ms 

    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    let days = Math.floor(remTime / oneDay);
    let hours = Math.floor((remTime % oneDay)/ oneHour);
    let minutes = Math.floor(remTime % oneHour / oneMinute);
    let seconds = Math.floor(remTime % oneMinute / 1000);

    // set values to array 
    const values = [days,hours,minutes,seconds];

    //if values less than two digits set zero before the digit

    function format(item){
      if(item<10){
        return (item = `0${item}`)
      }
      return item;
    }

    items.forEach(function(item,index){

        item.innerHTML = format(values[index]);

    });

    if(remTime<0){
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class= "expired" > Sorry this giveaway is expired </h4>`;
    }

  };

//calling countdown funtion every secn 
let countdown = setInterval(getRemaindingTime, 1000);
//set initial values
getRemaindingTime();


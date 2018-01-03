let Seconds;
let sandbottom = 0;
let countdown;
let audio = new Audio('https://raw.githubusercontent.com/spencerj171/codepen/master/applause4.mp3');

function setup(){
  createCanvas(windowWidth/3, 500);
}

function draw(){
  sandtop = Seconds;
  background(44, 62, 80);

  drawHourGlass();
  fillHourGlass();
}

function drawHourGlass(){
  push();
  translate(width/3, height/10);
  fill(255);
  strokeWeight(2);
  triangle(100, 200, 0, 0, 200, 0);
  triangle(100, 200, 0, 400, 200, 400);
  fill(50);
  strokeWeight(5);
  rect(0, 0, 200, 25);
  rect(0, 375, 200, 25);
  pop();
}

function fillHourGlass(){
  if(sandtop > 1600){ sandtop = 1600 }
  if(sandbottom > 1600){ sandbottom = 1600 }

  push();
    translate(width/3, height/10);
    fill(255, 0, 255, 100);
    strokeWeight(2);
    triangle(100, 200, 100 - (sandtop / 20), 200 - (sandtop / 10), 100 + (sandtop / 20), 200 - (sandtop / 10));
  pop();
  push();
    translate(width/2.8, height/1.18);
    fill(255, 0, 255, 100);
    strokeWeight(2);
    quad(0, 0, 0 + (sandbottom / 20), 0 - (sandbottom / 10), 171 - (sandbottom / 20), 0 - (sandbottom / 10), 171, 0);
  pop();
}

const buttons = document.querySelectorAll('[data-time]');

function timer(x){
  let tHours = 0;
  let tMinutes = 0;
  let tSeconds = x;

  let cTime = new Date();
  let cHours = cTime.getHours();
  let cMinutes = cTime.getMinutes();
  let cSeconds = cTime.getSeconds();

  //Convert time
  if(cHours > 12){
    cHours = cHours % 12;
  }
  if(tSeconds > 59){
    tMinutes = Math.floor(tSeconds / 60);
    tSeconds = Math.floor(tSeconds % 60);
  }
  if(tMinutes >= 60){
    tHours = Math.floor(tMinutes / 60);
    tMinutes = Math.floor(tMinutes % 60);
  }
  if(tSeconds < 10){
    tSeconds = '0' + tSeconds;
  }
  if(tMinutes < 10){
    tMinutes = '0' + tMinutes;
  }

  //Display time left
  if(tHours >= 1){
    $('.timeLeft').text(`${tHours}:${tMinutes}:${tSeconds}`);
  } else{
    $('.timeLeft').text(`${tMinutes}:${tSeconds}`);
  }

  //display end time
  let eHours = cHours + tHours;
  if(eHours > 12){ eHours = eHours % 12 }
  let eMinutes = cMinutes + Number(tMinutes);
  if(eMinutes >= 60){
    eHours = eHours + Math.floor(eMinutes / 60);
    eMinutes = eMinutes % 60;
  }
  if(eMinutes < 10){
    eMinutes = '0' + eMinutes;
  }
  let eSeconds = cSeconds + Number(tSeconds);

  if(tMinutes == 5){
    $('.endTime').text(`Be Back At ${eHours}:${eMinutes}`);
  }
  else{

    $('.endTime').text(`Study Until ${eHours}:${eMinutes}`);
  }
  if(Seconds == 0){
    clearInterval(countdown);
    audio.play();
  }
  if(Seconds > 0){
    Seconds--;
    sandbottom += 1;
  }
}

function getPeriod(){
  clearInterval(countdown);
  const seconds = parseInt(this.dataset.time);
  Seconds = seconds;
  sandCount = seconds;
  countdown = setInterval(() => timer(Seconds), 1000);
}

buttons.forEach(button => button.addEventListener('click', getPeriod));

$('#custom').on('submit', function(e){
  e.preventDefault();
  clearInterval(countdown);
  const mins = this.minutes.value;
  Seconds = mins * 60;
  this.reset();
  countdown = setInterval(() => timer(Seconds), 1000);
});

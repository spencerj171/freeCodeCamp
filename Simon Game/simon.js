let audio0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
let audio4 = new Audio('https://raw.githubusercontent.com/spencerj171/codepen/master/wrong.wav');

let audios = [audio0, audio1, audio2, audio3];


const buttons = document.querySelectorAll('[data-id]');
let pattern = [];
let pcount = 0;
let ccount = 0;
let tries = 0;
let power = false;
let strict = false;


function next(){
  tries = 0;
  let next = Math.floor(Math.random() * 4);
  pattern.push(next);
  return playPattern();
}

function playPattern(){
  $('.count').text(`Count: ${pattern.length}`);

  setTimeout(function(){
    if(pcount < pattern.length){
      show(pattern[pcount]);
      pcount++;
      return playPattern();
    } else{
      show(pattern[pcount]);
      pcount = 0;
    }
  }, 1000);
}

function check(val){
  if(ccount === 20){
    $('.gameover').text("Winner, Winner, Chicken Dinner!");
    setTimeout(function(){
      $('.start').click();
    }, 2000);
  }
  if(ccount === pattern.length){
    ccount = 0;
    return next();
  } else if(val === pattern[ccount]){
    audios[val].play();
    ccount++;
    return check();
  }
}

function checkIfWrong(val){
  if(strict){
    if(val !== pattern[ccount]){
      audio4.play();
      $('.gameover').text("Starting over...");
      setTimeout(function(){
        $('.start').click();
      }, 2000);
    } else{
      return check(val);
    }
  } else{
    if(val !== pattern[ccount] && tries === 1){
      audio4.play();
      $('.gameover').text("Starting over...");
      setTimeout(function(){
        $('.start').click();
      }, 2000);
    } else if(val !== pattern[ccount]){
      audio4.play();
      ccount = 0;
      tries++;
      return playPattern();
    } else{
      return check(val);
    }
  }
}

function show(el){
  if(el === 0){
    $('.green').addClass('active');
    audio0.play();
    setTimeout(function(){
      $('.green').removeClass('active');
    }, 1000);
  } else if(el === 1){
    $('.red').addClass('active');
    audio1.play();
    setTimeout(function(){
      $('.red').removeClass('active');
    }, 1000);
  } else if(el === 2){
    $('.blue').addClass('active');
    audio2.play();
    setTimeout(function(){
      $('.blue').removeClass('active');
    }, 1000);
  } else if(el === 3){
    $('.yellow').addClass('active');
    audio3.play();
    setTimeout(function(){
      $('.yellow').removeClass('active');
    }, 1000);
  }
}

function getValue(){
  if(power){
    const val = parseInt(this.dataset.id);
    checkIfWrong(val);
  }
}

buttons.forEach(button => button.addEventListener('click', getValue));

$("button").hover(function(){
  if(power){
    $(this).addClass('active');
  }
});

$("button").mouseout(function(){
  $(this).removeClass('active');
});

$(".start").on("click", () =>{
  if(power){
    $('.gameover').text("");
    pattern = [];
    ccount = 0;
    pcount = 0;
    tries = 0;
    return next();
  }
});

$('.power').on('click', function(){
  power = !power;
});

$('.strict').on('click', function(){
  if(power){
    strict = !strict;
    strict ? $('.sm').text("Strict Mode: On") : $('.sm').text("Strict Mode: Off");
  }
  $('.start').click();
});

//Keypad functionality not 100% working yet

$(document).ready(function(){
  runCalc();
  //keypad();
});

//clicks
function runCalc(){
  var equation = [];
  $('#zero').on('click', function(){
    equation.push('0');
    $('#screen').text(equation.join(''));
  });
  $('#one').on('click', function(){
    equation.push('1');
    $('#screen').text(equation.join(''));
  });
  $('#two').on('click', function(){
    equation.push('2');
    $('#screen').text(equation.join(''));
  });
  $('#three').on('click', function(){
    equation.push('3');
    $('#screen').text(equation.join(''));
  });
  $('#four').on('click', function(){
    equation.push('4');
    $('#screen').text(equation.join(''));
  });
  $('#five').on('click', function(){
    equation.push('5');
    $('#screen').text(equation.join(''));
  });
  $('#six').on('click', function(){
    equation.push('6');
    $('#screen').text(equation.join(''));
  });
  $('#seven').on('click', function(){
    equation.push('7');
    $('#screen').text(equation.join(''));
  });
  $('#eight').on('click', function(){
    equation.push('8');
    $('#screen').text(equation.join(''));
  });
  $('#nine').on('click', function(){
    equation.push('9');
    $('#screen').text(equation.join(''));
  });
  $('#ac').on('click', function(){
    equation = [];
    $('#screen').text(equation);
  });
  $('#ce').on('click', function(){
    equation = [];
   $('#screen').text(equation);
  });
  $('#back').on('click', function(){
    equation.pop();
    $('#screen').text(equation.join(''));
  });
  $('#divide').on('click', function(){
    equation.push('/');
    $('#screen').text(equation.join(''));
  });
  $('#mult').on('click', function(){
    equation.push('*');
    $('#screen').text(equation.join(''));
  });
  $('#sub').on('click', function(){
    equation.push('-');
    $('#screen').text(equation.join(''));
  });
  $('#add').on('click', function(){
    equation.push('+');
    $('#screen').text(equation.join(''));
  });
  $('#equal').on('click', function(){
    equation = equation.join('');
    var result = eval(equation);
    equation = [result];
    $('#screen').text(result);
  });
  $('#dec').on('click', function(){
    equation.push('.');
    $('#screen').text(equation.join(''));
  });
}

//keypad
//function keypad(){
  $(document).keydown(function(e) {
    if(e.which === 13) {
      $('#equal').click();
    }
    if(e.which === 96) {
      $('#zero').click();
    }
    if(e.which === 97) {
      $('#one').click();
    }
    if(e.which === 98) {
      $('#two').click();
    }
    if(e.which === 99) {
      $('#three').click();
    }
    if(e.which === 100) {
      $('#four').click();
    }
    if(e.which === 101) {
      $('#five').click();
    }
    if(e.which === 102) {
      $('#six').click();
    }
    if(e.which === 103) {
      $('#seven').click();
    }
    if(e.which === 104) {
      $('#eight').click();
    }
    if(e.which === 105) {
      $('#nine').click();
    }
    if(e.which === 106) {
      $('#mult').click();
    }
    if(e.which === 107) {
      $('#add').click();
    }
    if(e.which === 109) {
      $('#sub').click();
    }
    if(e.which === 110) {
      $('#dec').click();
    }
    if(e.which === 111) {
      $('#divide').click();
    }
  });
//}

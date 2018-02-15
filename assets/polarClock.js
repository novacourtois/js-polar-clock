;(function(){
  var polar_clock_canvas = document.createElement("canvas");
  var ctx = polar_clock_canvas.getContext("2d");
  polar_clock_canvas.width = document.getElementById('wrapper').clientWidth;
  polar_clock_canvas.height = document.getElementById('wrapper').clientHeight;
  document.getElementById("wrapper").appendChild(polar_clock_canvas);

  if(polar_clock_canvas.width > polar_clock_canvas.height)
      polar_clock_canvas.width = polar_clock_canvas.height;
  if(polar_clock_canvas.height > polar_clock_canvas.width)
      polar_clock_canvas.height = polar_clock_canvas.width;

  var arcColor = [
    '#efe0f9',
    '#d9f1fe',
    '#c8fdcc',
    '#faf8ce',
    '#fed4bc',
    '#f6b9c7'
  ];

  function clock(){
    var now = new Date();
    ctx.save();
    ctx.clearRect(0,0,polar_clock_canvas.width,polar_clock_canvas.height);
    ctx.lineWidth = 7;
    ctx.lineCap = "butt";
    
    var milliSec = now.getMilliseconds();         
    var sec = now.getSeconds();
    sec = milliSec/1000+sec;
    var min = now.getMinutes();
    min = sec/60 + min;
    
    var hr  = now.getHours();
    hr = hr>=12 ? hr-12 : hr;
    hr = min/60 + hr;
    var dow = now.getDay() + 1;
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var hrpm = hr;
    if (hrpm > 12)
        hrpm -= 12;
    
    ctx.fillStyle = '#fff';
    ctx.font = "42px 'Share Tech Mono'";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    var minPad, secPad;

    if(Math.floor(min) < 10) { minPad = "0"+Math.floor(min);  }
    else { minPad = Math.floor(min); }
    if(Math.floor(sec) < 10) { secPad = "0"+Math.floor(sec);  }
    else { secPad = Math.floor(sec); }


    var hrpmPad = hrpm;
    if (hrpm < 1) {
        hrpmPad = 12;
    }
    else if (Math.floor(hrpm) < 10) {
        hrpmPad = "0"+Math.floor(hrpm);
    }
    else {
      hrpmPad = Math.floor(hrpm);
    }

    ctx.fillText(hrpmPad+":"+minPad+":"+secPad, polar_clock_canvas.width/2, polar_clock_canvas.height/2 - 24);

    ctx.rotate(-Math.PI/2);
    
    var secPer = sec/60;
    var minPer = min/60;
    var hrPer = hr/12;
    var dowPer = dow/7;
    var monthPer = month/12;
    var dayPer = 0;
    var year = new Date().getFullYear();
    
    if (month == 2){
      isLeap = new Date(year, 1, 29).getMonth() == 1;
      if(isLeap)
        dayPer = day/29;
      else
        dayPer = day/28;
    }
    else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
      dayPer = day/31;
    }
    else {
      dayPer = day/30;
    }
    
    writeTime(ctx,polar_clock_canvas.width/3 + 0,monthPer,0);
    writeTime(ctx,polar_clock_canvas.width/3 + 15,dayPer,1);
    writeTime(ctx,polar_clock_canvas.width/3 + 30,dowPer,2);
    writeTime(ctx,polar_clock_canvas.width/3 + 45,hrPer,3);
    writeTime(ctx,polar_clock_canvas.width/3 + 60,minPer,4);
    writeTime(ctx,polar_clock_canvas.width/3 + 75,secPer,5);
     
    ctx.restore();
  }
      
  function writeTime(ctx,radius,per, index){
    ctx.save();
    ctx.strokeStyle = arcColor[index]; 
    ctx.beginPath();
    var x,y;

    drawArc(ctx,-polar_clock_canvas.width/2,polar_clock_canvas.height/2,radius,per);
    ctx.stroke();
    ctx.restore();  
  }

  function drawArc(ctx,x,y,rad,per){
    ctx.arc(x,y,rad,0,per*(Math.PI*2),false);
    return ctx;
  }

  var intervalID = setInterval(clock, 1000); 

  function resize() {
    polar_clock_canvas.width = document.getElementById('wrapper').clientWidth;
  polar_clock_canvas.height = document.getElementById('wrapper').clientHeight;
  if(polar_clock_canvas.width > polar_clock_canvas.height)
      polar_clock_canvas.width = polar_clock_canvas.height;
  if(polar_clock_canvas.height > polar_clock_canvas.width)
      polar_clock_canvas.height = polar_clock_canvas.width;
  }

  window.addEventListener('resize', resize, false);
})();
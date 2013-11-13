var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth -20;
canvas.height = window.innerHeight -20;
document.body.appendChild(canvas);

if(canvas.width > canvas.height)
    canvas.width = canvas.height;
if(canvas.height > canvas.width)
    canvas.height = canvas.width;

var arcColor = ['rgba(0,255,0,1)',
               'rgba(253,105,0,1)',
               'rgba(35,232,183,1)',
               'rgba(230,11,66,1)',
               'rgba(252,219,0,1)',                
               'rgba(255,255,255,1)'];

function clock(){
    var now = new Date();
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 10;
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
    
    ctx.fillStyle = '#ccc';
    ctx.font = "42px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(Math.floor(hrpm)+" : "+Math.floor(min)+" : "+Math.floor(sec), canvas.width/2, canvas.height/2 + 24);
   
    ctx.fillText("JavaScript Polar Clock",canvas.width/2, canvas.height/2 - 24);


    ctx.font = "12px Georgia";
    ctx.textAlign = "left";

    ctx.fillStyle = arcColor[5];
    ctx.fillText("Seconds",0, 0);

    ctx.fillStyle = arcColor[4];
    ctx.fillText("Minutes",0, 14);

    ctx.fillStyle = arcColor[3];
    ctx.fillText("Hour",0, 28);

    ctx.fillStyle = arcColor[2];
    ctx.fillText("Day of week",0, 42);

    ctx.fillStyle = arcColor[1];
    ctx.fillText("Day of month",0, 56);

    ctx.fillStyle = arcColor[0];
    ctx.fillText("Month",0, 70);

    ctx.rotate(-Math.PI/2);
    
    var secPer = sec/60;
    var minPer = min/60;
    var hrPer = hr/12;
    var dowPer = dow/7;
    var monthPer = month/12;
    var dayPer = 0;
    
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
    
    writeTime(ctx,canvas.width/3 + 0,monthPer,0);
    writeTime(ctx,canvas.width/3 + 15,dayPer,1);
    writeTime(ctx,canvas.width/3 + 30,dowPer,2);
    writeTime(ctx,canvas.width/3 + 45,hrPer,3);
    writeTime(ctx,canvas.width/3 + 60,minPer,4);
    writeTime(ctx,canvas.width/3 + 75,secPer,5);
     
    ctx.restore();
}
    
function writeTime(ctx,radius,per, index){
    ctx.save();
    ctx.strokeStyle = arcColor[index]; 
    ctx.beginPath();
    drawArc(ctx,-canvas.width/2,canvas.height/2,radius,per);
    ctx.stroke();
    ctx.restore();  
}

function drawArc(ctx,x,y,rad,per){
    ctx.arc(x,y,rad,0,per*(Math.PI*2),false);
    return ctx;
}

setInterval(clock, 1); 
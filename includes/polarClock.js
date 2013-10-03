function clock(){
        
	var now = new Date();
    
    var ctx = document.getElementById('clockCanvas').getContext('2d');
    		
    ctx.save();
    ctx.clearRect(0,0,400,400);
    ctx.translate(200,200);
	
    ctx.scale(2,2);
	
    ctx.lineWidth = 6;
    
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
	var hrpm = hr; if (hrpm > 12) { hrpm -= 12; }
	
	ctx.fillText("Hour:  " + Math.floor(hrpm),-95,95);
	ctx.fillText("Minutes:  " + Math.floor(min),-40,95);
	ctx.fillText("Seconds:  " +  Math.floor(sec),35,95);
	ctx.fillText(" JavaScript Polar Clock", -55,-85);
   
	ctx.rotate(-Math.PI/2);
	
    var secPer = sec/60;
    var minPer = min/60;
			var hrPer = hr/12;
    var dowPer = dow/7;
    var monthPer = month/12;
    var dayPer = 0;
    
    if (month == 2){
        dayPer = day/29;
    }
    else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        dayPer = day/31;
    }
    else {
        dayPer = day/30;
    }   
    
    writeTime(ctx,20,monthPer,0);
    writeTime(ctx,30,dayPer,1);
    writeTime(ctx,40,dowPer,2);
    writeTime(ctx,50,hrPer,3);
    writeTime(ctx,60,minPer,4);
    writeTime(ctx,70,secPer,5);
	 
    ctx.restore();
}
    
function writeTime(ctx,radius,per, index){
    ctx.save();
    ctx.strokeStyle = getShade(index); //calculateColor(per);
    ctx.beginPath();
    drawArc(ctx,0,0,radius,per);
    ctx.stroke();
    ctx.restore();  
}   

function getShade(index){
   if (index==0) { result ='rgba(156,255,0,1)'; } //
	else if(index==1){ result ='rgba(156,255,0,.85)'; } //
	else if(index==2){ result ='rgba(156,255,0,.7)'; }
	else if(index==3){ result ='rgba(156,255,0,.55)'; }
	else if(index==4){ result ='rgba(156,255,0,.40)'; } //
	else if(index==5){ result ='rgba(156,255,0,.25)'; } //
	return result;
}

function drawArc(ctx,x,y,rad,per){
    ctx.arc(x,y,rad,0,per*(Math.PI*2),false);
    return ctx;
}

setInterval(clock,75);
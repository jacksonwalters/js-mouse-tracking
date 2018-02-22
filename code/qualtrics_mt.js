<!-- 
    Copyright 2018 Jackson Walters
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

Qualtrics.SurveyEngine.addOnload(function()
{
/*Place Your Javascript Below This Line*/

Qualtrics.SurveyEngine.addOnPageSubmit(function(type)
{
	if(type == "next")
	{
		
		clearTimeout(t);
 		timer_is_on=0;
		
		Qualtrics.SurveyEngine.setEmbeddedData("xPos", delayedXPos.join());
  		Qualtrics.SurveyEngine.setEmbeddedData("yPos", delayedYPos.join());
  		Qualtrics.SurveyEngine.setEmbeddedData("time", delayedTime.join());
	}
});

});


document.onmousemove = getMousePosition; //set document to record mouse position

//initialize arrays
var delayedXPos = new Array();
var delayedYPos = new Array();
var delayedTime = new Array();

var xPos = new Array();
var yPos = new Array();

//initialize time variables
var initTime = new Date().getTime();
var dt=10;
var timer_is_on=0;
var t;

//flag signaling whether getMousePosition has been called
mp_called = 0;

//function that determines action when mouse moves
function getMousePosition(mp) 
{
 var divPos = getPosition(document.getElementById("Questions"));
 xPos.push(mp.pageX - divPos[0]);
 yPos.push(mp.pageY - divPos[1]);
 mp_called = 1;
 return true;
}

function timedCount()
{
 if(mp_called){
   delayedXPos.push(xPos[xPos.length-1]);
   delayedYPos.push(yPos[yPos.length-1]);
   var timeInSec = (new Date().getTime()-initTime) / 1000.;
   delayedTime.push(timeInSec);
  }
  t=setTimeout("timedCount()",dt);
}

function doTimer()
{
 if (!timer_is_on)
 {
  initTime = new Date().getTime();
  timer_is_on=1;
  timedCount();
 }
}


function getPosition(obj){
    
var topValue= 0,leftValue= 0;
    
while(obj)
{
 leftValue+= obj.offsetLeft;
 topValue+= obj.offsetTop;
 obj= obj.offsetParent;
}
    
return [leftValue, topValue];
}

//start collecting data after page loads
document.onload = doTimer();
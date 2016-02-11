$(document).ready(function(){

	var countdownID;
	var second = 0;
	var minute = 0;
	var hour = 0;
	var totalTicks = 0;

	var start_btn = $("#start-btn");
	var pause_btn = $("#pause-btn");

	var second_fld = $("#second-fld");
	var minute_fld = $("#minute-fld");
	var hour_fld = $("#hour-fld");



	start_btn.click(function(){
		start();
	});
	pause_btn.click(function(){
		pause();
	});



	function get_time_fld_val(){

		second = second_fld.val();
		minute = minute_fld.val();
		hour = hour_fld.val();
		totalTicks = (360*hour)+(6*minute)+second; // I don't know why
	}



	function start(){

		get_time_fld_val();
		update_title();

		start_btn.hide();
		pause_btn.show();

		second_fld.prop('disabled', true);
		minute_fld.prop('disabled', true);
		hour_fld.prop('disabled', true);

		countdownID=window.setInterval(countdown,1000);
	}



	function pause(){

		start_btn.show();
		pause_btn.hide();

		second_fld.prop('disabled', false);
		minute_fld.prop('disabled', false);
		hour_fld.prop('disabled', false);

		clearInterval(countdownID);
	}



	function timesup(){

		// red flash
		$('body').css("background-color", "red");
		
		window.setTimeout(function(){
			$('body').css("background-color", "white");
		}, 300);
	}



	function countdown(){ 
	
		if(totalTicks <= 0){
			
			timesup();
			pause();
		} else {

			--totalTicks;
			--second;
			if(second < 0){
				--minute;
				second += 60;
				if(minute < 0){
					--hour;
					minute += 60;
				}
			}

			update_time_fld();
		}

		update_title();
	}



	function update_title(){
		if(hour == 0 && minute == 0 && second == 0){
			document.title = "Timer";
		} else {
			document.title = "Timer - "+hour+":"+minute+":"+second;
		}
	}



	function update_time_fld(){
		second_fld.val(second);
		minute_fld.val(minute);
		hour_fld.val(hour);
	}
});






////////////////////////////////////////////////////////////////////////////////////
// TODO: Better keyin
////////////////////////////////////////////////////////////////////////////////////
	// var workingDigit = 1;
	// var focusDigit = 1;


	// second_fld.focus(function(){
	// 	get_time_fld_val();
	// 	focusDigit = 1;
	// 	workingDigit = 1;
	// 	debug();
	// });
	// minute_fld.focus(function(){
	// 	get_time_fld_val();
	// 	focusDigit = 3;
	// 	workingDigit = 3;
	// 	debug();
	// });
	// hour_fld.focus(function(){
	// 	get_time_fld_val();
	// 	focusDigit = 5;
	// 	workingDigit = 5;
	// 	debug();
	// });



	// function getDigit(number, digit){
	// 	if(digit == 1){
	// 		if(number < 10)
	// 			return 0;
	// 		else
	// 			return parseInt(number.toString()[0]);
	// 	} else {
	// 		if(number < 10)
	// 			return parseInt(number.toString()[0]);
	// 		else
	// 			return parseInt(number.toString()[1]);
	// 	}
	// }



	// function pushDigits(){
	// 	switch(workingDigit){
	// 		case 1:
	// 			second = getDigit(second, 1)*10;
	// 			break;
	// 		case 2:
	// 			second = getDigit(second, 0)*10;
	// 			break;
	// 		case 3:
	// 			minute = getDigit(minute, 1)*10+getDigit(second, 1);
	// 			second = getDigit(second, 0)*10;
	// 			break;
	// 		case 4:
	// 			minute = getDigit(minute, 0)*10+getDigit(second, 1);
	// 			second = getDigit(second, 0)*10;
	// 			break;
	// 		case 5:
	// 			hour = getDigit(hour, 1)*10+getDigit(minute, 1);
	// 			minute = getDigit(minute, 0)*10+getDigit(second, 1);
	// 			second = getDigit(second, 0)*10;
	// 			break;
	// 		case 6:
	// 			hour = getDigit(hour, 0)*10+getDigit(minute, 1);
	// 			minute = getDigit(minute, 0)*10+getDigit(second, 1);
	// 			second = getDigit(second, 0)*10;
	// 			break;
	// 	}
	// 	if(workingDigit < 6)
	// 		++workingDigit;
	// }



	// second_fld.keyup(function(e){
	// 	debug();
	// 	keyinNumber(e);
	// 	dealWithOverflow();
	// 	update_time_fld();
	// });
	// minute_fld.keyup(function(e){
	// 	debug();
	// 	keyinNumber(e);
	// 	dealWithOverflow();
	// 	update_time_fld();
	// });
	// hour_fld.keyup(function(e){
	// 	debug();
	// 	keyinNumber(e);
	// 	dealWithOverflow();
	// 	update_time_fld();
	// });



	// function debug(){
	// 	$("#debug").html("workingDigit: " + workingDigit + " focusDigit: " + focusDigit);
	// }



	// function dealWithOverflow(){
	// 	if(hour > 23) hour = 23;
	// 	if(minute > 59) hour = 59;
	// 	if(second > 59) second = 59;
	// }



	// function keyinNumber(event){

	// 	var number = event.which-48; // keycode of 0

	// 	if(number >= 0 && number <= 9){
	// 		pushDigits();
	// 		switch(focusDigit){
	// 			case 1:
	// 				second += number;
	// 				break;
	// 			case 3:
	// 				minute += number;
	// 				break;
	// 			case 5:
	// 				hour += number;
	// 				break;
	// 		}
	// 	}
	// }

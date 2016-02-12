$(document).ready(function(){

	var countdownID;
	var confirmID;
	var second = 0;
	var minute = 25;

	var start_btn = $("#start-btn");
	var stop_btn = $("#stop-btn");
	var confirm_btn = $("#confirm-btn");

	var second_fld = $("#second-fld");
	var minute_fld = $("#minute-fld");

	var status_fld = $("#status-fld");

	var status = "stop";

	var timer = new interval(1000, function(){
		countdown();
	});


	start_btn.click(function(){
		start();
	});
	stop_btn.click(function(){
		stop_btn.hide();
		confirm_btn.show();
		confirmID = window.setTimeout(function(){
			stop_btn.show();
			confirm_btn.hide();
		}, 2000);
	});
	confirm_btn.click(function(){
		stop();
	});




	function start(){

		second = 0;
		minute = 25;

		start_btn.hide();
		stop_btn.show();
		confirm_btn.hide();
		clearTimeout(confirmID);

		status = "working";

		timer = new interval(1000, function(){
			countdown();
		});
		timer.run();
		// countdownID = window.setInterval(countdown,1000);
	}



	function takeBreak(){

		second = 0;
		minute = 5;

		start_btn.hide();
		stop_btn.show();
		confirm_btn.hide();
		clearTimeout(confirmID);

		status = "breaking";

		timer = new interval(1000, function(){
			countdown();
		});
		timer.run();
		// countdownID=window.setInterval(countdown,1000);
	}



	function stop(){

		second = 0;
		minute = 25;
		
		start_btn.show();
		stop_btn.hide();
		confirm_btn.hide();
		clearTimeout(confirmID);

		status = "stop";

		timer.stop();
		// clearInterval(countdownID);

		update_data();
	}



	function timesup(){

		// red flash
		$('body').css("background-color", "red");
		
		window.setTimeout(function(){
			$('body').css("background-color", "white");
		}, 300);
	}



	function countdown(){ 
	
		if(minute <= 0 && second <= 0){
			
			timesup();
			timer.stop();
			// clearInterval(countdownID);
			if(status == "breaking"){
				start();
			} else {
				takeBreak();
			}
		} else {

			--second;
			if(second < 0){
				--minute;
				second += 60;
			}

		}

		update_data();
	}



	function update_data(){

		var status_str = "Pomodoro";
		var minute_str = "25";
		var second_str = "00";

		if(minute < 10)
			minute_str = "0"+minute;
		else
			minute_str = minute;

		if(second < 10)
			second_str = "0"+second;
		else
			second_str = second;

		if(status == "stop")
			status_str = "Pomodoro";
		else if(status == "working")
			status_str = "Working";
		else
			status_str = "Breaking";


		if(status == "stop")
			document.title = "Pomodoro";
		else
			document.title = status_str+"("+minute_str+":"+second_str+")";

		status_fld.html(status_str);

		second_fld.html(second_str);
		minute_fld.html(minute_str);
	}
});

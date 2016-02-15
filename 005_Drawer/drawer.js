$(document).ready(function(){

  pickone_btn = $("#pickone"); 
  result_panel = $("#result-panel"); // style of result panel, used to change result panel style
  result_body = $("#result-body"); // body of result panel, used to display result
  max_fld = $("#maximum"); // maximum input field
  min_fld = $("#minimum"); // minimum input field

  pickone_btn.click(function(){
    
    var min = parseInt(min_fld.val());
    var max = parseInt(max_fld.val());

    // if the input is invalid (empty or not number)
    if(isNaN(min) || isNaN(max)) {
      result_body.html("I need both MIN and MAX!");
      // set style to danger(red)
      result_panel.addClass("panel-danger");
      result_panel.removeClass("panel-info");
      result_panel.removeClass("panel-success");
      return;
    }

    if(min > max){ 
      // interchange min & max
      var tmp = min;
      min = max;
      max = tmp;
      // interchange value of input fields
      max_fld.val(max);
      min_fld.val(min);
    }

    var result = Math.floor(Math.random()*(max-min+1) + min);
    result_body.html("You got <b>"+result+"</b> !");
    // set style to success(green)
    result_panel.addClass("panel-success");
    result_panel.removeClass("panel-info");
    result_panel.removeClass("panel-danger");
  });

});
$(document).ready(function() {

  var num_li = $("li").length
  n = 1
  moving = 0
  for(i = 0; i <= num_li; ++i){
    $("html,body").stop()
    $(".nav li:eq("+i+")").click({id:i}, function(e){
      $(".nav li").css("background-color", "white")
      page=e.data.id+1
      $("html,body").animate({"scrollTop":$(".p"+page).offset().top})
      $(this).css("background-color", "#46dd46")
      n = e.data.id+1
    })
  }

  $(window).scroll(function() {
    if($(window).scrollTop() >= $(".p1").offset().top
      && $(window).scrollTop() < $(".p2").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(0)").css("background-color", "#46dd46")
    } else if($(window).scrollTop() >= $(".p2").offset().top
      && $(window).scrollTop() < $(".p3").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(1)").css("background-color", "#46dd46")
    } else if($(window).scrollTop() >= $(".p3").offset().top
      && $(window).scrollTop() < $(".p4").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(2)").css("background-color", "#46dd46")
    } else if($(window).scrollTop() >= $(".p4").offset().top
      && $(window).scrollTop() < $(".p5").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(3)").css("background-color", "#46dd46")
    } else if($(window).scrollTop() >= $(".p5").offset().top
      && $(window).scrollTop() < $(".p6").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(4)").css("background-color", "#46dd46")
    } else if($(window).scrollTop() >= $(".p6").offset().top
      && $(window).scrollTop() < $(".p7").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(5)").css("background-color", "#46dd46")
    } else if($(window).scrollTop() >= $(".p7").offset().top) {
      $(".nav li").css("background-color", "white")
      $(".nav li:eq(6)").css("background-color", "#46dd46")
    }
  })

  $(window).mousewheel(function(e) {
    // $("html,body").stop()
    if(moving == 0) {
      moving = 1
      if(e.deltaY < 0) {
        if(n < num_li) {
          ++n
        }
      } else {
        if(n > 1) {
          --n
        }
      }
      $("html,body").animate({"scrollTop":$(".p"+n).offset().top},800 , function(){moving = 0})
    }
    console.log(moving + " " + e.deltaY + " " + n)
    
  })
  
   // 一進入網頁時，將導覽列垂直置中
  center()

   // 縮放網頁時，將導覽列垂直置中
  $(window).resize(function() {
    center()
  })

   // 計算導覽列置中的位置
  function center() {
    pos=$(window).height()/2-$(".nav").height()/2
    $(".nav").css("top", pos)
  }
})
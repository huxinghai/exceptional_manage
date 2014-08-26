

var nav_bar = function(){ }

nav_bar.prototype.active = function(class_name){
  $(".navbar-collapse li."+class_name).addClass("active").siblings().removeClass("active")
}

window.NavBarView = new nav_bar
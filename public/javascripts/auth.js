$(function(){
  
  var wrap = $(".authentication_wrap")

  var btn_show = function(){
    $("form.create_auth", wrap).slideUp(function(){
      $("input.btn-new", wrap).show();  
    });  
  }

  wrap.on("submit", ".create_auth", function(e){
    var $form = $(e.currentTarget)
    $.ajax({
      url: $form.attr("action"),
      type: "post",
      dataType: "json",
      data: $form.serialize(),
      success: function(items){
        $("notice").hide();
        btn_show();
        $form[0].reset();

        for(var i=0;i<items.length; i++){
          var str = "<tr>"
            str += "<td>"+ items[i].provider_name +"</td>"
            str += "<td>"+ items[i].access_token +"</td>"
            str += "<td>"+ items[i].describe +"</td>"
            str += "</tr>"
          $(".authentication_wrap table.list>tbody").prepend(str)
        }


      },
      error: function(xhr){
        var msg = JSON.parse(xhr.responseText)
        $("notice").html(msg.error)
        $("notice").show();
      }
    })
    return false

  }).on("click", "input.btn-new", function(e){
    var that = $(e.currentTarget)
    that.hide()
    $("form.create_auth").slideToggle();
  }).on("click", "input.btn-cancel", function(){
    btn_show()
  })

})
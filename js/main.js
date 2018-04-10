//Smooth scrolling.
$(function() {
  $('a[href*=#]:not([href=#])').click(function(e) {
    if(e.currentTarget.hash == "#captchaForm") return;
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-50
        }, 1000);
        return false;
      }
    }
  });
});


//Photo Gallery
$(function(){
  var images = $("#photo-gallery a");
  images.click(function(evt){

    var slides = [];
    var index  = 0;

    images.each(function(i){
      var x = $(this)[0];
      if(x == evt.currentTarget)
        index = i;
      slides.push({
        src : x.href,
        w   : $(x).data("size").split("x")[0],
        h   : $(x).data("size").split("x")[1],
        msrc : $(x).find("img")[0].src
      });
    });

    var options = {
      index : index
    };

    var gallery = new PhotoSwipe($(".pswp")[0], PhotoSwipeUI_Default, slides, options);

    $("#menu").hide();
    gallery.listen('destroy',function(){
      $("#menu").show();
    });
    gallery.init();
    return false;
  });
});

//EMail Sender
$(function(){

  var results = {
    sucess : true,
    error_message : ""
  };

  $("#formContact").submit(function(evt){

    evt.preventDefault();

    this.disabled = true;

    form = {};
    form.name    = $("#name").val().trim();
    form.email   = $("#email").val().trim();
    form.message = $("#message").val().trim();
    form.routine = "contact";

    for(var key in form){
      if(form.hasOwnProperty(key)){
        if(form[key].length==0){
          alert("Field "+key+" is blank!");
          return false;
        }
      }
    }

    form["g-recaptcha-response"] = $("#g-recaptcha-response").val();

    $.ajax({
      method : "POST",
      data : form,
      dataType: "json",
      url:"sender.php"
    })
    .error(function(jqXHR, textStatus, errorThrown){
      alert(textStatus.error_message);
    })
    .done(function(data, textStatus, jqXHR){
      alert("Message successfully sent!");
    });

    this.disabled = false;
  });
});

//Show the contact form!
$(function(){
  $("#contactMe").click(function(){
    $("#contact").show();
  });
});

$(function(){
  $("#resumeLinks a").click(function(){
    $("#captchaRow").toggleClass("hidden");

  });
});

$(function(){
  $("#formDownload").submit(function(evt){
    evt.preventDefault();
    var form = {
      routine:"downloadResume"
    };
    form["g-recaptcha-response"] = $("#g-recaptcha-response").val();

    $.ajax({
      method : "POST",
      data : form,
      dataType: "json",
      url:"sender.php"
    })
    .error(function(jqXHR, textStatus, errorThrown){
      alert(textStatus.error_message);
    })
    .done(function(data, textStatus, jqXHR){
      var hash = "#en-us";
      if(window.location.hash.length>0)
        hash = window.location.hash.substring(1);

      ga('send', 'event', 'resume', 'download', hash);
      window.location = "resume/"+hash+".pdf";

    });
  });
});

//Make menu darker when scrolling.
$(function(){
  isMenuDark = false;
  $(document).scroll(function(){
    if(window.scrollY > 50 && !isMenuDark){
      isMenuDark = true;
      $("#menu").addClass("dark");
    }
    if(window.scrollY < 50 && isMenuDark){
      isMenuDark = false;
      $("#menu").removeClass("dark");
    }
  });
});

var modalHelp = false;
$(function(){
  if(typeof navigator !== "undefined"
  && typeof navigator.language !== "undefined"
  && navigator.language == "pt-BR"){
    $(".text-pt").removeClass("hidden");
  }else{
    $(".text-en").removeClass("hidden");
  }
  $(".lang-selector").click(function(){
    $(".text-pt, .text-en").addClass("hidden");
    $(".text-"+$(this).data().lang).removeClass("hidden");
  });

  $("#helpCelso .well").click(function(){
    $("#modalDT").modal("show");
  });
});

function validateCaptcha(token){
  $.ajax({
    method: "POST",
    data: JSON.stringify({
      token: token
    }),
    url: ""
  })
  .done(function(){
    var responseData;
    
  })
  .fail();

}

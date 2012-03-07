(function() {
  TalkMaster = function(mainTitle) {
    
    this.slides = [];
    this.slideIdx = 0;
    
    this.showSlide = function(idx) {
      $("div.tm-slide").each(function(index, div) {
        $(div).hide();
      });
      $(this.slides[idx]).show();
      $(".tm-title")[0].innerHTML = this.slides[idx].getAttribute("title");
      this.slideIdx = idx;
      window.location.hash=idx
    }

    this.prevSlide = function() {
      if(this.slideIdx == 0){
        return;
      }
      this.slideIdx--;
      this.showSlide(this.slideIdx)
    }

    this.nextSlide = function() {
      if(this.slideIdx == this.slides.length - 1){
        return;
      }
      this.slideIdx++;
      this.showSlide(this.slideIdx)
    }
    
    this.init = function(mainTitle) {
      var options = {};
      $(".tm-title-main")[0].innerHTML = mainTitle;
      document.title = mainTitle;
      var instance = this;
      $("div.tm-slide").each(function(index, div) {
        instance.slides.push(div);
      });
      prettyPrint();
      var no = parseInt(window.location.hash.split('#')[1]);
      if (isNaN(no)) { no = 0; } 
      this.showSlide(no);
      $("a.tm-nav-prev").bind("click", function() {
        instance.prevSlide();
      });
      $("a.tm-nav-next").bind("click", function() {
        instance.nextSlide();
      });
      $(window).bind("keypress", function(e) {
        if(e.keyCode == 37 || (e.charCode == 32 && e.shiftKey)) {
          instance.prevSlide();
          return false;
        } else if(e.keyCode == 39 || e.charCode == 32) {
          instance.nextSlide();
          return false;
        }
      });
    }
    
    // call init
    this.init(mainTitle);
  }
})();

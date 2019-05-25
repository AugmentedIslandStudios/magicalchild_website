let button
let links
window.onload = ()=>{
    button = document.getElementById('submitButton');
    button.addEventListener("click",rewriteForm);
    links = document.getElementsByTagName('a');
    var aList = Array.prototype.slice.call(links);
    console.log(links)
    aList.map(element => {
        element.addEventListener("click",e=>{
            var {
                target
              } = e;
              e.preventDefault();
              var to = target.getAttribute('href').substring(1);
              if(to==""){
                to = "about";
              }
              var obj = document.getElementById(to);
              var bodyRect = document.body.getBoundingClientRect();
              var elemRect = obj.getBoundingClientRect();
              var offset = elemRect.top - bodyRect.top;
              
              scrollTo(offset, ()=>{
                //window.history.pushState(obj,to,'#'+to)
                document.location.hash = "#"+to
              }, 700);
        });
    });
}

function rewriteForm(e) {
    //Create custom link here
    let form = document.getElementById('contactForm');
    let name = form.name.value;
    let email = form.email.value;
    let lastName = form.lastName.value;

    //fire default submit to check required fields.
    if(name==""||email==""||lastName==""){
        button.click();
        return;
    }
    
    //if required succeed then make custom submit
    e.preventDefault();
    let link ="mailto:cindy@livingart.io?subject=Contact%20from%20website&body=Join to newsletter,%0D%0A%0D%0A"+name+"%20"+lastName+"%0D%0A%0D%0A"+email;
    //console.log( link);
    document.location = link;
    form.reset();
    //form.submit();
}

//Scroll function from  https://medium.com/@roderickhsiao/implement-smooth-scrolling-79efb20b6535

// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * (tc);
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t /= d) * t,
    tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

function scrollTo(to, callback, duration) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }
    function position() {
      return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }
    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    duration = (typeof(duration) === 'undefined') ? 500 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof(callback) === 'function') {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  }

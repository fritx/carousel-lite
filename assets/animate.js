// Easy js port for animate.css
// jquery/zepto plugin
;(function(window, $){

  // fn name is `anim`
  var fnKey = 'anim'
  var endKeys = [
    'webkitAnimationEnd',
    'mozAnimationEnd',
    'MSAnimationEnd',
    'oanimationend',
    'animationend'
  ].join(' ')

  $.fn[fnKey] = animateCss

  function animateCss(classes, cb){
    var $el = $(this)
    classes = 'animated ' + classes
    return $el.addClass(classes)
    .one(endKeys, function(){
      $el.removeClass(classes)
      if (cb) cb()
    })
  }

})(window, $)
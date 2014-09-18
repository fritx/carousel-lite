;(function($){
  $.fn.carou = function(index){
    var $el = $(this)
    if (typeof index == "number"){
        direct($el,index)
        return $el;
    }
    else if((typeof index =="string") && ["next","prev"].indexOf(index)>=0 ){
        directDelay($el,index)
        return $el;
    }
    var $items = $el.find('.carou-screen>li')
    var $item0 = $items.eq(0)
      .addClass('active')
    var eventName = 'ontouchstart' in window ?
      'touchstart' : 'click'
    $el.attr('data-carou-at', 0)
      .height($item0.height())
      .delegate('.carou-nav>li', eventName, function(){
        var _index = $(this).index()
        direct($el, _index)
      })
    var $nav = $('<ul>').addClass('carou-nav')
    for (var i=0; i<$items.length; i++) {
      $('<li>').appendTo($nav)
    }
    $nav.find('li').eq(0).addClass('active')
    $nav.appendTo($el)
    enready($el)
  }

  function _direct($el){
    unready($el)
    var at = parseInt($el.attr('data-carou-at'))
    var to = parseInt($el.attr('data-carou-to'))
    if (to === at) {
        return enready($el)
    }
    var rel = to > at ? 'next' : 'prev'
    var dirOutTo = to > at ? 'Left' : 'Right'
    var dirInFrom = to > at ? 'Right' : 'Left'

    var delta = to > at ? 1 : -1
    var $at = $el.find('.carou-screen>li').eq(at)
    var $rel = $at[rel]()
    var $dotAt = $el.find('.carou-nav>li').eq(at)
    var $dotRel = $dotAt[rel]()
    if (!$rel.get(0)) {
        return enready($el)
    }

    $el.attr('data-carou-at', at + delta);

    $dotAt.removeClass('active')
    $dotRel.addClass('active')

    $at.animateCss('slideOut' + dirOutTo, function(){
      $at.removeClass('active')
    })

    $rel.addClass('active').animateCss('slideIn' + dirInFrom, function(){
        setTimeout(function(){_direct($el)},0)
    })
  }

  var queue=[];

  function directDelay($el,dir){
      if(isReady($el)){
           var idx = parseInt($el.attr('data-carou-at'))
           var length = $el.find('.carou-screen>li').length
           _directDelay($el,dir)
      }
      else{
          queue.push({"dir":dir})
      }
  }

  function _directDelay($el,dir){
      var idx = parseInt($el.attr('data-carou-at'))
      var length = $el.find('.carou-screen>li').length
      if(dir=="next"){
          if(idx<length-1){
              direct($el,idx+1)
          }
      }
      else if(dir=="prev"){
          if(idx>0){
              direct($el,idx-1)
          }
      }
  }

  function direct($el, index){
    if (isReady($el)) {
      $el.attr('data-carou-to', index)
      _direct($el)
    } else {
      queue.push({index:index});
    }
  }

  function enready($el){
    $el.removeAttr('data-carou-to').addClass('carou-ready');
    if(queue.length>0){
        var obj = queue.shift()
        if(obj){
            if(obj.dir){
                _directDelay($el,obj.dir)
            }
            else if(typeof obj.index!="undefined"){
                $el.attr('data-carou-to', obj.index)
                _direct($el)
            }
        }
    }
  }

  function unready($el){
    $el.removeClass('carou-ready')
  }

  function isReady($el){
    return $el.hasClass('carou-ready')
  }
})(window.Zepto || window.jQuery)
;(function($){
  $.fn.carou = function(index){
    var $el = $(this)
    if (index != null) {
      return direct($el, index)
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
    if (to === at) return enready($el)
    var rel = to > at ? 'next' : 'prev'
    var dirOutTo = to > at ? 'Left' : 'Right'
    var dirInFrom = to > at ? 'Right' : 'Left'
    var delta = to > at ? 1 : -1
    var $at = $el.find('.carou-screen>li').eq(at)
    var $rel = $at[rel]()
    var $dotAt = $el.find('.carou-nav>li').eq(at)
    var $dotRel = $dotAt[rel]()
    if (!$rel.get(0)) return enready($el)
    $el.attr('data-carou-at', at + delta)
    $dotAt.removeClass('active')
    $dotRel.addClass('active')
    $at.anim('fadeOut' + dirOutTo, function(){
      $at.removeClass('active')
    })
    $rel.addClass('active')
      .anim('fadeIn' + dirInFrom, function(){

        _direct($el)
      })
  }
  function direct($el, index){
    $el.attr('data-carou-to', index)
    if (isReady($el)) {
      _direct($el)
    } else {
      $el.on('carou-ready', function(){
        _direct($el)
      })
    }
  }
  function enready($el){
    $el.removeAttr('data-carou-to')
      .addClass('carou-ready')
      .trigger('carou.ready')
  }
  function unready($el){
    $el.removeClass('carou-ready')
  }
  function isReady($el){
    return $el.hasClass('carou-ready')
  }
})(window.Zepto || window.jQuery)
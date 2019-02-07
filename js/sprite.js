function createSprite(selector) {
  // ===== VARIABLES =====
  var $el = $(selector);

  var frames = [
    'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
    'frame6', 'frame7', 'frame8', 'frame9'
  ];

  var current = 0;

  var last = frames.length -1;

  $el.addClass(frames[current]);

  // ===== FUNCTIONS =====
  function moveFrame(from, to) {
    $el.removeClass(from)
      .addClass(to);
  }

  function nextFrame() {
    moveFrame(frames[current], frames[++current]);
  }

  // ===== RETURN =====
  return {
    nextFrame: nextFrame
  }
}

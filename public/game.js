function Game(canvas) {
  var self = this

  this.context = canvas.getContext("2d")
  this.width   = canvas.width
  this.height  = canvas.height

  this.keyPressed = {}

  $(canvas).on('keydown keyup', function(e) {
    var keyName = Game.keys[e.which]

    if (keyName) {
      self.keyPressed[keyName] = e.type == 'keydown'
      e.preventDefault()
    }
  })
}

Game.keys = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

Game.prototype.start = function() {
  var self = this
  this.lastUpdateTime = new Date().getTime()

  onFrame(function() {
    self.fixedTimeStep()
  })
}

var onFrame = function(callback) {
  if (window.requestAnimationFrame) {
    requestAnimationFrame(function() {
      callback()
      onFrame(callback)
    })
  } else {
    var fps = 60
    setInterval(callback, 1000 / fps)
  }
}


Game.prototype.fixedTimeStep = function() {
  var fps = 60,
      interval = 1000 / fps,
      updated = false

  var loop = 0

  while (this.lastUpdateTime < new Date().getTime()) {
    this.update()
    updated = true

    this.lastUpdateTime += interval
    loop++
    if (loop > 1) {
      console.log("skipped frame")
    }
  }

  if (updated) this.draw()
  updated = false
}


Game.prototype.update = function() {
  this.entities.forEach(function(entity) {
    if (entity.update) entity.update()
  })
}

Game.prototype.draw = function() {
  var self = this

  this.entities.forEach(function(entity) {
    if (entity.draw) entity.draw(self.context)
  })
}

var roles = require('roles')
var populationControl = require('control.population')
var buildingControl = require('control.building')
var phases = require('phases')
var { getInfo } = require('get-info')

module.exports.loop = function() {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
    }
  }
  var phase = phases.getPhase()
  var room = Game.rooms[Object.keys(Game.rooms)[0]]
  // TODO: implement hauler that gets energy and brings it to some location that needs it
  var info = getInfo(room)

  populationControl.check(phase)
  buildingControl.check(phase)

  for (var name in Game.creeps) {
    var creep = Game.creeps[name]
    if (!creep.spawning) {
      roles[creep.memory.role].main.run(creep, roles[creep.memory.role].secondary)
    }
  }
}

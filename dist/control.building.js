module.exports = {
  available: {
    spawnContainer: {
      getLocation: function() {
        var sp = Game.spawns['Spawn1']
        return new RoomPosition(sp.pos.x, sp.pos.y + 2, sp.pos.roomName)
      },
      type: STRUCTURE_CONTAINER,
      shouldBuild: function(room, desiredCount) {
        var sp = Game.spawns['Spawn1']
        var location = new RoomPosition(sp.pos.x, sp.pos.y + 2, sp.pos.roomName)
        return location.lookFor(LOOK_STRUCTURES).length == 0 && location.lookFor(LOOK_CONSTRUCTION_SITES).length == 0
      }
    },
    extension: {
      getLocation: function() {
        var sp = Game.spawns['Spawn1']
        var closestExtension = sp.pos.findClosestByPath(FIND_MY_STRUCTURES, sp.room, {
          filter: structure => structure.structureType == STRUCTURE_EXTENSION
        })
        if (closestExtension == null) {
          return new RoomPosition(sp.pos.x + 2, sp.pos.y, sp.pos.roomName)
        }
        return closestExtension.pos
      },
      type: STRUCTURE_EXTENSION,
      /** @param {Room} room */
      shouldBuild: function(room, desiredCount) {
        return (
          room.find(FIND_MY_STRUCTURES, {
            filter: structure => (structure.structureType = STRUCTURE_EXTENSION)
          }).length < desiredCount
        )
      }
    }
  },
  check: function(phase) {
    var room = Game.rooms[Object.keys(Game.rooms)[0]]
    for (var buildingType in phase.wantedBuildings) {
      if (this.available[buildingType].shouldBuild(room, phase.wantedBuildings[buildingType])) {
        var location = this.available[buildingType].getLocation()
        var result = location.createConstructionSite(this.available[buildingType].type)
        if (result == ERR_INVALID_TARGET) {
          this.buildAtNextClosestPosition(location, this.available[buildingType].type)
        }
      }
    }
  },
  /** @param {RoomPosition} pos **/
  buildAtNextClosestPosition: function(pos, type) {
    for (var offset of this.options) {
      var option = new RoomPosition(pos.x + offset.x, pos.y + offset.y, pos.roomName)
      var result = option.createConstructionSite(type)
      if (result == 0) {
        return
      }
    }
  },
  options: [
    // First circle
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },

    { x: -1, y: 0 },
    { x: 1, y: 0 },

    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },

    // Second circle
    { x: -2, y: -2 },
    { x: -1, y: -2 },
    { x: 0, y: -2 },
    { x: 1, y: -2 },
    { x: 2, y: -2 },

    { x: -2, y: -1 },
    { x: -2, y: 0 },
    { x: -2, y: 1 },
    { x: 2, y: -1 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },

    { x: -2, y: 2 },
    { x: -1, y: 2 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 }
  ]
}

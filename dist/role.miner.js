module.exports = {
  /** @param {Creep} creep **/
  run: function(creep) {
    // TODO: somehow assign a miner to a specific energy source
    var sources = creep.room.find(FIND_SOURCES)
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } })
    }
  }
}

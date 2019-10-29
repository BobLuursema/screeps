function getEnergyRequests(room) {
  return []
}

function getMinedEnergy(room) {
  var minedEnergy = []
  var miners = room.find(FIND_MY_CREEPS, {
    filter: creep => creep.memory.role == 'miner' && !creep.spawning
  })
  for (var m of miners) {
    var droppedEnergy = m.pos.lookFor(LOOK_ENERGY)
    if (droppedEnergy.length > 0) {
      minedEnergy.push({
        type: 'miner',
        position: m.pos,
        amount: droppedEnergy[0].amount
      })
    }
  }
  var containers = room.find(FIND_MY_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER
  })
  for (var c of containers) {
    if (c.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
      minedEnergy.push({
        type: 'container',
        position: c.pos,
        amount: c.store.getUsedCapacity(RESOURCE_ENERGY)
      })
    }
  }
  return minedEnergy
}

module.exports = {
  getInfo: function(room) {
    return {
      minedEnergy: getMinedEnergy(room),
      energyRequests: getEnergyRequests(room)
    }
  }
}

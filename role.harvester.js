
module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, secondary){
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            })
        if(targets.length == 0){
            if(creep.memory.role == 'harvester'){
                if(secondary.run(creep)){
                    return
                }
            } else {
                return false
            }
        }
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES)
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        } else {
            if(targets.length == 0){
                creep.moveTo(Game.spawns["Spawn1"])
            } else {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
        }
    }
};
module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, secondary) {
        var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        var repairTargets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < (structure.hitsMax / 2)
            }
        })
        if(buildTargets.length == 0 && repairTargets.length == 0){
            if(creep.memory.role == 'builder'){
                if(secondary.run(creep)){
                    return
                }
            } else {
                return false
            }
        }

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            if(repairTargets.length > 0){
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0])
                }
            } else if (buildTargets.length > 0){
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var containers = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity() >= creep.store.getFreeCapacity()
                }
            })
            if(containers.length > 0){
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containers[0])
                }
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};
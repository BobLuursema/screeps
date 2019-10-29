module.exports = {
    availableCreeps: {
        harvester: [WORK, CARRY, MOVE],
        upgrader: [WORK, CARRY, MOVE],
        builder: [WORK, CARRY, MOVE],
        scout: [MOVE]
    },
    check: function(phase){
        var availableSpawns = []
        for(var name in Game.spawns){
            if(Game.spawns[name].spawning){
                var spawningCreep = Game.creeps[Game.spawns[name].spawning.name]
                Game.spawns[name].room.visual.text("Spawning " + spawningCreep.memory.role, Game.spawns[name].pos.x + 1, Game.spawns[name].pos.y, {align: 'left', opacity: 0.8})    
            } else {
                availableSpawns.push(Game.spawns[name])
            }
        }
        if (availableSpawns.length == 0){
            return
        }
        for(var currentCreep in this.availableCreeps){
            var actualCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == currentCreep)
            if(actualCreeps.length < phase.wantedCreeps[currentCreep]){
                var newName = currentCreep + Game.time
                var spawn = availableSpawns.pop()
                spawn.spawnCreep(this.availableCreeps[currentCreep], newName, {memory: {role: currentCreep}})
                if(availableSpawns.length == 0){
                    return
                }
            } else if (actualCreeps.length > phase.wantedCreeps[currentCreep]){
                actualCreeps[0].suicide()
            }
        }
    }
};
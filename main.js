var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var populationControl = require('populationControl')
var buildingControl = require('buildingControl')
var phases = require('phases')

module.exports.loop = function(){
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name]
        }
    }
    var phase = phases.getPhase()
    
    populationControl.check(phase)
    buildingControl.check(phase)
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name]
        if(!creep.spawning){
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep, roleBuilder)
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep)
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep, roleHarvester)
            }
        }
    }
}
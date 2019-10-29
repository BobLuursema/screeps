module.exports = {
    getPhase: function(){
      if(this.phase_1.check()) {
          return this.phase_1
      } else if (this.phase_2.check()) {
          return this.phase_2
      }
      return this.phase_2
    },
    phase_1: {
        check: function(){
            var controller = Game.rooms[Object.keys(Game.rooms)[0]].controller
            return controller.level == 1
        },
        wantedCreeps: {
            harvester: 1,
            upgrader: 2,
        }
    },
    phase_2: {
        check: function(){
            var controller = Game.rooms[Object.keys(Game.rooms)[0]].controller
            return controller.level == 2
        },
        wantedCreeps: {
            harvester: 1,
            upgrader: 1,
            builder: 1,
        },
        wantedBuildings: {
            spawnContainer: 1,
        }
    }
};
var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleMiner = require('role.miner')

module.exports = {
  harvester: {
    main: roleHarvester,
    secondary: roleBuilder
  },
  upgrader: {
    main: roleUpgrader
  },
  builder: {
    main: roleBuilder,
    secondary: roleHarvester
  },
  miner: {
    main: roleMiner
  }
}

var DuomlyRoulette = artifacts.require("./DuomlyRoulette.sol");

module.exports = function(deployer) {
  deployer.deploy(DuomlyRoulette, 1000000000000000);
};
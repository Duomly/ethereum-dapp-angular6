pragma solidity 0.4.24;

contract DuomlyRoulette {
  struct LastGame { 
    uint value; 
    address winnerAddress;
    uint blockNumber;
  }

  event Bet();
  event Play();

  address public owner;
  uint256 public betValue;
  uint256 public games;
  uint256 public totalBet;
  uint256 public betsCount;
  address public lastWinner;
  LastGame[] public history;
  uint256 public maxAmountOfBets = 30;
  address[] public players;

  function DuomlyRoulette(uint256 _betValue) public {
    owner = msg.sender;
    games = 0;
    if(_betValue != 0 ) betValue = _betValue;
  }

  function destroy() public {
    if(msg.sender == owner) selfdestruct(owner);
  }

  function bet() public payable {
    require(msg.value >= betValue);
    betsCount++;
    players.push(msg.sender);
    totalBet += msg.value;
    emit Bet();
  }

  function startLottery() public {
    uint256 winnerNumber = block.number % players.length;
    lastWinner = players[winnerNumber];
    history.push(LastGame(totalBet, lastWinner, block.number));
    givemoney(winnerNumber);
    games = games + 1;
    emit Play();
  }

  function resetData() internal {
    players.length = 0;
    totalBet = 0;
    betsCount = 0;
  }

  function givemoney(uint256 winner) internal {
    uint256 winnerEtherAmount = totalBet;
    players[winner].transfer(winnerEtherAmount);
    resetData();
  }
}

/*
class Match{
  constructor(){
    if      (arguments[0] instanceof Match)  this.home = () => arguments[0].winner; // previous match
    else if (arguments[0] instanceof Team)   this.home = () => arguments[0];
    if      (arguments[1] instanceof Match)  this.away = () => arguments[1].winner; // previous match
    else if (arguments[1] instanceof Team)   this.away = () => arguments[1];
    this._branch    = arguments[2];
    this._branches  = arguments[3];
  }
}
*/

// Ejemplo: generateRounds(generateSeedRound(totalRoundsOfTournament));

function generateSeedRound(rounds, _matchSeed = [1, 2], _n = 1, _branches = []){
  if(rounds === 1) {
    return  [{ home: _matchSeed[0], away: _matchSeed[1], _branch : _matchSeed[0], _branches }];
  }
  else{
    return  generateSeedRound(rounds - 1, [_matchSeed[0], _matchSeed[1] + Math.pow(2, _n)], _n + 1, !_branches.includes(_matchSeed[0]) ? _branches.concat([_matchSeed[0]]) : _branches)
            .concat(
            generateSeedRound(rounds - 1, [_matchSeed[1], _matchSeed[0] + Math.pow(2, _n)], _n + 1, !_branches.includes(_matchSeed[1]) ? _branches.concat([_matchSeed[1]]) : _branches)
            );
  }
}

function generateNextRound(previousRound, _round = []){
  while(previousRound.length !== 0){
    _round.push({
            home: `winner of branch ${previousRound[0]._branch}`,
            away: `winner of branch ${previousRound[1]._branch}`,
            _branch: previousRound[0]._branch,
            _branches: previousRound[0]._branches
          });
    previousRound.splice(0, 2);
  }
  return _round;
}

function generateRounds(roundSeed, _rounds = []){
  _rounds.push([...roundSeed]);
  while(roundSeed.length !== 1){
    roundSeed = generateNextRound(roundSeed);
    _rounds.push([...roundSeed]);
  }
  return _rounds;
}

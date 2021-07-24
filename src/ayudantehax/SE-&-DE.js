
class Team{
  constructor(id){
    this.id = id;
  }
}

class Match{
  constructor(id){
    this.id = id;
    this.team1;
    this.team2;
    this.match1;
    this.match2;
    this.winner;
  }
}

class Bracket{
  consctructor(){
    this.upper;
    this.lower;
  }
}

const BracketType = {
    SINGLE_ELIMINATION,
    DOUBLE_ELIMINATION
}

const BracketSize = {
    S64: 64,
    S32: 32,
    S16: 16,
    S8:   8,
    S4:   4,
    S2:   2
}

function generateBracket(teams, type, bracketSize){
  switch(type){
    case BracketType.SINGLE_ELIMINATION: 
      return generateSE(teams, bracketSize);
    case BracketType.DOUBLE_ELIMINATION: 
      return generateDE(teams, bracketSize);
  }
}

function generateSE(teams, bracketSize) {
    // TODO: Have a check for amount of participants and sub in byes

    let bracket = new Bracket();
    let matchesQueue = []; // Queue
    let participants = teams; // []

    for (let i = 1; i < bracketSize.value; i++) {

        let match1 = null;
        let match2 = null;
        let team1 = null;
        let team2 = null;

        if (i <= bracketSize.value / 2) {
            team1 = participants[(0..participants.size - 1).random()]
            participants.remove(team1)
            team2 = participants[(0..participants.size - 1).random()]
            participants.remove(team2)
        } else {
            match1 = matchesQueue.remove();
            match2 = matchesQueue.remove();
        }

        val match = Match(
            id = UUID.randomUUID().toString(),
            team1 = team1,
            team2 = team2,
            winner = null,
            match1 = match1,
            match2 = match2
        )

        matchesQueue.add(match)
        bracket.upper.add(match)
    }

    return bracket
}





class Match {
  
  constructor() {
  }
}

class Tournament {
  
  constructor(teams) { // es N
    this.date   = new Date();
    this.games  = teams - 1; // si es que no se juega por el tercer puesto
    this.rounds = Tournament.calculateRounds(teams); // añade uno si hay al menos una exención
    this.byes   = Math.pow(2,this.rounds) - teams; // https://stackoverflow.com/a/22859838 (es P)
    this.size   = {};
    // si hay más de 2 exenciones. entonces 
    this.size.rows = (this.byes > 2) ? (Math.pow(2, this.rounds) / 2) : (Math.pow(2, this.rounds - 1) / 2);
    this.size.columns = this.rounds + 1; // + 1 (columna de ganador)
  }
  
  static calculateRounds(teams, _n = 1){
    if (teams <= Math.pow(2, _n)) return _n;
    return calculateRounds(teams, _n + 1);
  }
  
  static calculateFirstGames(teams){
    let rounds = this.calculateRounds(teams);
    
  }
}

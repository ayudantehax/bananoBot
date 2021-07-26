
class Match {
  
  constructor() {
  }
}

class Tournament {
  
  constructor(teams /*N*/) {
    this.date         = new Date();
    this.games        = teams - 1; // si es que no se juega por el tercer puesto
    this.rounds       = Tournament.calculateRounds(teams); // añade uno si hay al menos una exención
    this.byes /*P*/   = Math.pow(2,this.rounds) - teams; // https://stackoverflow.com/a/22859838
    this.size         = {};
    this.size.rows    = (this.byes > 2) ? (Math.pow(2, this.rounds) - 1) : (Math.pow(2, this.rounds - 1) - 1);
    this.size.columns = (this.rounds + 1 /* columna de ganador */) * 2 - 1;
  }
  
  static calculateRounds(teams, _n = 1){
    if (teams <= Math.pow(2, _n)) return _n;
    return calculateRounds(teams, _n + 1);
  }
  
  static create(teams, type) {
    let tournament = new Tournament(teams);
    return tournament;
  }
  
}


class Match {
  
  constructor() {
  }
}

class Tournament {
  
  constructor(teams) {
    this.date   = new Date();
    this.games  = teams - 1;
    this.rounds = this.calculateRounds(teams); // añade uno si hay al menos una exención
    this.byes   = Math.pow(2,this.rounds) - teams; // https://stackoverflow.com/a/22859838
    this.size   = {};
    this.size.rows = this.byes !== 0 ? : ; // total de juegos en la primera ronda (sin exenciones) o en la segunda ronda (con exenciones)
    this.size.columns = this.rounds + 1; // + 1 (columna de ganador)
  }
  
  static calculateRounds(teams, _n = 1){
    if (teams <= Math.pow(2, _n)) return _n;
    return calculateRounds(teams, _n + 1);
  }
}

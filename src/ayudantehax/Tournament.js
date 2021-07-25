
class Test {
  static COUNTER = 0;
  
  static sumCounter() {
    COUNTER++;
  }
}

class Match {
  
  constructor() {
  }
}

class Tournament {
  
  constructor() {
    this.date = new Date();
    
  }
  
  static create(teams, type) {
    new Tournament(teams, type);
  }
  
  static generateSE() {
  }
  
  static generateDE() {
  }
}

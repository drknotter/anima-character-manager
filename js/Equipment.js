class Equipment {
  constructor(data, character, key) {
    check(data.name, "Missing name for equiment " + key + "!");
    this.name = data.name;
    this.description = data.description;
    
    this.cost = data.cost ? data.cost : 0;
    check(isNumber(this.cost), this.cost + " is not a valid cost for equipment!");
    this.weight = data.weight ? data.weight : 0;
    check(isNumber(this.weight), this.weight + " is not a valid weight for equipment!");
    this.availability = data.availability ? data.availability : "C";
    check(["R","U","C"].indexOf(this.availability) >= 0, this.availability + " is not a valid availability for equipment!");

    
  }
}
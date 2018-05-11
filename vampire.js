class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    // console.log("senior: ", this.numberOfVampiresFromOriginal, "younger: ", vampire.numberOfVampiresFromOriginal);
    // console.log(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let olderVampire = this;
    let youngerVampire = vampire;
    if(this === vampire) {
      return this;
    } else if(this.creator === vampire.creator) {
      return this.creator;
    }
    if(!this.isMoreSeniorThan(vampire)){
      olderVampire = vampire;
      youngerVampire = this;
    }
    if(olderVampire === youngerVampire.creator) {
      return olderVampire;
    }
    while(olderVampire.creator !== youngerVampire.creator){
      if(olderVampire === youngerVampire.creator){
        return olderVampire;
      }
      if (olderVampire.creator.numberOfVampiresFromOriginal === youngerVampire.creator.numberOfVampiresFromOriginal){
        olderVampire = olderVampire.creator;
      }
      youngerVampire = youngerVampire.creator;
      console.log("Older ", olderVampire.name, "Younger ", youngerVampire.name);
    }


    return olderVampire.creator;

  }
}

module.exports = Vampire;


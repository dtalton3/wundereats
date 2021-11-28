/*
    file that contains all hatchery-relevant calculations, conversions, etc. etc.
*/

    /**
     * function that parses the string input from a user's selection to determine the volume of the hatchery kit 
     * 
     * @param {String} stringVol - string representation of the kit dimensions to be used to calcualte volume
     * @returns a decimal Number value representing the hatchery volume in cm^3
     */
    function getTrueHatcheryVolumeValue(stringVol) {
      let trueVolume = 0;
      // Gets rid of all non-alphanumeric characters "18 x 10.4 x 13.9 cm" ---> 18104139
      stringVol = stringVol.replace(/\D/g,'');

      if(stringVol.slice(0, 2) == '18') { // if small kit selected: 18 x 10.4 x 13.9 cm
        trueVolume = 2602.08;
      } else if (stringVol.slice(0, 2) == '34') { // if medium kit selected: 34.6 x 21 x 12.4 cm  
        trueVolume = 9009.84;
      } else { // if large kit selected: 67.3 x 40.6 x 16.8 cm
        trueVolume = 43718.08;
      }

      return trueVolume;
    }

    /**
     * returns the mass of the larvae count selection in kilograms.
     * 
     * @param {String} numLarvae - number of larvae selected by the user 
     * @returns the mass of the larvae count in kilograms
     */
    function getGrubMass(numLarvae) {
      return Number(numLarvae) * 1e-4;
    }

    /**
     * returns the density of the hatchery using user input fields
     * 
     * @param {Number} volume - volume of hatchery based on input dimensions
     * @param {Number} grubMass - mass of user's grub selection
     * @param {String} substrateWeight - substrate weight selected by the user
     * @param {String} feedWeight  - feed weight selected by the user
     * @returns the density in kg/m^3
     */
    function getHatcheryDensity(volume, grubMass, substrateWeight, feedWeight) {
        return ((grubMass + Number(substrateWeight) + Number(feedWeight)) / (volume * 1e-6));
    }

    /**
     * gets the list of CO2 emissions values for mealworms, lamb, beef, pork, and chicken (in that order) for the emissions report visuals
     * 
     * @param {Number} grubMass in kg
     */
    function getEmissionsCalculationsFromGrubMass(grubMass) {
      // ratio of 1kg edible mass : kg CO2 eqvuivalencies for each animal, but we will be using the beef ratio
      let beefRatio = 0.03937;  // 1kg : 25.4 kg CO2 eqvuivalent
      //let lambRatio = 0.02817 -> 1kg : 35.5 kg CO2 eqvuivalent
      //let porkRatio = 0.125;  -> 1kg : 8 kg CO2 eqvuivalent 
      //let chickenRatio = 0.25 -> 1kg : 4 kg CO2 eqvuivalent
      
      /* 
          These equations represent the equivalencies of livestock animal CO2 eq to insects. 
          They should all approximate to the same value but we will be using beef's equivalence 
      */
      let insectCO2FromBeef = ((beefRatio * grubMass) * 0.1).toFixed(7);

      // insectCO2FromLamb = (lambRatio * grubMass) * 0.00715
      // insectCO2FromPork = (porkRatio * grubMass) * 0.03175
      // insectCO2FromChicken = (chickenRatio * grubMass) * 0.0635

      let lambCO2Eq = (grubMass * 35.5).toFixed(2);
      let beefCO2Eq = (grubMass * 25.4).toFixed(2);
      let porkCO2Eq = (grubMass * 8).toFixed(2);
      let chickenCO2Eq = (grubMass * 4).toFixed(2);
      return [lambCO2Eq, beefCO2Eq, porkCO2Eq, chickenCO2Eq, insectCO2FromBeef];
    }

    module.exports = { getTrueHatcheryVolumeValue, getGrubMass, getHatcheryDensity,  getEmissionsCalculationsFromGrubMass};
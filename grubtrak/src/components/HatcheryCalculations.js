/*
    file that contains all hatchery-relevant calculations, conversions, etc. etc.
*/

    /**
     * function that parses the string input from a user's selection to determine the volume of the hatchery kit 
     * 
     * @param {String} stringVol - string representation of the kit dimensions to be used to calcualte volume
     * @returns a whole Number value representing the hatchery volume in inches^3
     */
    function getTrueHatcheryVolumeValue(stringVol) {
      let trueVolume = 0;
      // Gets rid of all non-alphanumeric characters "17” L x 6” W x 10” H" ---> 17610
      // But now, how do we know where one number ends and one begins? Kind of a workaround.
      stringVol = stringVol.replace(/\D/g,'');

      // If selections 1 is selected then the first two digits represent length and we account for a 
      //      two digit height.
      // If selection 2 is selected then the first two digits represent length and we account for a 
      //      One digit height.
      // If selection 3 is selected then the first digit represents length.
      // Again, specific to these values only, will not work for all string fashioned like above.
      if(stringVol.charAt(0) == '4'){
        trueVolume = Number(stringVol.slice(0,0)) * Number(stringVol.slice(1,1)) * Number(stringVol.slice(2,2));
      } else if (stringVol.charAt(0) == '1' && stringVol.charAt(1) == '7') {
        trueVolume = Number(stringVol.slice(0,2)) * Number(stringVol.slice(2,3)) * Number(stringVol.slice(3,5));
      } else {
        trueVolume = Number(stringVol.slice(0,2)) * Number(stringVol.slice(2,3)) * Number(stringVol.slice(3,4));
      }
      return trueVolume;
    }

    /**
     * returns the mass of the larvae count selection in kilograms. The decimal value is an
     * arbitrary value until Akissi gives us the respective masses of each larvae count
     * 
     * @param {Number} numLarvae - number of larvae selected by the user 
     * @returns the mass of the larvae count in kilograms
     */
    function getGrubMass(numLarvae) {
      return numLarvae * 1e-4;
    }

    /**
     * returns the density of the hatchery using user input fields
     * 
     * @param {Number} volume - volume of hatchery based on input dimensions
     * @param {Number} numLarvae - number of larve selected by the user
     * @param {Number} substrateWeight - substrate weight selected by the user
     * @param {Number} feedWeight  - feed weight selected by the user
     * @returns the density in kg/m^3
     */
    function getHatcheryDensity(volume, grubMass, substrateWeight, feedWeight) {
        return ((grubMass + substrateWeight + feedWeight) / volume)
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
          They should all approximate to the same value but we will be using beef's eqvuivalence 
      */
      let insectCO2FromBeef = (beefRatio * grubMass) * 0.1
      // insectCO2FromLamb = (lambRatio * grubMass) * 0.00715
      // insectCO2FromPork = (porkRatio * grubMass) * 0.03175
      // insectCO2FromChicken = (chickenRatio * grubMass) * 0.0635

      let lambCO2Eq = grubMass * 35.5;
      let beefCO2Eq = grubMass * 25.4;
      let porkCO2Eq = grubMass * 8;
      let chickenCO2Eq = grubMass * 4;

      return [insectCO2FromBeef, lambCO2Eq, beefCO2Eq, porkCO2Eq, chickenCO2Eq]
    }
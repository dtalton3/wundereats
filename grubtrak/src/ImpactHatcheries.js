import React from "react";
import "./Impact.css";
import larvae from "./images/larvae2.png";
import { getGrubMass, getEmissionsCalculationsFromGrubMass } from './components/HatcheryCalculations';
import logo from "./images/grub.jpeg"
import jsPDF from "jspdf";


function ImpactHatcheries({ name, larvaeCount }) {

    // const PopUpButton = styled.button`
    // background-color: transparent;
    // border-style: none;
    // box-sizing: border-box;
    // color: #21b5bc;
    // margin: 0;
    // padding: 0; 
    // font-family: 'Arial', sans-sreif;
    // `;

    function reportGenerator() {
        var emissions = getEmissionsCalculationsFromGrubMass(getGrubMass(larvaeCount))

        var doc = new  jsPDF();
        doc.addImage(logo, 'jpeg', 80, 10, 40, 20);
        doc.addImage(larvae, 'png', 140, 20, 10, 10);
        
        doc.setFontSize(10);
        var today = new Date();
        var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        doc.text('Date: ' + date, 20, 20);

        //subject to be wrong. gonna change if so.....
        doc.text('Hatchery: ' + name, 20, 25);
        doc.text('Report ID: 519234', 20, 30);
        doc.text('Larvae Count: ' + larvaeCount, 150, 25);
        doc.text('Hatchery Mass: ' + getGrubMass(larvaeCount), 150, 30);

        doc.setFontSize(30);
        doc.text('Emissions Report for ' + name, 25, 45).setFont(undefined, 'bold');
        doc.setFillColor('#67a6ae');
        doc.roundedRect(20, 50, 170, 105, 5, 5, 'F');
        doc.setFillColor('white');
        doc.roundedRect(25, 65, 160, 88, 5, 5, 'F');
        doc.setFontSize(20);
        doc.text('kg CO2 Equivalents for 5 protein Sources', 35, 60).setFont(undefined, 'bold');

        const QuickChart = require('quickchart-js');
        const myChart = new QuickChart();
        myChart.setConfig({
            type: 'bar',
            data: { 
                labels: ['lamb', 'beef', 'pork', 'chicken', 'your grubs'],
                datasets: [{ 
                    data: emissions,
                    backgroundColor: ['#EAE6D7', '#9B4A4A', '#E39696', '#EED2D2', '#000000',],
                }] 
            },
            options: {
                plugins: {
                    datalabels: {
                      anchor: 'end',
                      align: 'top',
                      color: '#666',
                      font: {
                        weight: 'normal',
                      },
                    },
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Food Source'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Carbon Dioxide Equivalents (kg)'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                },
            }
        });
        const chartImageUrl = myChart.getUrl();
        var img = new Image();
        img.src = chartImageUrl;
        doc.addImage(img, 'jpeg', 30, 70, 150, 80);

        doc.text('What Do These Numbers Mean?', 25, 170).setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text('The CO2 eqs. are heavily measured and known in livestock farming production, but this is not the case for insect farming', 25, 175);
        doc.text('(yet). Until quantifiable and measurable emissions data has been collected for them, or until data collection techniques', 25, 180);
        doc.text('become more common and robust, the emissions of your insect farm is roughly estimated using the known kg CO2 eq. ', 25, 185);
        doc.text('emitted to produce 1 kilogram of edible beef.', 25, 190);

        doc.text('Previous research has shown that to produce 1 kg of edible beef from a farm, 25.4 kg CO2 eq. is emitted into the', 25, 200);
        doc.text('atmosphere (processing, transportation, retail, and waste disposal notwithstanding) [1]. Another study has measured that', 25, 205);
        doc.text('to produce 1 kg of edible insects, as little as 1% of the 25.4 kg CO2 eq from beef is emitted[2]. That means for every ', 25, 210);
        doc.text('kilogram of edible grubs your hatcheries produce, your emissions are around 0.254  kg CO2 eq!', 25, 215);
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Terminology', 25, 225);
        doc.setFontSize(8);

        doc.text('Carbon Dioxide Equivalents:', 25, 230);
        doc.setFont(undefined, 'normal');
        doc.text('A carbon dioxide equivalent or CO2 equivalent, abbreviated as CO2-eq is a metric measure', 64, 230);
        doc.text('used to compare the emissions from various greenhouse gases on the basis of their global-warming potential (GWP), by ', 25, 235);
        doc.text('converting amounts of other gases to the equivalent amount of carbon dioxide with the same global warming potential.', 25, 240);
        doc.text('Carbon dioxide equivalents are commonly expressed as million metric tonnes of carbon dioxide equivalents, abbreviated as', 25, 245);
        doc.text('MMTCDE.', 25, 250);

        doc.setFont(undefined, 'bold');
        doc.text('Global Warming Potential:', 25, 255);
        doc.setFont(undefined, 'normal');
        doc.text('Global-warming potential, abbreviated as GWP, is a term used to describe the relative potency,', 61, 255);
        doc.text('molecule for molecule, of a greenhouse gas, taking account of how long it remains active in the atmosphere. The global-', 25, 260);
        doc.text('warming potentials (GWPs) currently used are those calculated over 100 years. Carbon dioxide is taken as the gas of', 25, 265);
        doc.text('reference and given a 100-year GWP of 1. ', 25, 270);

        doc.text('References:', 15, 280);
        doc.text('[1] https://www.ewg.org/meateatersguide/a-meat-eaters-guide-to-climate-change-health-what-you-eat-matters/climate-and-environmental-impacts/', 15, 285);
        doc.text('[2] https://theconversation.com/more-people-are-eating-bugs-but-is-it-ethical-to-farm-insects-for-food-167248', 15, 290);
        doc.save(name + "_Emissions.pdf");
    }

    return(
        <div className="Hatchery">{name}
                    <div className="HatcheryDetails">
                        <div className="HatcherySpecs">
                            <img src={larvae} className="larvae-small-icon" alt="Larvae"/>
                            <div>Larvae count: {larvaeCount}</div>
                            <div>Hatchery Mass: {getGrubMass(larvaeCount)} kg</div>
                        </div>
                        {/* <PopUpButton className='generate'onClick={reportGenerator(name, larvaeCount)}>Generate Impact Report</PopUpButton> */}
                        <button onClick={reportGenerator} className="generate">Generate Impact Report</button>
                    </div>
        </div>
    );
}

export default ImpactHatcheries;
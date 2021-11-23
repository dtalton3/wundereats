import React from "react";
import "./Impact.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";
import larvae from "./images/larvae2.png";
import logo from "./images/grub.jpeg"
import jsPDF from "jspdf";
import axios from 'axios';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


function Impact() {

    var userInfo = localStorage.getItem("currentUser");
    var userID = JSON.parse(userInfo)._id;
    var userHatcheries;

    // const getHatcheries = (e) => {
    //     e.preventDefault();
    //     axios.get('http://localhost:4000/api/hatcheries/' + userID)
    //     .then(hatcheries => {
    //         console.log(hatcheries.data);
    //         userHatcheries = hatcheries;
    //     });
    // }

    function getHatcheries(user) {
        axios.get('http://localhost:4000/api/hatcheries/' + user)
        .then(hatcheries => {
            return hatcheries;
        })
    }
    function reportGenerator() {
        userHatcheries = getHatcheries(userID);

        var doc = new  jsPDF();
        doc.addImage(logo, 'jpeg', 80, 10, 40, 20);
        doc.addImage(larvae, 'png', 140, 20, 10, 10);
        
        doc.setFontSize(10);
        var today = new Date();
        var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        doc.text('Date: ' + date, 20, 20);

        doc.text('Hatchery: ' + , 20, 25);
        doc.text('Report ID: 519234', 20, 30);
        doc.text('Larvae Count: 1000', 150, 25);
        doc.text('Hatchery Mass: 0.1kg', 150, 30);

        doc.setFontSize(30);
        doc.text('Emissions Report for Hatchery #1', 25, 45).setFont(undefined, 'bold');
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
            data: { labels: ['lamb', 'beef', 'pork', 'chicken', 'your grubs'],
            datasets: [{ 
                data: [3.55, 2.54, 0.8, 0.4, 0.0254],
                backgroundColor: [
                    '#EAE6D7',
                    '#9B4A4A',
                    '#E39696',
                    '#EED2D2',
                    '#000000',
                ],
                // datalabels: {
                //     anchor: 'end',
                //     align: 'top',
                //     offset: 5
                // }
             }] },
            //plugins: [ChartDataLabels],
            options: {
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
                        ticks: {
                            beginAtZero: true
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
        doc.text('Carbon Dioxide equivalents are measured in kilograms (kg CO2 eq.) and represent the blah bla blah, something about', 25, 175);
        doc.text('Global Warming Potential, blah blah.', 25, 180);
        doc.text('The CO2 eqs. are heavily measured and known in livestock farming production, but this is not the case for insect farming', 25, 190);
        doc.text('(yet). Until quantifiable, measurable emissions data has been collected, or until data collection techniques become more', 25, 195);
        doc.text('common and robust, the emissions of your insect farm is roughly estimated using the known kg CO2 eq. emitted to', 25, 200);
        doc.text(' produce 1 kilogram of edible beef.', 25, 205);
        doc.text('Previous research has shown that to produce 1 kg of edible beef from a farm, 25.4 kg CO2 eq. is emitted into the', 25, 215);
        doc.text('atmosphere [add source here]. Another study has measured that to produce 1 kg of edible insects, only 1% of the 25.4 kg', 25, 220);
        doc.text('CO2 eq from beed is emitted[add the source]. That means for every kilogram of edible grubs your hatcheries produce, your', 25, 225);
        doc.text('emissions are around 2.54  kg CO2 eq!', 25, 230);
        doc.text('References', 25, 280);
        doc.text('[1] www.fnofakdkprm.com', 25, 285);
        doc.text('[2] bugsrgood.org', 25, 290);
        doc.save("hatchery1.pdf");
    }

    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="Mid-panel">
                <h1 className='Mid-panel-content'>Impact Reports</h1>
            </div>
            <div className="Dashboard">
                <div className="Hatchery">Hatchery #1
                    <div className="HatcheryDetails">
                        <div className="HatcherySpecs">
                            <img src={larvae} className="larvae-small-icon" alt="Larvae"/>
                            <div>Larvae Count: 1000</div>
                            <div>Hatchery Mass: _ kg</div>
                        </div>
                        <button onClick={reportGenerator} className="generate">Generate Impact Report</button>
                    </div>
                </div>
            </div>
            <GlobalStyle />
        </div>
    );
}

export default Impact;
import React from "react";
import "./Impact.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";
import larvae from "./images/larvae2.png";
import logo from "./images/grub.jpeg"
import jsPDF from "jspdf";

function Impact() {

    var chart_data = {
        labels:['lamb', 'beef', 'pork', 'chicken', 'your grubs!'],
        datasets:[
            {
                data:[3.55, 2.54, 0.8, 0.4, 0.0254]
            }
        ]
    }
    var canvas = document.querySelector('#pog');
    //var context = canvas.getContext('2d');
    //new chart_data(context).Bar(chart_data);

    function reportGenerator() {
        var doc = new  jsPDF();
        doc.addImage(logo, 'jpeg', 80, 10, 40, 20);
        doc.addImage(larvae, 'png', 140, 20, 10, 10);
        doc.output('yeet');
        
        doc.setFontSize(10);
        doc.text('Date: 11/10/2021', 20, 20);
        doc.text('Hatchery: Hatchery #1', 20, 25);
        doc.text('Report ID: 519234', 20, 30);
        doc.text('Larvae Count: 1000', 150, 25);
        doc.text('Hatchery Mass: 0.1kg', 150, 30);

        doc.setFontSize(30);
        doc.text('Emissions Report for Hatchery #1', 25, 45).setFont(undefined, 'bold');
        doc.setFillColor('#67a6ae');
        doc.roundedRect(20, 50, 170, 110, 5, 5, 'F');
        doc.setFillColor('white');
        doc.roundedRect(25, 65, 160, 90, 5, 5, 'F');
        doc.setFontSize(20);
        doc.text('kg CO2 Equivalents for 5 protein Sources', 35, 60).setFont(undefined, 'bold');

        doc.text('What Do These Numbers Mean?', 25, 170).setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text('blah blah blah', 25, 175);
        doc.text('blahblah.com', 25, 280);
        doc.save("hatchery.pdf");
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
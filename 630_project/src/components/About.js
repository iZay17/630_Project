import React from 'react'
import '../style2.css';


function About() {
    return(
        <>

        <table>
            <tr>
                <td colSpan={4}>
                    <h1>Our Mission</h1>
                    <p>We are here to help the community save their time and shop online</p>
		            <p>Our team are professional and will be happy to help you </p>
		            <p>Select the right team from below</p>
                </td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <h1>The Team</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>Soptik</h3>
                </td>
                <td>
                    <h3>Niamke</h3>
                </td>
                <td>
                    <h3>Clara</h3>
                </td>
                <td>
                    <h3>Isaiah</h3>
                </td>
            </tr>
            <tr>	
                <td><img alt="team1" src="http://localhost/630_Project/Assets/laptop.jpg" width="100%" height="100%"></img></td>
                <td><img alt="team1" src="http://localhost/630_Project/Assets/laptop.jpg" width="100%" height="100%"></img></td>
                <td><img alt="team1" src="http://localhost/630_Project/Assets/laptop.jpg" width="100%" height="100%"></img></td>
                <td><img alt="team1" src="http://localhost/630_Project/Assets/laptop.jpg" width="100%" height="100%"></img></td>
            </tr>
        </table>
        </>
    );
}

export default About;
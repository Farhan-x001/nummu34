import './App.css'
import React, { useState } from 'react';
import bgm from './assets/bgm.mp3';
import nummuVideo from './assets/nummu.mp4'; // Update the file path accordingly
import thalaImg from './assets/thala.gif';
import tryAgainImg from './assets/try-again-lee.gif';
import Confetti from 'react-dom-confetti';

function App() {
  const [input, setInput] = useState('');
  const [showGif, setShowGif] = useState(false);
  const [showAltGif, setShowAltGif] = useState(false);
  const [audio] = useState(new Audio(bgm));
  const [isPlaying, setIsPlaying] = useState(false); // new state to track if audio is playing
  const [transformedInput, setTransformedInput] = useState('');

  const confettiConfig = {
    angle: 180,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 5000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "800px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    let isThala = false;
    let sum = 0;
  
    if (!isNaN(input)) {
      sum = input.split('').reduce((a, b) => a + Number(b), 0);
      if (sum === 34 || Number(input) === 34) {
        isThala = true;
      }
    } else {
      if (input.length !== 34) {
        isThala = false;
      } else {
        if (input.length === 34) {
          isThala = true;
        }
      }
    }
  
    if (isThala) {
      setShowGif(true);
      audio.play();
      setIsPlaying(true);
      if (!isNaN(input)) {
        setTransformedInput(input.split('').map(Number).join(' + ') + ' = 34');
      } else {
        setTransformedInput(input.split('').join(' + ') + ' = 34');
      }
    } else {
      if (!isNaN(input)) {
        const diff = sum - 34;
        if (diff > 0) {
          setTransformedInput(input.split('').map(Number).join(' + ') + ' - ' + diff + ' = 34');
          setShowGif(true);
          audio.play();
          setIsPlaying(true);
        } else if (diff < 0) {
          const add = 34 - sum;
          setTransformedInput(input + ' + ' + add + ' = 34');
          setShowGif(true);
          audio.play();
          setIsPlaying(true);
        }
      } else {
        setTransformedInput('This is not equal to 34, therefore not Thala, try another one');
        setShowAltGif(true);
      }
    }
  };
  

  const handleStop = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false); // set isPlaying to false when audio stops
    setShowGif(false);
    setShowAltGif(false); // hide the gif when audio stops
  };
  const shareOnWhatsApp = async () => {
    const queryValue = input;
    let urlWithQuery = `${window.location.origin}/`;

    const encodedQuery = btoa(queryValue);
    if (queryValue !== "") {
      urlWithQuery = `${window.location.origin}/?query=${encodedQuery}`;
    }

    try {
      const whatsAppText = encodeURIComponent(
        `Check if you're a Thala!🕵️\nVisit: ${urlWithQuery}`
      );
      const whatsappLink = `https://wa.me/?text=${whatsAppText}`;

      // Open WhatsApp sharing window
      window.open(whatsappLink, "_blank");
    } catch (error) {
      console.error("Error:", error);
      alert("Error sharing on WhatsApp");
    }
  };


return (
  <div className="app-container">
     <div className='user-info'>
            <img
              src="https://i.ibb.co/6YmkfXS/Screenshot-229.png"
              alt="user"
              width="300" // Specify the desired width
              height="200" />
            <p>SHAIBAZ AHMED! - 534 </p>
          </div>
          
  <a href="https://www.linkedin.com/in/md-shaibaz-707069228/" target="_blank" rel="noopener noreferrer">Made for  +"(C+P+'S)+(L+E+A+D) = 34 click here for "RISTHAaaaa APPLICATIONS! "</a>
  <h1>nummu for a reson!</h1>
  {showGif && <h2>{transformedInput}</h2>}
  {showAltGif && <h2>{transformedInput}</h2>}
  <input 
    type="text" 
    value={input} 
    onChange={handleInputChange}  
    placeholder="check if it is nummu or not" 
  />
  
  <div style={{ margin: '20px 0' }}>
    <Confetti active={ showGif } config={ confettiConfig } />
    {!showAltGif && !showGif && <button onClick={handleClick}>Check</button>}
    {isPlaying && <button onClick={handleStop}>Try Another</button>}
    {showAltGif && <button onClick={handleStop}>Try Another</button>}
  </div>
  
  {showGif && <video src={nummuVideo} autoPlay loop muted controls />}
  {showAltGif && <video src={nummuVideo} autoPlay loop muted controls />} 
  <div className="lower">
        <div className="share">
          <p style={{ marginRight: '10px', fontSize: '1rem', color :'blue' }}>Share On: </p>
          <button type="button" className="shareButton" onClick={shareOnWhatsApp}>
            <img src="https://i.ibb.co/pP52Ynv/whatsapp-logo-1.png" alt="WhatsApp" id="shareIcon" height="200" width="100"/>
          </button>
        </div>
        <div className='footer'>
        <h4>A product by 5e5</h4>
        </div>
          
        
      </div>
</div>
);
}

export default App;
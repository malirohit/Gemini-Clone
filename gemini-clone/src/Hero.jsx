

import React, { useContext } from 'react';
import './Hero.css';
import user_icon from '/user_icon.png';
import compass_icon from '/compass_icon.png';
import bulb_icon from '/bulb_icon.png';
import message_icon from '/message_icon.png';
import code_icon from '/code_icon.png';
import gallery_icon from '/gallery_icon.png';
import mic_icon from '/mic_icon.png';
import send_icon from '/send_icon.png';
import gemini_icon from '/gemini_icon.png';
import { Context } from './Context';

const Hero = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, User</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={message_icon} alt="" />
              </div>

              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={gemini_icon} alt="" />

              { loading // if loading is true then display the loader 
              ?
                <div className='loader' >
                   <hr />
                   <hr />
                   <hr />
                </div>
              : <p dangerouslySetInnerHTML={{ __html: resultData }}></p> /* is a special property in React that allows you to directly set the HTML content of a DOM element. It is a way to render raw HTML code within a React component,  */
              }

            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => { setInput(e.target.value) }} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={gallery_icon} alt="" />
              <img src={mic_icon} alt="" />
              {input? <img onClick={() => { onSent() }} src={send_icon} alt="" /> :null} 
            </div>
          </div>
          <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check it</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// import React, { useContext, useState } from 'react'
// import './Sidebar.css'
// import menu_icon from '/menu_icon.png'
// import plus_icon from '/plus_icon.png'
// import message_icon from '/message_icon.png'
// import question_icon from '/question_icon.png'
// import history_icon from '/history_icon.png'
// import setting_icon from '/setting_icon.png'
// import { Context } from './Context'

// const Sidebar = () => {

//    const [extended,setExtended] = useState(false);
//    const {onSent,prevPrompts,setRecentPrompt}=useContext(Context)


//   return (
//     <div className='sidebar' >

//        <div className="top">

//             <img onClick={ ()=>{
//                 setExtended(prev => !prev ) // return the opposite of previous value
//             } } className='menu' src={menu_icon} alt="" />

//             <div className="new-chat">
//                   <img src={plus_icon} alt="" />
//                   {extended?<p>New Chat</p>:null}
//             </div>

//            { extended?
//              <div className="recent">
//                <p className='recent-title' >Recent</p>
//                { prevPrompts.map( (item,index)=>{
//                  return (
//                     <div className="recent-entry">
//                       <img src={message_icon} alt="" />
//                       <p>{item}...</p>
//                     </div>
//                   )
//                  } )
//                }        
//             </div>
//            :null}
            
//        </div>

//        <div className="bottom">

//            <div className="bottom-item recent-entry">
//             <img src={question_icon} alt="" />
//             {extended?<p>Help</p>:null}
//            </div>

//            <div className="bottom-item recent-entry">
//             <img src={history_icon} alt="" />
//             {extended?<p>Activity</p>:null}
//            </div>

//            <div className="bottom-item recent-entry">
//             <img src={setting_icon} alt="" />
//             {extended?<p>Settings</p>:null}
//            </div>

//        </div>

//     </div>
//   )
// }

// export default Sidebar

import React, { useContext, useState } from 'react';
import './Sidebar.css';
import menu_icon from '/menu_icon.png';
import plus_icon from '/plus_icon.png';
import message_icon from '/message_icon.png';
import question_icon from '/question_icon.png';
import history_icon from '/history_icon.png';
import setting_icon from '/setting_icon.png';
import { Context } from './Context';

const Sidebar = () => {

  const [extended, setExtended] = useState(false);
  const { prevPrompts,newChat } = useContext(Context);

  //onside bar , when click on recent chat it should display the data
  const loadPrompt = async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className='sidebar'>

      <div className="top">
        <img
          onClick={() => {
            setExtended((prev) => !prev); // return the opposite of previous value
          }}
          className='menu'
          src={menu_icon}
          alt=""
        />

        <div onClick={ ()=>{ newChat() } }  className="new-chat">
          <img src={plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.map( (item, index) => (
              <div onClick={ ()=>{loadPrompt(item) } } className="recent-entry" key={index}>
                <img src={message_icon} alt="" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">

        <div className="bottom-item recent-entry">
          <img src={question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


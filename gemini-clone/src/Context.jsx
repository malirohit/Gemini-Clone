// // import { createContext, useState } from "react";
// // import run from "./gemini";

// // export const Context = createContext();

// // // The value you want the context to have when there is no matching Provider in the tree above the component reading the context. This is meant as a "last resort" fallback.
// // // Lets you create a Context that components can provide or read.
// // // @see — React Docs
// // // @see — React TypeScript Cheatsheet
// // // @example
// // // import { createContext } from 'react';
// // // const ThemeContext = createContext('light');

// // const ContextProvider = (props)=>{



// //   const [input,setInput] = useState("")
// //   const [recentPrompt,setRecentPrompt] = useState("");
// //   const [prevPrompts,setPrevPrompts] = useState([])
// //   const [showResult,setShowResult] = useState(false);
// //   const [loading,setLoading] = useState(false)
// //   const [resultData,setResultData] = useState("")

// //   const onSent = async (prompt)=>{

// //     setResultData("")
// //     setLoading(true)
// //     setShowResult(true)
// //     setRecentPrompt(input)
// //     const response =  await run(input)
// //     setResultData(response)
// //     setLoading(false)
// //     setInput("")
// //   }

// //   onSent("What is react js")

// //     const contextValue = {
// //         prevPrompts,
// //         setPrevPrompts,
// //         onSent,
// //         setRecentPrompt,
// //         recentPrompt,
// //         showResult,
// //         loading,
// //         resultData,
// //         input,
// //         setInput
// //     }

// //     return (
// //         <Context.Provider  value={contextValue}>
// //             {props.children}
// //         </Context.Provider>
// //     )
// // }

// // export default ContextProvider

// import { createContext, useState } from "react";
// import run from "./gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   // Adding the typing effect
//   const delayPara = (index,nextWord)=>{
//            setTimeout( function () {
//               setResultData(prev => prev+nextWord )
//            }, 75*index);
//   }


//   const onSent = async () => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     setRecentPrompt(input);  
//     setPrevPrompts( (prev)=>{ [...prev,input] } )
//     const response = await run(input);

//     // Till now we are getting response in **---** . So now we will write a logic to remove it.
//     let responseArray = response.split("**");
//     let newResponse;
//     for(let i = 0 ; i<responseArray.length;i++)
//     {
//         if( i===0 || i%2 !== 1 ) // if index is even or zero
//             { newResponse += responseArray[i]; }// add each word in newArray
//         else {
//             newResponse += "<b>"+responseArray[i]+"</b>" // make words between **---** bold
//         }
//     }
//     //Till now we are getting single star , so 

//     let newResponse2 = newResponse.split("*").join("</br>"); // where the single star is remove it and add break line at their.
//     let newResponseArray = newResponse2.split(" "); //space means new word
//     for(let i = 0 ; i<newResponseArray.length;i++)
//     {
//         const nextWord = newResponseArray[i];
//         delayPara(i,nextWord + " ");
//     }

//     //setResultData(newResponse2);
//     setLoading(false);
//     setInput("");
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;

import { createContext, useState } from "react";
import run from "./gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Adding a typing effect
  const delayPara = (index, nextWord) => {
    setTimeout( function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
 
  const newChat = ()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    setRecentPrompt(input);

    setPrevPrompts((prev) => [...prev, input]); // Correctly updating the state
    const response = await run(input);

    



    // Till now we are getting response in **---** . So now we will write a logic to remove it.
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        // if index is even or zero
        newResponse += responseArray[i]; // add each word in newArray
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"; // make words between **---** bold
      }
    }

    //Till now we are getting single star , so 
    let newResponse2 = newResponse.split("*").join("</br>"); // where the single star is remove it and add break line at their.
    let newResponseArray = newResponse2.split(" "); //space means new word
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

   
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;


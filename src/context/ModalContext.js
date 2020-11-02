import React,{useState,useEffect, createContext} from 'react';
import axios from 'axios'

export const ModalContext = createContext();

const ModalProvider = (props) => {

 const [idreceta, setIdReceta ] = useState(null);
 const [inforeceta, setReceta ] = useState({});

 useEffect(()=>{
    
   const request = async() =>{
       if(!idreceta)return;
       const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
       const response = await axios(url);
       setReceta(response.data.drinks[0]);
    }

    request();

 },[idreceta])

 return(
     <ModalContext.Provider
     value={{
         inforeceta,
         setReceta,
         setIdReceta
     }}
     >
         {props.children}
     </ModalContext.Provider>
 )

}

export default ModalProvider;
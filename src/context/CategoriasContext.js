import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// crear context
export const CategoriasContext = createContext();

// provider - donde van a salir datos y/o funcionabilidades
const CategoriasProvider = (props) => {
  //crear state del context
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const request = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const response = await axios(url);
      setCategorias(response.data.drinks);
    };
    request();
  }, []);

  // lo que va a estar disponible para los componentes
  return (
    <CategoriasContext.Provider
      value={{
        categorias,
      }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;

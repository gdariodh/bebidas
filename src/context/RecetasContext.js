import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [busqueda, setRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [recetas, saveRecetas] = useState([]);
  const [consulta, setConsulta] = useState(false);
  const { nombre, categoria } = busqueda;

  useEffect(() => {
    if (consulta) {
      const requestApi = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const response = await axios(url);
        saveRecetas(response.data.drinks);
      };

      requestApi();
    }
  }, [busqueda,nombre,categoria,consulta]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        setRecetas,
        setConsulta,
      }}>
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;

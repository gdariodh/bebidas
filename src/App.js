import React from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoRecetas from "./components/ListadoRecetas";
// Context - provider para que este disponible en todos los componentes - como un arbol de datos
import CategoriasProvider from "./context/CategoriasContext";
import RecetasProvider from "./context/RecetasContext";
import ModalProvider from "./context/ModalContext"

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
      <ModalProvider>
        <Header />

        <div className='container mt-5'>
          <div className='row'>
            <Formulario />
          </div>
          <ListadoRecetas />
        </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;

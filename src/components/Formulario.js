// consumir context
import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  const { categorias } = useContext(CategoriasContext);
  const { setRecetas, setConsulta } = useContext(RecetasContext);

  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  const handleSet = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className='col-12'
      onSubmit={(e) => {
        e.preventDefault();
        setRecetas(busqueda);
        setConsulta(true);
      }}>
      <fieldset className='text-center'>
        <legend>Busca bebidas por categoria o ingrediente</legend>
      </fieldset>

      <div className='row mt-4'>
        <div className='col-md-4'>
          <input
            name='nombre'
            className='form-control'
            type='text'
            placeholder='Buscar por ingrediente'
            onChange={handleSet}
          />
        </div>

        <div className='col-md-4'>
          <select
            className='form-control'
            name='categoria'
            onChange={handleSet}>
            <option value=''>--Selecciona Categoria--</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className='col-md-4'>
          <input
            type='submit'
            className='btn btn-block btn-primary'
            value='Buscar bebidas'
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;

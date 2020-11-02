import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types'

// Modal material-UI
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "100%",
    maxHeight: 500,
    display: "block",
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
  },
}));

const Receta = ({ receta }) => {
  // config modal
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //context
  const { setIdReceta, inforeceta, setReceta } = useContext(ModalContext);

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = (e) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (e[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {e[`strIngredient${i}`]}
            {e[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className='col-md-4 mb-3'>
      <div className='card'>
        <h2 className='card-header'>{receta.strDrink}</h2>
        <img
          className='card-img-top'
          src={receta.strDrinkThumb}
          alt={`imagen de ${receta.strDrink}`}
        />

        <div className='card-body'>
          <button
            type='button'
            className='btn btn-block btn-primary'
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}>
            Ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              setReceta({});
              handleClose();
            }}>
            <div className={classes.paper} style={modalStyle}>
              <h2>{inforeceta.strDrink}</h2>
              <h3 className='mt-4'>Instrucciones</h3>
              <p>{inforeceta.strInstructions}</p>
              <img
                className='img-fluid my-4'
                src={inforeceta.strDrinkThumb}
                alt={inforeceta.strDrink}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(inforeceta)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

Receta.propTypes = {
    receta:PropTypes.object.isRequired
}

export default Receta;

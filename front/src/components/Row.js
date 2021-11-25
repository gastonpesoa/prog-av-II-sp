import React from 'react'
import { Link } from 'react-router-dom';

const Row = ({ mascota, setMascotaEdit, borrarMascota }) => {
    const { id, nombre, tipo } = mascota;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
                <Link to={`mascota/${id}`}>
                    <button
                        className="button is-success mr-2"
                    >
                        Detalle
                    </button>
                </Link>
                <button
                    className="button is-warning mr-2"
                    onClick={() => {
                        setMascotaEdit(mascota)
                    }}
                >
                    Modificar
                </button>
                <button
                    className="button is-danger"
                    onClick={() => { borrarMascota(id) }}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Row

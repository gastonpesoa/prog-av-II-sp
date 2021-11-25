import React from 'react'
import Row from './Row'

const Table = ({ data, setMascotaEdit, borrarMascota }) => {
    return (<>
        <h2 className="subtitle">Lista de Mascotas</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.length
                    ? (data.map(mascota => (
                        <Row
                            key={mascota.id}
                            mascota={mascota}
                            setMascotaEdit={setMascotaEdit}
                            borrarMascota={borrarMascota}
                        />)))
                    : <tr><td colSpan={3}>No hay datos</td></tr> }
            </tbody>
        </table>
    </>
    )
}

export default Table

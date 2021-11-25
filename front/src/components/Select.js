import React, { useEffect, useState } from 'react'

const URL = "http://localhost:3000/api/tipos/";

const Select = ({name, value, onSelectChange}) => {

    const [tipos, setTipos] = useState([])

    useEffect(() => {
        const getTipos = async (url) => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setTipos(data.data)
            } catch (error) {

            }
        }
        getTipos(URL)
    }, [])
    
    const handleChange = (e) => {
        onSelectChange(e.target.value)
    }

    return (

        <select name={name} value={value} onChange={handleChange} >
            <option value="default" disabled>Seleccioná un tipo</option>
             {
                tipos.map((tipo) => {
                    return <option key={tipo.id} value={tipo.descripcion}>
                        {tipo.descripcion}
                    </option>
                })
            }
        </select>
    )
}

export default Select

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Titulo from '../components/Titulo';

const URL = "http://localhost:3000/api/users/"

const initialForm = {
    username: "",
    password: ""
}

const Registro = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState(initialForm)
    const { username, password } = form;
    const handledChange = (e) => {
        setForm((form) => {
            return {
                ...form,
                [e.target.name]: e.target.value
            }
        })
    }
    const handledSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Faltan datos")
            return;
        } else {
            console.log(`login`)
            registrarUsuario()
        }
        handledReset();
    }
    const handledReset = (e) => {
        setForm(initialForm);
    }
    const registrarUsuario = () => {
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert("La contraseña debe tener 6 caracteres")
                } else {
                    alert("Usuario creado okey")
                    navigate('/login')
                }
            })
    }

    return (
        <div className="container">
            <div className="columns">
                <div className="column">
                    <section className="section">
                        <Titulo>REGISTRO DE USUARIO</Titulo>
                        <form onSubmit={handledSubmit}>
                            <div className="field">
                                <label className="label">Usuario</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        autoComplete="false"
                                        value={username}
                                        onChange={handledChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Contraseña</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        autoComplete="false"
                                        value={password}
                                        onChange={handledChange}
                                    />
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button
                                        className="button is-link mr-5"
                                        type="submit"
                                    >Registrar</button>
                                    <button
                                        className="button is-link"
                                        type="reset"
                                        onClick={handledReset}
                                    >Cancelar</button>
                                </div>
                            </div>
                        </form>
                        <Link to="/login">
                            <button class="button is-text">Logearse</button>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Registro

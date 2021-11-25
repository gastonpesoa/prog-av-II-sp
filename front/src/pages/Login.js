import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Titulo from '../components/Titulo';

const URL = "http://localhost:3000/api/login/"

const initialForm = {
    username: "",
    password: ""
}

const Login = () => {
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
            alert("Usuario o contraseña incorrecta")
            return;
        } else {
            console.log(`login`)
            login()
        }
        handledReset();
    }
    const handledReset = (e) => {
        setForm(initialForm);
    }
    const login = () => {
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert("Usuario o contraseña incorrecta")
                } else {
                    console.log(`data`, data)
                    localStorage.setItem("token", data.token);
                    navigate('/')
                }
            })
    }

    return (
        <div className="container">
            <div className="columns">
                <div className="column">
                    <section className="section">
                        <Titulo>INGRESO DE USUARIO</Titulo>
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
                                    >Ingresar</button>
                                    <button
                                        className="button is-link"
                                        type="reset"
                                        onClick={handledReset}
                                    >Cancelar</button>
                                </div>
                            </div>
                        </form>
                        <Link to="/registro">
                            <button class="button is-text">Crear usuario</button>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Login

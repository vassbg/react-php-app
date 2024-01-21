import React, { useState, useContext, useRef } from "react"
import { AdminContext } from "../../context/AdminContext"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

import "./login.css"

function Login() {
    const { setAdmin } = useContext(AdminContext)
    const navigate = useNavigate()
    const [err, setErr] = useState("")

    const loginEmail = useRef()
    const loginPass = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        setErr("")

        const email = loginEmail.current.value
        const pass = loginPass.current.value

        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", pass)

        fetch("http://localhost/wm/api/admin/login", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.error) {
                    setErr(data.error)
                } else{
                    setAdmin(data.data)
                    localStorage.setItem("user", JSON.stringify(data.data))
                    navigate("/")
                }
            })
    }

    return (
        <main className="loginContainer">
            <Form id="loginForm" onSubmit={handleSubmit}>
                <h1 className="loginTitle">Вход</h1>
                <p className="loginError">{err}</p>
                <Form.Control
                    className="loginInputText"
                    type="email"
                    ref={loginEmail}
                    placeholder="name@example.com"
                    required
                />
                <Form.Control
                    className="loginInputText"
                    type="password"
                    ref={loginPass}
                    placeholder="Password"
                    required
                />
                <Button type="submit" className="loginBtn">
                    Вход
                </Button>
            </Form>
        </main>
    )
}

export default Login

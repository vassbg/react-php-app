import { useContext, useEffect } from "react"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"

function RequireAuth({ children }) {
    const { admin, setAdmin } = useContext(AdminContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!admin) {
            const adminFromLocalStorage = JSON.parse(
                localStorage.getItem("admin")
            )
            if (adminFromLocalStorage) {
                setAdmin(adminFromLocalStorage)
            }
            else{
                navigate("/login")
            }
        }
    }, [navigate, setAdmin, admin])

    return admin && children
}

export default RequireAuth

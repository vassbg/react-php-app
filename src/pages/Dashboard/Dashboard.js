import { useContext } from 'react'
import { AdminContext } from "../../context/AdminContext"

function Dashboard() {

    const { admin, unsetAdmin } = useContext(AdminContext)

    console.log(admin)
    return (
        <div className="main">
            <div className="dashboard main" onClick={unsetAdmin}>
                DASHBOARD
            </div>
        </div>
    )
}

export default Dashboard

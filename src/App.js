import "./assets/css/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/Login/Login"
import RequireAuth from "./lib/RequireAuth"
import { AdminProvider } from "./context/AdminContext"
import NotFound from "./templates/NotFound/NotFound"

function App() {
    return (
        <AdminProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AdminProvider>
    )
}

export default App

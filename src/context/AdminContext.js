// create context to store a json with all user data

import React, { createContext, useState } from "react";

const AdminContext = createContext();

function AdminProvider({ children }) {
    const [admin, setAdmin] = useState(null);

    const unsetAdmin = () => {
        localStorage.removeItem("admin");
        setAdmin(null);
    };
    
    return (
        <AdminContext.Provider value={{ admin, setAdmin, unsetAdmin }}>
        {children}
        </AdminContext.Provider>
    );
}

export { AdminContext, AdminProvider };
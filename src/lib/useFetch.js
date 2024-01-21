import { useState, useEffect, useContext } from "react"
import { AdminContext } from "../context/AdminContext"

const useFetch = (endpoint, jsonData) => {

    const { admin } = useContext(AdminContext)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const baseUrl = "http://localhost/wm/api/"

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const formData = new FormData();

                Object.entries(jsonData).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const response = await fetch(`${baseUrl}/${endpoint}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                    body: formData,
                })

                const result = await response.json()

                if (result.error.code) {
                    setError(result.error.mesage)
                }
                else{
                    setData(result)
                }
            } 
            catch (error) {
                setError(error.mesage)
            } 
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [endpoint, jsonData, admin.token])

    return { data, loading, error }
}

export default useFetch

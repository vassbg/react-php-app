import "./NotFound.css"
import NotFoundImage from "../../assets/images/404.svg"
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="not-found">
            <img src={NotFoundImage} alt="404" />
            <h1>Страницата не е намерена</h1>
            <Link to="/"><p>Начало</p></Link>
        </div>
    )
}

export default NotFound

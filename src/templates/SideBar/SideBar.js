import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {
    FileEarmarkMedical,
    BuildingCheck,
    PersonWorkspace,
} from "react-bootstrap-icons"
import logo from "../../assets/images/logo/logo-color-sm.svg"
import "./SideBar.css"
import { UserContext } from "../../context/UserContext"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Popover from "react-bootstrap/Popover"

function SideBar() {
    const { user, logout } = useContext(UserContext)

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="menu">
                <Link to="/">
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Потребители</Tooltip>}
                    >
                        <FileEarmarkMedical size={28} className="side-icons" />
                    </OverlayTrigger>
                </Link>
                <Link to="/organizations">
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Организации</Tooltip>}
                    >
                        <BuildingCheck size={26} className="side-icons" />
                    </OverlayTrigger>
                </Link>
            </div>
            <div className="system">
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={
                        <Popover>
                            <Popover.Header as="h3">{user.name}</Popover.Header>
                            <Popover.Body>
                                <p
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        color: "#00c",
                                    }}
                                    onClick={logout}
                                >
                                    Изход
                                </p>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <PersonWorkspace size={26} color={"#556"} />
                </OverlayTrigger>
            </div>
        </div>
    )
}

export default SideBar

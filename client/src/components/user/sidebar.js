import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/user"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    {/* <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{marginRight:"15px"}}
                    >
                      Products
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{color:"black"}}
                        >
                          All
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{color:"black"}}
                        >
                          Create
                        </Link>
                      </li>
                    </ul>
                  </li> */}


                    {/* <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li> */}

                    <li>
                        <Link to="/user/userProfile"><i className="fa fa-users"></i>Profile</Link>
                    </li>

                    {/* <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li> */}

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import avatarPlaceholder from "../assets/avatar_placholder.png";

const Navbar = () => {
  const [openBasic, setOpenBasic] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !avatarRef.current.contains(event.target)
    ) {
      // Clicked outside the dropdown, close it
      setOpenAvatar(false);
    }
  };

  useEffect(() => {
    // Attach the event listener on mount
    document.addEventListener("click", handleClickOutside);

    // Detach the event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {};

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer>
        <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="#">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">Link</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink
                disabled
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                Disabled
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <ul className="navbar-nav ml-auto nav-flex-icons position-relative">
            <li className="nav-item avatar">
              <a
                className="nav-link p-0"
                ref={avatarRef}
                onClick={() => setOpenAvatar(!openAvatar)}
              >
                <img
                  // src={userAvatar}
                  src={avatarPlaceholder}
                  className="rounded-circle z-depth-0"
                  // alt="avatar image"
                  height="35"
                />
              </a>
            </li>
            <div
              ref={dropdownRef}
              className={`dropdown-menu dropdown-menu-lg-right dropdown-secondary ${
                openAvatar ? "show" : ""
              }`}
              aria-labelledby="navbarDropdownMenuLink-55"
            >
              <Link
                to="/details"
                className="dropdown-item waves-effect waves-light"
                href="#"
              >
                Profile
              </Link>
              <Link
                to="/"
                className="dropdown-item waves-effect waves-light"
                href="#"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </ul>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};
export default Navbar;

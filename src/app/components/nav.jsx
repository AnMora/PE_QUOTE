"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logout } from "../actions/auth";
export default function NavComponent({ dataUser, authUser, isNurse, isAdmin }) {
  const basePath = isAdmin ? "/admin/dashboard" : "/dashboard";
  const data = dataUser;
  const pathname = usePathname();
  useEffect(() => {
    const sidebarButton = document.body.querySelector("#sidebarToggle");
    const handleSidebarToggle = (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    };
    if (sidebarButton) {
      sidebarButton.addEventListener("click", handleSidebarToggle);
    }
    return () => {
      if (sidebarButton) {
        sidebarButton.removeEventListener("click", handleSidebarToggle);
      }
    };
  }, []);
  useEffect(() => {
    document.body.classList.remove("sb-sidenav-toggled");
    localStorage.removeItem("sb|sidebar-toggle");
  }, [pathname]);
  const links = [
    {
      href: `${basePath}/${authUser ? authUser._id.toString() : ""}`,
      text: "Perfil",
    },
    {
      href: "#",
      text: "Cerrar Sesión",
      isButton: true,
      action: logout,
    },
  ];
  return (
    <>
      <nav
        id="mainNav"
        className="sb-topnav navbar navbar-expand navbar-light bg-body-tertiary"
      >
        <Link className="navbar-brand ps-3 text-primary" href="#!">
          {data.generalInformation.websiteName}
        </Link>
        <button
          className="btn btn-link btn-lg order-1 order-lg-0 me-4 me-lg-0 text-warning"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          {/* <div className="input-group"> 
            <input 
              className="form-control" 
              type="text" 
              placeholder="Buscar..." 
              aria-label="Buscar..." 
              aria-describedby="btnNavbarSearch" 
            /> 
            <button 
              className="btn btn-primary" 
              id="btnNavbarSearch" 
              type="button" 
            > 
              <i className="fas fa-search"></i> 
            </button> 
          </div> */}
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-info"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="small p-1">{authUser.firstName}</span>
              <i className="fas fa-user fa-fw"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              {links.map((link, index) => (
                <li key={index}>
                  {link.isButton ? (
                    <form action={link.action}>
                      <button className="dropdown-item">{link.text}</button>
                    </form>
                  ) : (
                    <Link className="dropdown-item" href={link.href}>
                      {link.text}
                    </Link>
                  )}
                  {/* {link.isButton && <hr className="dropdown-divider" />} */}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

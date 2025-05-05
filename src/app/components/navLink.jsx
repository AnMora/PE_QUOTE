"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinkComponent({ dataUser, authUser }) {
  const data = dataUser;
  const patname = usePathname();

  const PageDashboard = data.pageDashboard.map((item, position) => {
    return (
        <div key={position}>
          <Link className="nav-link" href={item.path}>
            <div className="sb-nav-link-icon">
              <i className={item.icon}></i>
            </div>
            {item.session}
          </Link>
        </div>
    );
  });

  const PageInterface = data.pageInterface.map((item, position) => {
    return (
        <div key={position}>
          <Link className="nav-link" href={item.path}>
            <div className="sb-nav-link-icon">
              <i className={item.icon}></i>
            </div>
            {item.session}
          </Link>
        </div>
    );
  });

  const PageAddons = data.pageAddons.map((item, position) => {
    return (
        <div key={position}>
          <Link className="nav-link" href={item.path}>
            <div className="sb-nav-link-icon">
              <i className={item.icon}></i>
            </div>
            {item.session}
          </Link>
        </div>
    );
  });

  return (
    <>
      {/* <Link
        className={`nav-link ${patname === href ? "nav-link active" : ""}`}
        href={href ? href : ""}
      >
        {label}
      </Link> */}

      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Panel Principal</div>
            {PageDashboard}
            <div className="sb-sidenav-menu-heading">Interfaces</div>
            {PageInterface}
            <div className="sb-sidenav-menu-heading">Complementos</div>
            {PageAddons}
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Iniciado sesión por:</div>
          {authUser.firstName} {authUser.lastName}
        </div>
      </nav>
    </>
  );
}

"use client";
import Link from "next/link";
export default function NavLinkComponent({
  dataUser,
  authUser,
  isNurse,
  isAdmin,
}) {
  const data = dataUser;
  const renderLinks = (items) => {
    return items.map((item, position) => (
      <div key={position}>
        <Link className="nav-link" href={item.path}>
          {item.icon && (
            <div className="sb-nav-link-icon">
              <i className={item.icon}></i>
            </div>
          )}
          {item.session}
        </Link>
      </div>
    ));
  };
  const renderAdminNav = () => (
    <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading text-info">Panel Principal</div>
          {renderLinks(data.pageDashboard)}

          <div className="sb-sidenav-menu-heading text-success">Interfaces</div>
          {/* Dropdown para listado de usuarios */}
          <a
            className="nav-link collapsed"
            href="#"
            data-bs-toggle="collapse"
            data-bs-target="#Information"
            aria-expanded="false"
            aria-controls="collapsePages"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-book-open text-success"></i>
            </div>
            Listado de usuarios
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down text-success"></i>
            </div>
          </a>
          <div
            className="collapse"
            id="Information"
            aria-labelledby="headingTwo"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav rounded">
              {/* Dropdown para Administradores */}
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#InfoAdmins"
                aria-expanded="false"
                aria-controls="InfoAdmins"
              >
                Administradores
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down text-success"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="InfoAdmins"
                aria-labelledby="headingOne"
                data-bs-parent="#Information"
              >
                <nav className="sb-sidenav-menu-nested nav rounded">
                  {renderLinks(data.pageInformationAdmins)}
                </nav>
              </div>
              {/* Dropdown para Enfermeros */}
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#InfoNurses"
                aria-expanded="false"
                aria-controls="InfoNurses"
              >
                Enfermeros
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down text-success"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="InfoNurses"
                aria-labelledby="headingTwo"
                data-bs-parent="#Information"
              >
                <nav className="sb-sidenav-menu-nested nav rounded">
                  {renderLinks(data.pageInformationNurses)}
                </nav>
              </div>
              {/* Dropdown para Empleados */}
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#InfoUsers"
                aria-expanded="false"
                aria-controls="InfoUsers"
              >
                Empleados
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down text-success"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="InfoUsers"
                aria-labelledby="headingThree"
                data-bs-parent="#Information"
              >
                <nav className="sb-sidenav-menu-nested nav rounded">
                  {renderLinks(data.pageInformationUsers)}
                </nav>
              </div>
            </nav>
          </div>
          {/* Dropdown para listado de insumos */}
          <a
            className="nav-link collapsed"
            href="#"
            data-bs-toggle="collapse"
            data-bs-target="#Inputs"
            aria-expanded="false"
            aria-controls="collapseInputs"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-book-open text-success"></i>
            </div>
            Listado de insumos
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down text-success"></i>
            </div>
          </a>
          <div
            className="collapse"
            id="Inputs"
            aria-labelledby="headingThree"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav rounded">
              {renderLinks(data.pageInputs)}
            </nav>
          </div>
          <div className="sb-sidenav-menu-heading text-danger">Complementos</div>
          {renderLinks(data.pageAddons)}
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Iniciado sesión por:</div>
        <span className="text-info">Admin {authUser.firstName}</span>
      </div>
    </nav>
  );
  const renderNurseNav = () => (
    <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading text-info">Panel Principal</div>
          {renderLinks(data.pageDashboard)}
          <div className="sb-sidenav-menu-heading text-success">Interfaces</div>
          {renderLinks(data.pageInterface)}
          <div className="sb-sidenav-menu-heading text-danger">Complementos</div>
          {renderLinks(data.pageAddons)}
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Iniciado sesión por:</div>
        <span className="text-info">
          {authUser.firstName} {authUser.lastName}
        </span>
      </div>
    </nav>
  );
  const renderUserNav = () => (
    <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading text-info">Panel Principal</div>
          {renderLinks(data.pageDashboard)}
          <div className="sb-sidenav-menu-heading text-success">Interfaces</div>
          {renderLinks(data.pageInterface)}
          <div className="sb-sidenav-menu-heading text-danger">Complementos</div>
          {renderLinks(data.pageAddons)}
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Iniciado sesión por:</div>
        <span className="text-info">
          {authUser.firstName} {authUser.lastName}
        </span>
      </div>
    </nav>
  );
  return (
    <>
      {isAdmin && renderAdminNav()}
      {isNurse && renderNurseNav()}
      {!isAdmin && !isNurse && renderUserNav()}
    </>
  );
}
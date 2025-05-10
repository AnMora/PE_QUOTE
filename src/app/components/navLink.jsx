"use client";

import Link from "next/link";

export default function NavLinkComponent({ dataUser, authUser, isAdmin }) {
  const data = dataUser;

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

  // **OPCIONES PARA NAV ADMIN
  const PageInterfaceRegister = data.pageInterface.map((item, position) => {
    return (
      <div key={position}>
        <a className="nav-link" href={item.path}>
          {item.session}
        </a>
      </div>
    );
  });

  // ** OPCIONES PARA NAV USUARIO
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

  // ** REVISAR BIEN QUE OPCIONES SE DESEAN PARA EL LADO ADMINISTRADOR - QUE IMPORTA? - QUE DEBE SER UIL VER?

  return (
    <>
      {isAdmin ? (
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Panel Principal</div>
              {PageDashboard}
              <div className="sb-sidenav-menu-heading">Interfaces</div>
              {/* {PageInterface}
            {PageInterfaceRegister} */}

              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                Registrar
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  {PageInterfaceRegister}
                </nav>
              </div>

              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                Pages
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <a
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAuth"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAuth"
                  >
                    Authentication
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseAuth"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="login.html">
                        Login
                      </a>
                      <a className="nav-link" href="register.html">
                        Register
                      </a>
                      <a className="nav-link" href="password.html">
                        Forgot Password
                      </a>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseError"
                    aria-expanded="false"
                    aria-controls="pagesCollapseError"
                  >
                    Error
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseError"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="401.html">
                        401 Page
                      </a>
                      <a className="nav-link" href="404.html">
                        404 Page
                      </a>
                      <a className="nav-link" href="500.html">
                        500 Page
                      </a>
                    </nav>
                  </div>
                </nav>
              </div>

              <div className="sb-sidenav-menu-heading">Complementos</div>
              {PageAddons}
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Iniciado sesión por:</div>
            <span>Admin {authUser.firstName}</span>
          </div>
        </nav>
      ) : (
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
            <span>
              {authUser.firstName} {authUser.lastName}
            </span>
          </div>
        </nav>
      )}
    </>
  );
}

const CUPPanelAdmin = {
  pageDashboard: [
    {
      path: "/admin/dashboard",
      session: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
  ],
  pageInterface: [
    {
      path: "/admin/register/register-admin",
      session: "Administradores",
      icon: "fas fa-table",
    },
    {
      path: "/admin/register/register-user",
      session: "Empleados",
      icon: "fas fa-table",
    },
  ],
  // VERIFICAR SI HACEMOS LOS LISTADOS EN PAGINAS INDEPENDIENTES O BIEN EN UNO SOLO
  pageList: [
    {
      path: "/admin/list/list-admin",
      session: "Lista de usuarios",
      icon: "fas fa-tachometer-alt",
    },
    {
      path: "/admin/list/list-users",
      session: "Lista de usuarios",
      icon: "fas fa-tachometer-alt",
    }
  ],
  pageAddons: [
    {
      path: "/admin/proformas",
      session: "Proformas",
      icon: "fas fa-columns",
    },
    {
      path: "/admin/convenios",
      session: "Convenios",
      icon: "fas fa-book-open",
    },
  ],
  generalInformation: {
    websiteName: "Cotizador PE",
    description: "Cotizador de pediatria - emergencias",
    medicalCenter: "Hospital Metropolitano",
  },
};

export default CUPPanelAdmin;

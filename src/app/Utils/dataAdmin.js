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
      path: "/admin/register/register-nurse",
      session: "Enfermeros",
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
      session: "Lista de administradores",
      icon: "fas fa-tachometer-alt",
    },
    {
      path: "/admin/list/list-nurse",
      session: "Lista de enfermeria",
      icon: "fas fa-tachometer-alt",
    },
    {
      path: "/admin/list/list-users",
      session: "Lista de empleados",
      icon: "fas fa-tachometer-alt",
    }
  ],
  pageAddons: [
    {
      path: "/admin/assents",
      session: "Consentimientos",
      icon: "fas fa-book-open",
    },
    {
      path: "/admin/formal",
      session: "Proformas",
      icon: "fas fa-columns",
    }   
  ],
  generalInformation: {
    websiteName: "Cotizador PE",
    description: "Cotizador de pediatria - emergencias",
    medicalCenter: "Hospital Metropolitano",
  },
};

export default CUPPanelAdmin;

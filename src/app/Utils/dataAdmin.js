const CUPPanelAdmin = {
  pageDashboard: [
    {
      path: "/admin/dashboard",
      session: "Dashboard",
      icon: "fas fa-tachometer-alt text-info",
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
  pageInformationAdmins: [
    {
      path: "/admin/information/admins/register-admins",
      session: "Registrar",
      icon: "fas fa-table text-success",
    },
    {
      path: "/admin/information/admins/show-admins",
      session: "Actualizar",
      icon: "fas fa-table text-success",
    },
    // {
    //   path: "/admin/information/edit-user",
    //   session: "Empleados",
    //   icon: "fas fa-table",
    // },
  ],
  pageInformationNurses: [
    {
      path: "/admin/information/nurses/register-nurses",
      session: "Registrar",
      icon: "fas fa-table text-success",
    },
    {
      path: "/admin/information/nurses/show-nurses",
      session: "Actualizar",
      icon: "fas fa-table text-success",
    },
    // {
    //   path: "/admin/register/register-user",
    //   session: "Empleados",
    //   icon: "fas fa-table",
    // },
  ],
  pageInformationUsers: [
    {
      path: "/admin/information/users/register-users",
      session: "Registrar",
      icon: "fas fa-table text-success",
    },
    {
      path: "/admin/information/users/show-users",
      session: "Actualizar",
      icon: "fas fa-table text-success",
    },
    // {
    //   path: "/admin/register/register-user",
    //   session: "Empleados",
    //   icon: "fas fa-table",
    // },
  ],
  pageInputs: [
    {
      path: "/admin/inputs/register-inputs",
      session: "Registrar",
      icon: "fas fa-table text-success",
    },
    {
      path: "/admin/inputs/show-inputs",
      session: "Actualizar",
      icon: "fas fa-table text-success",
    },
    // {
    //   path: "/admin/inputs/delete-inputs",
    //   session: "Eliminar Insumos",
    //   icon: "fas fa-table",
    // },
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
      icon: "fas fa-book-open text-danger",
    },
    {
      path: "/admin/formal",
      session: "Proformas",
      icon: "fas fa-columns text-danger",
    }   
  ],
  generalInformation: {
    websiteName: "Cotizador PE",
    description: "Cotizador de pediatria - emergencias",
    medicalCenter: "Hospital Metropolitano",
  },
};

export default CUPPanelAdmin;

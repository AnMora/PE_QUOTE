const CUPPanelAdmin = {
    pageDashboard: [
      {
        path: "/admin/dashboard",
        session: "Dashboard",
        icon: "fas fa-tachometer-alt"
      },
    ],
    pageInterface: [
      {
        path: "/admin/register",
        session: "Registrar Admin",
        icon: "fas fa-book-open"
      },
      {
        path: "/admin/register",
        session: "Registrar Usuario",
        icon: "fas fa-book-open"
      },
    ],
    pageAddons: [
      {
        path: "/admin/proformas",
        session: "Proformas",
        icon: "fas fa-columns"
      },
      {
        path: "/admin/convenios",
        session: "Convenios",
        icon: "fas fa-table"
      },
    ],
    generalInformation: {
      websiteName: "Cotizador PE",
      description: "Cotizador de pediatria - emergencias",
      medicalCenter: "Hospital Metropolitano",
    },
  };
  
  export default CUPPanelAdmin;
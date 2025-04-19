const CUPPanelUser = {
  pageDashboard: [
    {
      path: "/dashboard",
      session: "Dashboard",
      icon: "fas fa-tachometer-alt"
    },
  ],
  pageInterface: [
    {
      path: "/quotes",
      session: "Cotizador",
      icon: "fas fa-chart-area"
    },
    {
      path: "/suggestions",
      session: "Sugerencias",
      icon: "fas fa-book-open"
    },
  ],
  pageAddons: [
    {
      path: "/proformas",
      session: "Proformas",
      icon: "fas fa-columns"
    },
    {
      path: "/convenios",
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

export default CUPPanelUser;

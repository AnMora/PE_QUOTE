const CUPPanelUser = {
  pageDashboard: [
    {
      path: "/dashboard",
      session: "Dashboard",
      icon: "fas fa-tachometer-alt text-info"
    },
  ],
  pageInterface: [
    {
      path: "/quotes",
      session: "Cotizador",
      icon: "fas fa-table text-success"
    },
    {
      path: "/suggestions",
      session: "Sugerencias",
      icon: "fas fa-book-open text-success"
    },
  ],
  pageAddons: [
    {
      path: "/admin/assents",
      session: "Consentimientos",
      icon: "fas fa-chart-area text-danger",
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

export default CUPPanelUser;
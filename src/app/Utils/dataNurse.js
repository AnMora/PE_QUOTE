const CUPPanelNurse = {
  pageDashboard: [
    {
      path: "/nurse/dashboard",
      session: "Dashboard",
      icon: "fas fa-tachometer-alt"
    },
  ],
  pageInterface: [
    {
      path: "/nurse/quotes",
      session: "Cotizador",
      icon: "fas fa-table"
    },
    {
      path: "/nurse/suggestions",
      session: "Sugerencias",
      icon: "fas fa-book-open"
    },
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

export default CUPPanelNurse;
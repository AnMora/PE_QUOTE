const CUPPanelNurse = {
  pageDashboard: [
    {
      path: "/nurse/dashboard",
      session: "Dashboard",
      icon: "fas fa-tachometer-alt text-info"
    },
  ],
  pageInterface: [
    {
      path: "/nurse/quotes",
      session: "Cotizador",
      icon: "fas fa-table text-success"
    },
    {
      path: "/nurse/suggestions",
      session: "Sugerencias",
      icon: "fas fa-book-open text-success"
    },
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

export default CUPPanelNurse;
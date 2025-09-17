export default function FooterComponent(params) {
  return (
    <div id="layoutAuthentication_footer">
      <footer className="py-1 bg-light mt-auto sb-sidefooter">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-dark">
              Copyright &copy; {new Date().getFullYear()} - Todos los derechos reservados
              por Angel Mora Desarrollador de sitio web
            </div>
            <div className="text-dark">
              <a className="text-info" href="#">Politicas de privacidad </a>
              &middot;
              <a className="text-info" href="#"> Terminos &amp; Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default function FooterComponent(params) {
  return (
    <div id="layoutAuthentication_footer">
      <footer className="py-4 bg-dark mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
              Copyright &copy; {new Date().getFullYear()} - All right reserved
              by AnMora
            </div>
            <div>
              <a href="#">Politicas de privacidad </a>
              &middot;
              <a href="#"> Terminos &amp; Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
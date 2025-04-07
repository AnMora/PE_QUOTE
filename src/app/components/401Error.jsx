import Link from "next/link";

export default function ErrNoAuth(params) {
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center mt-4">
                  <h1 className="display-1">401</h1>
                  <p className="lead">No autorizado</p>
                  <p>Acceso a este recurso fue denegado</p>
                  <Link href="/">
                    <i className="fas fa-arrow-left me-1"></i>
                    Volver al login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

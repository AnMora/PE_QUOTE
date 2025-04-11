export default function Loading() {
  return (
    <main>
      <div className="container">
        <div className="justify-content-center">
          <div className="text-center mt-4">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="lead">Cargando...</p>
          </div>
        </div>
      </div>
    </main>
  );
}

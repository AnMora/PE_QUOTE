import "./css/globals.css";
import "./css/bootstrap.min.css";
import AddBootstrap from "./AddBootstrap";
import NavComponent from "./components/nav";
import FooterComponent from "./components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
      </head>
      <body>
        <main>{children}</main>
        <AddBootstrap />
      </body>
    </html>
  );
}

// ** Link: https://www.youtube.com/watch?v=eGwS3ZtkWtY
// ** Next JS 15 Crash Course for Beginners | 22 Middleware
// ** VER IMAGENES DE TELEGRAM RELACIONADOS AL MIDDLEWARE
// !! VER PROYECTO NEXT_BLOG PARA VERIFICAR COMO USAR EL redirect con [ID]
// ** Ver anotaciones en el cuaderno para seguir con el proyecto

import "./css/globals.css";
import "./css/bootstrap.min.css";
import AddBootstrap from "./AddBootstrap";
import Link from "next/link";
import NavComponent from "./components/nav";
import FooterComponent from "./components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
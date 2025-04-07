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
        {/* <main>{children}</main> */}
        <div>Hola deploy</div>
        <AddBootstrap />
      </body>
    </html>
  );
}

// ** Link: https://www.youtube.com/watch?v=brPYUYiTxb0
// ** Next JS 15 Crash Course for Beginners | 18 Loading and Suspense
// !! VER PROYECTO NEXT_BLOG PARA VERIFICAR COMO USAR EL redirect con [ID]
// ** Project folder: C:\Users\Ángel Mora\Desktop\Desktop\Archivos\Proyectos y Codigos\Templates\startbootstrap-sb-admin-gh-pages
// ** Ver anotaciones en el cuaderno para seguir con el proyecto

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

// ** Link: https://www.youtube.com/watch?v=JA0MTLUxCPc
// ** Next JS 15 Crash Course for Beginners | 19 Update Blog Posts
// ** VER A PARTIR DE MINUTO 18 PARA ENTENDER COMO RELACIONAR USUARIO Y DATOS CREADOS
// !! VER PROYECTO NEXT_BLOG PARA VERIFICAR COMO USAR EL redirect con [ID]
// ** Project folder: C:\Users\Ángel Mora\Desktop\Desktop\Archivos\Proyectos y Codigos\Templates\startbootstrap-sb-admin-gh-pages
// ** Ver anotaciones en el cuaderno para seguir con el proyecto

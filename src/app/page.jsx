import Image from "next/image";
import LoginComponent from "./components/login";
import FooterComponent from "./components/footer";
import RegisterComponent from "./components/register";

export default function Home() {
  return (
      <div id="layoutAuthentication">
        <h1 className="text-center font-weight-light my-2">
          Cotizador Urgencias Pediatricas
        </h1>
        <p className="text-center font-weight-light my-2">
          Bienvenidos al cotizador de urgencias Pediaclinic, para poder
          ingresar digite sus datos de usuario
        </p>
        <LoginComponent />
        {/* <RegisterComponent /> */}
        <FooterComponent />
      </div>
  );
}

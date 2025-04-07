import Image from "next/image";
import LoginComponent from "./components/login";
import RegisterComponent from "./components/register";
import FooterComponent from "./components/footer";

export default function Home() {
  return (
      <div id="layoutAuthentication">
        <h1 className="text-center font-weight-light my-2">
          Cotizador Urgencias Pediatricas
        </h1>
        <p className="text-center font-weight-light my-2">
          Bienvenidos al cotizador de urgencias Pediaclinic, para poder
          ingresar digite sus datos de trabajo
        </p>
        <LoginComponent />
        {/* <RegisterComponent /> */}
        <FooterComponent />
      </div>
  );
}

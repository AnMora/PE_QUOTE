// import Image from "next/image";
import LoginNurse from "../components/loginNurse";
import FooterComponent from "../components/footer";
// import RegisterComponent from "./components/register";

export default function Home() {
  return (
      <div id="layoutAuthentication">
        <h1 className="text-center font-weight-light my-2">
          Enfermería Urgencias Pediatricas
        </h1>
        <p className="text-center font-weight-light my-2">
          Bienvenidos al apartado de enfermería urgencias Pediaclinic, para poder
          ingresar digite sus datos de usuario
        </p>
        <LoginNurse />
        {/* <RegisterComponent /> */}
        <FooterComponent />
      </div>
  );
}
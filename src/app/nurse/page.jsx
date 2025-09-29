import LoginComponent from "@/app/components/LoginComponent";
import { loginNurse } from "@/app/actions/auth";
import FooterComponent from "../components/footer";

export default function nurse() {
  const footerConfig = {
    text: "¿Eres de admisión?",
    href: "/",
    buttonText: "Ir para admisión",
    buttonClass: "btn-success",
    bgColor: "bg-danger",
  };

  return (
    <div id="layoutAuthentication">
      <h1 className="text-center font-weight-light my-2">
        Enfermería Urgencias Pediatricas
      </h1>
      <p className="text-center font-weight-light my-2">
        Bienvenidos al apartado de enfermería urgencias Pediaclinic, para poder
        ingresar digite sus datos de usuario
      </p>
      <LoginComponent
        loginAction={loginNurse}
        title="Enfermería Hospital Metropolitano"
        borderColor="border-danger"
        footerConfig={footerConfig}
      />
      {/* <RegisterComponent /> */}
      <FooterComponent />
    </div>
  );
}

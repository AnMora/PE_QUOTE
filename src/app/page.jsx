import LoginComponent from "@/app/components/LoginComponent";
import { login } from "@/app/actions/auth";
import FooterComponent from "./components/footer";

export default function user() {
  const footerConfig = {
    text: "¿Eres enfermero/a?",
    href: "/nurse",
    buttonText: "Ir a enfermería",
    buttonClass: "btn-danger",
    bgColor: "bg-success",
  };

  return (
    <div id="layoutAuthentication">
      <h1 className="text-center font-weight-light my-2">
        Cotizador Urgencias Pediatricas
      </h1>
      <p className="text-center font-weight-light my-2">
        Bienvenidos al cotizador de urgencias Pediaclinic, para poder ingresar
        digite sus datos de usuario
      </p>
      <LoginComponent
        loginAction={login}
        title="Usuario Hospital Metropolitano"
        borderColor="border-success"
        footerConfig={footerConfig}
      />
      <FooterComponent />
    </div>
  );
}

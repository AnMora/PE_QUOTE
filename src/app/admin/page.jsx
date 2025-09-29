import FooterComponent from "../components/footer";
import LoginComponent from "@/app/components/LoginComponent";
import { loginAdmin } from "@/app/actions/auth";

export default function admin() {
  return (
    <div id="layoutAuthentication">
      <h1 className="text-center font-weight-light my-2">Administración</h1>
      <p className="text-center font-weight-light my-2">
        Administrador para cotizaciones de urgencias Pediaclinic, para poder
        ingresar digite sus datos de administrador
      </p>
      <LoginComponent
        loginAction={loginAdmin}
        title="Admin Hospital Metropolitano"
        borderColor="border-dark"
        // No se pasa footerConfig porque no lo necesita
      />
      <FooterComponent />
    </div>
  );
}

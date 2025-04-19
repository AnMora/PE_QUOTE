import getAuthUser from "@/lib/getAuthUser";
import dataUser from "../Utils/dataUser";

import FooterComponent from "../components/footer";
import NavComponent from "../components/nav";
import NavLinkComponent from "../components/navLink";
import Link from "next/link";
import ErrNoAuth from "../components/401Error";

export default async function SuggestionsLayout({ children }) {

  const authUser = await getAuthUser();

  return (
    <>
      {authUser ? (
        <div className="sb-nav-fixed">
        <NavComponent dataUser={dataUser} />
        {/* <FooterComponent /> */}
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <NavLinkComponent dataUser={dataUser} />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-2">
                <div>{children}</div>
              </div>
            </main>
            <FooterComponent dataUser={dataUser} />
          </div>
        </div>
      </div>
      ) : (
        <ErrNoAuth />
      )}
    </>
  );
}
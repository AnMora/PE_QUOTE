import getAuthUser from "@/lib/getAuthUser";
import dataUser from "../../Utils/dataAdmin";

import NavComponent from "@/app/components/nav";
import NavLinkComponent from "@/app/components/navLink";
import FooterComponent from "@/app/components/footer";
import ErrNoAuth from "@/app/components/401Error";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function DashboardLayoutAdmin({ children }) {
  const authUser = await getAuthUser();  
  const authUserId = authUser.userId;
  const userCollection = await getCollection("admin");

  const user =
    authUserId && authUserId.length === 24
      ? await userCollection?.findOne({
          _id: ObjectId.createFromHexString(authUserId),
        })
      : null;
  const sanitizedUser = user
    ? {
        ...user,
        _id: user._id.toString(),
        password: undefined,
      }
    : null;

  return (
    <>
      {authUserId ? (
        <div className="sb-nav-fixed">
          <NavComponent dataUser={dataUser} authUser={sanitizedUser} isAdmin={true} />
          <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <NavLinkComponent dataUser={dataUser} authUser={sanitizedUser} isAdmin={true} />
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
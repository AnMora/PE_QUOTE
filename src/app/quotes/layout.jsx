import getAuthUser from "@/lib/getAuthUser";
import dataUser from "../Utils/dataUser";

import FooterComponent from "../components/footer";
import NavComponent from "../components/nav";
import NavLinkComponent from "../components/navLink";
import Link from "next/link";
import ErrNoAuth from "../components/401Error";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function QuotesLayout({ children }) {
  const authUser = await getAuthUser();
  const authUserId = authUser.userId;
  const userCollection = await getCollection("users");

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
          <NavComponent dataUser={dataUser} authUser={sanitizedUser} isNurse={true} isAdmin={false}/>
          {/* <FooterComponent /> */}
          <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <NavLinkComponent dataUser={dataUser} authUser={sanitizedUser} isNurse={true} isAdmin={false} />
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

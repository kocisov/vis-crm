import {PropsWithChildren} from "react";
import Head from "next/head";

export function Page({
  children,
  loadUser,
}: PropsWithChildren<{loadUser?: boolean}>) {
  return (
    <>
      <Head>
        <title>CRM</title>
      </Head>
      <div className="flex items-start h-full">
        {loadUser ? (
          <div className="flex items-center justify-center w-full h-screen font-semibold text-xl">
            Počkejte prosím, načítáme potřebné data...
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}

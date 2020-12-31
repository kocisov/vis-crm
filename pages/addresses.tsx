import Link from "next/link";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {useApiRequest} from "@/features/hooks/useApiRequest";
import {Address} from "@/database/models/Address";

export default function Addresses() {
  const {user} = useUser({redirectTo: "/login"});
  const {data: addresses} = useApiRequest("/api/addresses/me");

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="flex items-center space-x-1">
          <div className="font-semibold text-lg">Mé adresy</div>
          <Link href="/add-address">
            <div className="bg-black text-white px-2 py-1 font-medium cursor-pointer">
              Přidat novou Adresu
            </div>
          </Link>
        </div>

        <div className="flex flex-col">
          {addresses?.map((address: Address, index: number) => (
            <div className="flex items-center space-x-1" key={address.id}>
              <div className="font-medium">{index + 1}. Adresa</div>
              <div>Město: {address.city}</div>
              <div>Ulice: {address.street}</div>
              <div>Kraj: {address.province}</div>
              <div>PSČ: {address.postal_code}</div>
              <div>{address.active ? "Aktivní" : "Neaktivní"}</div>
              <div>Typ: {address.type}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

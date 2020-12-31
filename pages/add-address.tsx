import {AsideMenu} from "@/features/aside/AsideMenu";
import {Divider} from "@/features/common/Divider";
import {postRequest} from "@/features/common/requests";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {useState} from "react";

export default function AddAddress() {
  const {user} = useUser({redirectTo: "/login"});
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [active, setActive] = useState(false);
  const [typ, setTyp] = useState("");

  const [showCreate, setShowCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function addAddress() {
    const body = {city, street, province, postal, active, typ};
    setLoading(true);
    const result = await postRequest("/api/addresses", body);
    if (result.success) {
      setCity("");
      setStreet("");
      setProvince("");
      setPostal("");
      setActive(false);
      setTyp("");

      setShowCreated(true);
      setTimeout(() => {
        setShowCreated(false);
      }, 4000);
    }
    setLoading(false);
  }

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="flex items-center space-x-2">
          <div className="font-semibold text-lg">Přidat novou Adresu</div>
          <div
            className="bg-black text-white px-2 py-1 font-medium cursor-pointer"
            onClick={addAddress}
          >
            Přidat adresu
          </div>
        </div>
        {showCreate && (
          <>
            <Divider />
            <div className="font-medium">Adresa byla uložena.</div>
            <Divider />
          </>
        )}
        <div className="flex flex-col items-start space-y-2">
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Město"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Ulice"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            required
          />
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Kraj"
            value={province}
            onChange={(event) => setProvince(event.target.value)}
            required
          />
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="PSČ"
            value={postal}
            onChange={(event) => setPostal(event.target.value)}
            required
          />

          <div className="flex items-center space-x-1 text-lg">
            <input
              id="activ"
              type="checkbox"
              checked={active}
              onChange={(event) => setActive(event.target.checked)}
            />
            <label htmlFor="activ">Aktuální adresa</label>
          </div>

          <div className="flex flex-col text-lg">
            Vyberte typ adresy
            <select
              className="border rounded"
              value={typ}
              onChange={(event) => setTyp(event.target.value)}
            >
              <option value="Personal">Osobní</option>
              <option value="Company">Firemní</option>
            </select>
          </div>
        </div>
        {loading && <div>Vyčkejte prosím, požadavek vytvořen.</div>}
      </div>
    </Page>
  );
}

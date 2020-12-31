import {AsideMenu} from "@/features/aside/AsideMenu";
import {generatePassword} from "@/features/common/generatePassword";
import {postRequest} from "@/features/common/requests";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {useState} from "react";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");

  const [showCreate, setShowCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user} = useUser({redirectTo: "/", requiredRoles: ["Manager"]});

  function genPass() {
    const pass = generatePassword(12);
    setPassword(pass);
  }

  async function addUser() {
    const body = {name, email, password, role};
    setLoading(true);
    const result = await postRequest("/api/users", body);
    if (result.success) {
      setName("");
      setEmail("");
      setPassword("");
      setRole("Customer");

      setShowCreated(true);
      setTimeout(() => {
        setShowCreated(false);
      }, 4000);
    }
    setLoading(false);
  }

  return (
    <Page loadUser={!user || !user.isLoggedIn || user.role !== "Manager"}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="flex items-center space-x-2">
          <div className="font-semibold text-lg">Přidat nového uživatele</div>
          <div
            className="bg-black text-white px-2 py-1 font-medium cursor-pointer"
            onClick={addUser}
          >
            Přidat uživatele
          </div>
        </div>
        {showCreate && <div>Uživatel byl vytvořen!</div>}
        <div className="flex flex-col items-start space-y-2">
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Jméno"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            className="rounded border px-2 py-1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <div className="flex items-center space-x-1">
            <input
              className="rounded border px-2 py-1"
              type="text"
              placeholder="Heslo"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <div
              className="bg-black cursor-pointer font-normal text-white px-2 py-1"
              onClick={genPass}
            >
              Vygenerovat heslo
            </div>
          </div>
          <div className="flex flex-col">
            Vyberte uživatelskou roli
            <select
              className="border rounded text-lg"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="Customer">Zákazník</option>
              <option value="Employee">Zaměstnanec</option>
              <option value="Manager">Manažer</option>
            </select>
          </div>
        </div>
        {loading && <div>Vyčkejte prosím, požadavek vytvořen.</div>}
      </div>
    </Page>
  );
}

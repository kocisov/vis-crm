import {AsideMenu} from "@/features/aside/AsideMenu";
import {Divider} from "@/features/common/Divider";
import {postRequest} from "@/features/common/requests";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {useState} from "react";

export default function AddProject() {
  const {user} = useUser({redirectTo: "/login"});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");

  const [showCreate, setShowCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function addProject() {
    const body = {name, price, deadline};
    setLoading(true);
    const result = await postRequest("/api/projects", body);
    if (result.success) {
      setName("");
      setPrice("");
      setDeadline("");
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
          <div className="font-semibold text-lg">
            Vytvořit nový požadavek na Projekt
          </div>
          <div
            className="bg-black text-white px-2 py-1 font-medium cursor-pointer"
            onClick={addProject}
          >
            Vytvořit požadavek
          </div>
        </div>
        {showCreate && (
          <>
            <Divider />
            <div className="font-medium">
              Požadavek byl vytvořen! Pro začátek práce na projektu musí být
              projekt potvrzen. Očekávejte email s podrobnostmi.
            </div>
            <Divider />
          </>
        )}
        <div className="flex flex-col items-start space-y-2">
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Jméno projektu"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Přibližná cena projektu"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <input
            className="rounded border px-2 py-1"
            type="text"
            placeholder="Deadline projektu"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />
        </div>
        {loading && <div>Vyčkejte prosím, požadavek vytvořen.</div>}
      </div>
    </Page>
  );
}

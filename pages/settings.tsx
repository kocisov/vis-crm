import {AsideMenu} from "@/features/aside/AsideMenu";
import {Divider} from "@/features/common/Divider";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";

export default function Settings() {
  const {user} = useUser({redirectTo: "/login"});

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2 text-lg">
        <div className="font-semibold">Nastavení</div>
        <Divider />

        <div className="font-semibold text-sm">Hlavní nastavení</div>
        <div className="flex items-center space-x-1">
          <input id="notifications" type="checkbox" />
          <label htmlFor="notifications">Posílat notifikace (Emaily)</label>
        </div>
        <Divider />

        <div className="font-semibold text-sm">Uživatelské rozhraní</div>
        <div className="flex items-center space-x-1">
          <input id="dat" type="checkbox" />
          <label htmlFor="dat">Povolit starý datový formát</label>
        </div>
        <div className="flex items-center space-x-1">
          <input id="beta" type="checkbox" />
          <label htmlFor="beta">Povolit vývojařské funkce</label>
        </div>
        <div className="flex items-center space-x-1">
          <input id="err" type="checkbox" />
          <label htmlFor="err">Vypnout chybové hlášky</label>
        </div>
      </div>
    </Page>
  );
}

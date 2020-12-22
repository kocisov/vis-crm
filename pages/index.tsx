import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {AsideMenu} from "@/features/aside/AsideMenu";

export default function Index() {
  const {user} = useUser({redirectTo: "/login"});

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="font-semibold">
          Vítejte na Vašem Přehledu {user?.name}!
        </div>
      </div>
    </Page>
  );
}

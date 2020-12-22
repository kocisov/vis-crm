import {AsideMenu} from "@/features/aside/AsideMenu";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";

export default function Projects() {
  const {user} = useUser({redirectTo: "/login"});

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="font-semibold">Projekty</div>
      </div>
    </Page>
  );
}

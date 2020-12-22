import {Page} from "@/features/page/Page";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {useUser} from "@/features/hooks/useUser";
import {useDashboard} from "@/features/hooks/useDashboard";

export default function Index() {
  const {user} = useUser({redirectTo: "/login"});
  const {data}: any = useDashboard();

  console.log(data);

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="font-semibold text-lg">
          Vítejte na Vašem Přehledu {user?.name}!
        </div>
        {data && user?.role === "Manager" ? (
          <div>
            Máte návrh k <strong>{data?.notApproved}</strong> nepotvrzeným
            projektům v odhadované hodnotě <strong>{data?.price}€</strong>.
          </div>
        ) : (
          ""
        )}
      </div>
    </Page>
  );
}

import {Page} from "@/features/page/Page";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {useUser} from "@/features/hooks/useUser";
import {useApiRequest} from "@/features/hooks/useApiRequest";
import {Divider} from "@/features/common/Divider";

export default function Index() {
  const {user} = useUser({redirectTo: "/login"});
  const {data} = useApiRequest("/api/dashboard");

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

        <Divider />

        <div className="font-semibold">
          Právě máte {data?.projects?.length ?? 0} vlastních projektů.
        </div>
        <div>
          Z toho je {data?.myApproved} potvrzených a {data?.myNotApproved}{" "}
          nepotvrzených.
        </div>
      </div>
    </Page>
  );
}

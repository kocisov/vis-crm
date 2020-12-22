import {AsideMenu} from "@/features/aside/AsideMenu";
import {MonthlyAverage} from "@/features/graphs/MonthlyAverage";
import {MonthlyCount} from "@/features/graphs/MonthlyCount";
import {MonthlyValue} from "@/features/graphs/MonthlyValue";
import {PaidNotPaid} from "@/features/graphs/PaidNotPaid";
import {useGraphs} from "@/features/hooks/useGraphs";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";

export default function Graphs() {
  const {user} = useUser({redirectTo: "/", requiredRoles: ["Manager"]});
  const {data} = useGraphs();

  return (
    <Page loadUser={!user || !user.isLoggedIn || user.role !== "Manager"}>
      <AsideMenu user={user} />
      <div className="p-2">
        <div className="font-semibold text-lg">Grafy</div>
        {data?.monthly ? (
          <div className="flex items-start flex-wrap">
            <div className="flex flex-col">
              <div className="font-medium">
                Zaplacené a nezaplacené projekty
              </div>
              <PaidNotPaid data={data} />
            </div>
            <div className="flex flex-col">
              <div className="font-medium">Průměrná cena projektů (€)</div>
              <MonthlyAverage data={data} />
            </div>
            <div className="mx-2" />
            <div className="flex flex-col">
              <div className="font-medium">Měsíční příjmy (€)</div>
              <MonthlyValue data={data} />
            </div>
            <div className="mx-2" />
            <div className="flex flex-col">
              <div className="font-medium">Nové projekty za měsíc</div>
              <MonthlyCount data={data} />
            </div>
          </div>
        ) : (
          <div>Vyčkejte prosím, grafy se načítají...</div>
        )}
      </div>
    </Page>
  );
}

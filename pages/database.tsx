import {useRouter} from "next/router";
import {FiAlertTriangle} from "react-icons/fi";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {postRequest} from "@/features/common/requests";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";

export default function Database() {
  const {user} = useUser({
    redirectTo: "/",
    requiredRoles: ["Manager"],
  });

  const {replace} = useRouter();

  return (
    <Page loadUser={!user || !user.isLoggedIn || user.role !== "Manager"}>
      <AsideMenu user={user} />
      <div className="p-2 overflow-auto max-h-full">
        <div className="font-semibold text-lg">Databáze</div>
        <div
          className="flex items-center bg-red-700 font-semibold text-white px-2 py-1 space-x-1 cursor-pointer"
          onClick={async () => {
            const result = confirm(
              "Opravdu? Tento požadavek vymaže celou databázi a odhlásí Vás z Aplikace."
            );
            if (result) {
              await postRequest("/api/seed/drop", {});
              await postRequest("/api/users/logout", {});
              replace("/login");
            }
          }}
        >
          <FiAlertTriangle size={24} />
          <span>Provést DROP databáze</span>
        </div>
      </div>
    </Page>
  );
}

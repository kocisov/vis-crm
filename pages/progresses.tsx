import Link from "next/link";
import {Progress} from "@/database/models/Progress";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {useApiRequest} from "@/features/hooks/useApiRequest";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";

export default function Progresses() {
  const {user} = useUser({
    redirectTo: "/",
    requiredRoles: ["Manager", "Employee"],
  });
  const {data: progresses} = useApiRequest(`/api/progresses`);

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2 w-full max-h-full overflow-auto">
        <div className="font-semibold text-lg">Postupové zprávy</div>
        <div className="flex flex-col space-y-2">
          {progresses?.length > 0
            ? progresses
                .sort(
                  (a: any, b: any) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((progress: Progress) => (
                  <div className="flex flex-col border p-2" key={progress.id}>
                    <div className="flex items-center">
                      <div className="font-medium">
                        @{progress.id}. (
                        {new Date(progress.created_at).toLocaleDateString()}){" "}
                      </div>
                      <Link href={`/projects/${progress.project_id}`}>
                        <div className="ml-auto cursor-pointer font-semibold border-b-2">
                          Project {progress.project_id}
                        </div>
                      </Link>
                    </div>
                    <div>{progress.message}</div>
                    <div className="text-xs">
                      Projekt po této zprávě hotov zhruba na{" "}
                      {progress.percentage}%
                    </div>
                  </div>
                ))
            : "Zatím žádné postupové zprávy."}
        </div>
      </div>
    </Page>
  );
}

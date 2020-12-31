import {useRouter} from "next/router";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {useApiRequest} from "@/features/hooks/useApiRequest";
import {Progress} from "@/database/models/Progress";
import {Divider} from "@/features/common/Divider";

export default function Projects() {
  const {user} = useUser({redirectTo: "/login"});
  const {query} = useRouter();
  const {data: project} = useApiRequest(
    `/api/projects/${query.id}`,
    typeof query.id !== "undefined"
  );
  const {data: progresses} = useApiRequest(
    `/api/progresses/${query.id}`,
    typeof query.id !== "undefined"
  );

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2 overflow-auto max-h-full w-full">
        {!project ? (
          <div>Počkejte prosím, načítáme Váš projekt.</div>
        ) : (
          <div className="flex flex-col items-start">
            <div className="font-semibold text-lg">
              Projekt <b>{project.name}</b>
            </div>
            <div>
              Zadáno: {new Date(project.created_at).toLocaleDateString()}
            </div>
            <div>
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </div>
            <div>Potvrzeno: {project.is_accepted ? "Ano" : "Ne"}.</div>
            <div>Zaplaceno: {project.is_payed ? "Ano" : "Ne"}.</div>
            <div>Hotovo: {project.is_completed ? "Ano" : "Ne"}.</div>

            <Divider />

            <div className="flex flex-col space-y-2">
              <div className="font-medium text-lg">Postupové zprávy</div>
              {progresses?.length > 0
                ? progresses
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .map((progress: Progress) => (
                      <div className="flex flex-col" key={progress.id}>
                        <div className="font-medium">
                          @{progress.id}. (
                          {new Date(progress.created_at).toLocaleDateString()}){" "}
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
        )}
      </div>
    </Page>
  );
}

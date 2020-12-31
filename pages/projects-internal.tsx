import Link from "next/link";
import {Project} from "@/database/models/Project";
import {AsideMenu} from "@/features/aside/AsideMenu";
import {useApiRequest} from "@/features/hooks/useApiRequest";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";

export default function Progresses() {
  const {user} = useUser({
    redirectTo: "/",
    requiredRoles: ["Manager", "Employee"],
  });
  const {data: projects} = useApiRequest("/api/projects");

  return (
    <Page loadUser={!user || !user.isLoggedIn}>
      <AsideMenu user={user} />
      <div className="p-2 overflow-auto max-h-full">
        <div className="font-semibold text-lg">Přidělené projekty</div>
        {!projects ? (
          <div>Počkejte prosím, načítáme Vaše projekty.</div>
        ) : (
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center font-semibold">
              <div className="w-10 text-center">#</div>
              <div className="text-center" style={{width: 340}}>
                Jméno
              </div>
              <div className="text-center" style={{width: 200}}>
                Cena
              </div>
              <div className="text-center" style={{width: 80}}>
                Potvrzeno
              </div>
              <div className="text-center" style={{width: 80}}>
                Zaplaceno
              </div>
              <div className="text-center" style={{width: 80}}>
                Hotovo
              </div>
              <div className="text-center" style={{width: 140}}>
                Datum zadání
              </div>
            </div>
            {projects.map((project: Project, index: number) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <div className="flex items-center cursor-pointer border py-2 hover:border-black">
                  <div className="w-10 text-center">{index + 1}</div>
                  <div style={{width: 340}}>{project.name}</div>
                  <div className="text-center" style={{width: 200}}>
                    {project.price}€
                  </div>
                  <div className="text-center" style={{width: 80}}>
                    {project.is_accepted ? "Ano" : "Ne"}
                  </div>
                  <div className="text-center" style={{width: 80}}>
                    {project.is_payed ? "Ano" : "Ne"}
                  </div>
                  <div className="text-center" style={{width: 80}}>
                    {project.is_completed ? "Ano" : "Ne"}
                  </div>
                  <div className="text-center" style={{width: 140}}>
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}

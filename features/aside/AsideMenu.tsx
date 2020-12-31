import Link from "next/link";
import {
  FiActivity,
  FiBox,
  FiDatabase,
  FiPieChart,
  FiUserPlus,
} from "react-icons/fi";
import {UserProps} from "@/features/interfaces";
import {UserBox} from "./UserBox";
import {Divider} from "../common/Divider";
import {FaBoxes, FaCog, FaIdBadge, FaInbox} from "react-icons/fa";

export function AsideMenu({user}: UserProps) {
  return (
    <div
      className="flex flex-col h-full bg-gray-900 text-white p-2"
      style={{minWidth: 300}}
    >
      <div className="text-xl font-medium">CRM</div>

      <Divider />
      <UserBox user={user} />

      <Divider />
      <div className="flex flex-col">
        <div className="font-semibold text-gray-300">Zákaznické menu</div>
        <Link href="/">
          <a className="flex items-center space-x-1 text-lg font-medium">
            <FiActivity />
            <span>Přehled</span>
          </a>
        </Link>
        <Link href="/projects">
          <a className="flex items-center space-x-1 text-lg font-medium">
            <FiBox />
            <span>Projekty</span>
          </a>
        </Link>
        <Link href="/addresses">
          <a className="flex items-center space-x-1 text-lg font-medium">
            <FaIdBadge />
            <span>Adresy</span>
          </a>
        </Link>
        <Link href="/settings">
          <a className="flex items-center space-x-1 text-lg font-medium">
            <FaCog />
            <span>Nastavení</span>
          </a>
        </Link>
      </div>

      {user?.role === "Employee" || user?.role === "Manager" ? (
        <>
          <Divider withLine />
          <div className="flex flex-col">
            <div className="font-semibold text-gray-300">
              Zaměstnanecké menu
            </div>
            <Link href="/progresses">
              <a className="flex items-center space-x-1 text-lg font-medium">
                <FaInbox />
                <span>Postupové zprávy</span>
              </a>
            </Link>
            <Link href="/projects-internal">
              <a className="flex items-center space-x-1 text-lg font-medium">
                <FaBoxes />
                <span>Přidělené projekty</span>
              </a>
            </Link>
          </div>
        </>
      ) : null}

      {user?.role === "Manager" ? (
        <>
          <Divider withLine />
          <div className="flex flex-col">
            <div className="font-semibold text-gray-300">Manažerské menu</div>
            <Link href="/graphs">
              <a className="flex items-center space-x-1 text-lg font-medium">
                <FiPieChart />
                <span>Grafy</span>
              </a>
            </Link>
            <Link href="/add-user">
              <a className="flex items-center space-x-1 text-lg font-medium">
                <FiUserPlus />
                <span>Přidat uživatele</span>
              </a>
            </Link>
            <Link href="/database">
              <a className="flex items-center space-x-1 text-lg font-medium">
                <FiDatabase />
                <span>Databáze</span>
              </a>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

import {useRouter} from "next/router";
import {FiLogOut} from "react-icons/fi";
import {UserProps} from "@/features/interfaces";
import {postRequest} from "@/features/common/requests";

export function UserBox({user}: UserProps) {
  const {replace} = useRouter();

  async function logout() {
    await postRequest("/api/users/logout", {});
    replace("/login");
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="text-gray-400">Přihlášen jako</div>
          <div
            className="flex items-center ml-auto space-x-1 cursor-pointer"
            onClick={logout}
          >
            <FiLogOut />
            <div>Odhlásit se</div>
          </div>
        </div>
        <div className="font-medium text-lg">{user?.name}</div>
        <div className="font-medium text-sm">{user?.role}</div>
      </div>
    </div>
  );
}

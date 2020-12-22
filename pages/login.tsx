import {useState} from "react";
import {useRouter} from "next/router";
import {useUser} from "@/features/hooks/useUser";
import {Page} from "@/features/page/Page";
import {postRequest} from "@/features/common/requests";

export default function Index() {
  useUser({redirectTo: "/", redirectIfFound: true});

  const router = useRouter();

  const [error, setError] = useState({message: "", show: false});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    setLoading(true);

    const result = await postRequest("/api/users/login", {
      email,
      password,
    });

    if (result.success) {
      router.replace("/");
      return;
    }

    setLoading(false);
    setError({show: true, message: result.message});
  }

  return (
    <Page>
      <div className="flex items-center justify-center h-screen flex-col space-y-2 w-full">
        {loading ? (
          <div className="text-xl font-medium">Počkejte prosím...</div>
        ) : (
          <>
            {error.show && (
              <div className="font-medium text-red-600">{error.message}</div>
            )}
            <div className="text-xl font-medium">
              Vítejte zpět, prosím přihlaste se.
            </div>
            <div className="flex items-center space-x-2">
              <input
                className="p-2 py-1 border rounded text-lg"
                type="text"
                placeholder="Váš email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <input
                className="p-2 py-1 border rounded text-lg"
                type="password"
                placeholder="Vaše heslo"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button
              className="bg-black text-white px-2 py-1 rounded font-semibold"
              onClick={login}
            >
              Přihlásit se
            </button>
          </>
        )}
      </div>
    </Page>
  );
}

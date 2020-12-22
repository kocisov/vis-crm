import "module-alias/register";
import {createInterface} from "readline";
import {verify} from "argon2";
import {User} from "@/database/models/User";
import {getGraphsData} from "@/features/graphs/getGraphsData";

const io = createInterface(process.stdin, process.stdout);

async function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    io.question(question, (answer) => resolve(answer));
  });
}

const commands = ["previewData", "newUser", "exit"];

async function main() {
  const email = await ask("Please enter your email: ");
  const password = await ask("Please enter your password: ");

  const user = await User.where({email});

  if (!user || Array.isArray(user) || typeof user === "string") {
    console.log("[ERROR] User not found.");
    return process.exit();
  }

  if (user.role === "Customer") {
    console.log("[ERROR] Sorry, you cannot use this application.");
    return process.exit();
  }

  const validPassword = await verify(user.password, password);
  if (!validPassword) {
    console.log("[ERROR] Invalid password.");
    return process.exit();
  }

  let command = "";
  let number = 0;

  while (command !== "exit") {
    console.log("");
    console.log("-----------");
    console.log("Operace:");
    console.log("1 - Přehled dat, 2 - Vytvořit nového uživatele, 3 - Konec");
    console.log("-----------");
    const raw = await ask("Vyberte operaci: ");
    console.log("-----------");

    try {
      number = parseInt(raw, 10);
    } catch {
      console.log("Špatná operace.");
      continue;
    }

    command = commands[number - 1];

    if (command === "previewData") {
      const data = await getGraphsData();

      console.log(`Počet projektů za tento rok: ${data.count}`);
      console.log(
        `Míra zaplacených projektů (Z/N): ${data.paidCount}/${data.notPaidCount}`
      );

      console.log(`Nejlevnější projekt: ${data.minValue}€`);
      console.log(`Nejdražší projekt: ${data.maxValue}€`);

      console.log(
        `Nejmenší průměr výdělku za měsíc: ${data.minAverage.toFixed(2)}€`
      );
      console.log(
        `Největší průměr výdělku za měsíc: ${data.maxAverage.toFixed(2)}€`
      );
    }
  }

  process.exit();
}

main();

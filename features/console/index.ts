import "module-alias/register";
import {createInterface} from "readline";
import {verify} from "argon2";
import {User} from "@/database/models/User";
import {getGraphsData} from "@/features/graphs/getGraphsData";
import {generatePassword} from "../common/generatePassword";
import {Project} from "@/database/models/Project";
import {Progress} from "@/database/models/Progress";

const io = createInterface(process.stdin, process.stdout);

async function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    io.question(question, (answer) => resolve(answer));
  });
}

const commands: {[key: string]: string} = {
  1: "previewData",
  2: "newUser",
  3: "previewProjects",
  4: "previewProgresses",
  q: "exit",
};

async function main() {
  const email = await ask("Email: ");
  const password = await ask("Heslo: ");

  const user = await User.where({email});

  if (!user || Array.isArray(user) || typeof user === "string") {
    console.log("[ERROR] Uživatel nenalezen.");
    return process.exit();
  }

  if (user.role === "Customer") {
    console.log("[ERROR] Nemáte dostatečné oprávnění.");
    return process.exit();
  }

  const validPassword = await verify(user.password, password);
  if (!validPassword) {
    console.log("[ERROR] Nesprávné heslo.");
    return process.exit();
  }

  let command = "";
  let number = 0;

  while (command !== "exit") {
    console.log("");
    console.log("-----------");
    console.log("Operace:");
    console.log(
      user.role === "Manager"
        ? "1 - Přehled dat, 2 - Vytvořit nového uživatele, 3 - Přehled projektů, 4 - Přehled postupových zpráv, q - Konec"
        : "3 - Přehled projektů, 4 - Přehled postupových zpráv, q - Konec"
    );

    console.log("-----------");
    const option = await ask("Vyberte operaci: ");
    console.log("-----------");

    if (!commands[option]) {
      console.log("Špatná operace.");
      continue;
    }

    command = commands[option];

    if (user.role == "Manager") {
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

      if (command === "newUser") {
        const name = await ask("Jméno: ");
        const email = await ask("Email: ");
        const password = await ask(
          "Heslo (Ponechte prázdné pro vygenerování): "
        );
        const role = await ask("Role (Customer, Employee, Manager): ");
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password.length === 0 ? generatePassword(12) : password;
        user.role = role;
        console.log("Vytváříme nového uživatele...");
        const result = await user.save();
        if (typeof result !== "string") {
          console.log("Uživatel vytvořen...");
        }
      }
    }

    if (command === "previewProjects") {
      const projects = <Array<Project>>await Project.all();
      for (const project of projects) {
        console.log(
          `#${project.id} ${project.name} [Cena]: ${
            project.price
          }€ [Potvrzen]: ${project.is_accepted ? "Ano" : "Ne"} [Zaplacen]: ${
            project.is_payed ? "Ano" : "Ne"
          } [Hotov]: ${project.is_completed ? "Ano" : "Ne"}`
        );
        console.log("-----------");
      }
    }

    if (command === "previewProgresses") {
      const progresses = <Array<Progress>>await Progress.all();
      for (const progress of progresses) {
        console.log(
          `@${progress.id} #${progress.project_id} [Zpráva]: ${progress.message} [~%]: ${progress.percentage}`
        );
        console.log("-----------");
      }
    }
  }

  process.exit();
}

main();

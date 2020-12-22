import {name, internet} from "faker";
import {hash} from "argon2";
import {User} from "@/database/models/User";
import {getRandomDate} from "@/features/common/randomDate";

function getRandomRole() {
  return ["Customer", "Employee", "Manager"][Math.floor(Math.random() * 3)];
}

export async function generateUsers(count: number) {
  let inserted = 0;

  for (let i = 0; i < count; i++) {
    const user = new User();
    user.name = `${name.firstName()} ${name.lastName()}`;
    user.email = internet.email();
    user.password = await hash("test");
    user.role = getRandomRole();
    user.created_at = getRandomDate(
      new Date(2020, 0, 1),
      new Date()
    ).toISOString();
    const result = await user.save();
    if (typeof result !== "string") {
      inserted += result.count;
    }
  }

  return inserted;
}

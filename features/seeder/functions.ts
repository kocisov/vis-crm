import {database} from "@/database/config";

import {Address} from "@/database/tables/Address";
import {Progress} from "@/database/tables/Progress";
import {Project} from "@/database/tables/Project";
import {User} from "@/database/tables/User";
import {User as UserModel} from "@/database/models/User";
import {Website} from "@/database/tables/Website";
import {Invoice} from "@/database/tables/Invoice";

import {generateUsers} from "@/features/seeder/generateUsers";
import {generateProjects} from "@/features/seeder/generateProjects";
import {generateAddresses} from "@/features/seeder/generateAddresses";
import {generateInvoices} from "@/features/seeder/generateInvoices";
import {generateProgresses} from "./generateProgresses";

export async function tables() {
  await User.create();
  await Project.create();
  await Progress.create();
  await Address.create();
  await Website.create();
  await Invoice.create();
}

export async function data(count: number) {
  const users = await generateUsers(count);
  const projects = await generateProjects(count);
  const addresses = await generateAddresses(count);
  const invoices = await generateInvoices(count);
  const progresses = await generateProgresses(count);

  const u = new UserModel();
  u.name = "Administrator";
  u.email = "admin@crm.com";
  u.password =
    "$argon2i$v=19$m=4096,t=3,p=1$xZvAi72ZPGvQy51XSh2oHA$4bKz36LoKrmKLsS6hFEA/vwW2Mjmewfm0q1Ss00CofA";
  u.role = "Manager";
  await u.save();

  const u2 = new UserModel();
  u2.name = "Customer";
  u2.email = "customer@crm.com";
  u2.password =
    "$argon2i$v=19$m=4096,t=3,p=1$xZvAi72ZPGvQy51XSh2oHA$4bKz36LoKrmKLsS6hFEA/vwW2Mjmewfm0q1Ss00CofA";
  u2.role = "Customer";
  await u2.save();

  const u3 = new UserModel();
  u3.name = "Employee";
  u3.email = "employee@crm.com";
  u3.password =
    "$argon2i$v=19$m=4096,t=3,p=1$xZvAi72ZPGvQy51XSh2oHA$4bKz36LoKrmKLsS6hFEA/vwW2Mjmewfm0q1Ss00CofA";
  u3.role = "Employee";
  await u3.save();

  return users + projects + addresses + invoices + progresses;
}

export async function drop() {
  await database.query(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;
    COMMENT ON SCHEMA public IS 'standard public schema';
  `);
}

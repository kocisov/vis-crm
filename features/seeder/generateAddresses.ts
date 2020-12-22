import {address as faker} from "faker";
import {Address} from "@/database/models/Address";
import {getRandomDate} from "@/features/common/randomDate";

export async function generateAddresses(count: number) {
  let inserted = 0;

  for (let i = 0; i < count; i++) {
    const address = new Address();
    address.active = Math.random() > 0.5;
    address.type = Math.random() > 0.5 ? "Company" : "Personal";
    address.city = faker.city();
    address.postal_code = faker.zipCode();
    address.province = faker.state();
    address.street = faker.streetAddress();
    address.user_id = Math.floor(Math.random() * 49) + 1;
    address.created_at = getRandomDate(
      new Date(2020, 0, 1),
      new Date()
    ).toISOString();
    const result = await address.save();
    if (typeof result !== "string") {
      inserted += result.count;
    }
  }

  return inserted;
}

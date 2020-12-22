import {finance} from "faker";
import {Invoice} from "@/database/models/Invoice";
import {getRandomDate} from "@/features/common/randomDate";

export async function generateInvoices(count: number) {
  let inserted = 0;

  for (let i = 0; i < count; i++) {
    const invoice = new Invoice();
    invoice.user_id = Math.floor(Math.random() * 49) + 1;
    invoice.cost = finance.amount();
    invoice.is_payed = Math.random() > 0.5;
    invoice.due = new Date().toISOString();
    invoice.created_at = getRandomDate(
      new Date(2020, 0, 1),
      new Date()
    ).toISOString();
    const result = await invoice.save();
    if (typeof result !== "string") {
      inserted += result.count;
    }
  }

  return inserted;
}

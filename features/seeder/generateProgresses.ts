import {getRandomDate} from "@/features/common/randomDate";
import {Progress} from "@/database/models/Progress";

export async function generateProgresses(count: number) {
  let inserted = 0;

  for (let i = 0; i < count * 8; i++) {
    const progress = new Progress();
    progress.project_id = Math.floor(Math.random() * 49) + 1;
    progress.message = "Bunch of updates for the new system.";
    progress.percentage = Math.floor(Math.random() * 100);
    progress.created_at = getRandomDate(
      new Date(2020, 0, 1),
      new Date()
    ).toISOString();
    const result = await progress.save();
    if (typeof result !== "string") {
      inserted += result.count;
    }
  }

  return inserted;
}

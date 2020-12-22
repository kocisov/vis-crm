import {company} from "faker";
import {Project} from "@/database/models/Project";
import {getRandomDate} from "@/features/common/randomDate";

export async function generateProjects(count: number) {
  let inserted = 0;

  for (let i = 0; i < count; i++) {
    const project = new Project();
    project.name = company.catchPhrase();
    project.deadline = new Date().toString();
    project.is_accepted = Math.random() > 0.5;
    project.is_completed = Math.random() > 0.5;
    project.is_payed = Math.random() > 0.5;
    project.user_id = Math.floor(Math.random() * 49) + 1;
    project.price = Math.floor(Math.random() * 10000).toFixed(2);
    project.created_at = getRandomDate(
      new Date(2020, 0, 1),
      new Date()
    ).toISOString();
    const result = await project.save();
    if (typeof result !== "string") {
      inserted += result.count;
    }
  }

  return inserted;
}

import {Project} from "@/database/models/Project";

function mappedIn(monthlyWithAverage: Array<any>, index: number) {
  return Object.keys(monthlyWithAverage).map(
    (month) => (monthlyWithAverage as any)[month][index]
  );
}

export async function getGraphsData() {
  const projects = <Array<Project>>await Project.all();

  const length = projects.length;

  const normalized = projects.map((project) => ({
    price: project.price,
    paid: project.is_payed,
    month: new Date(project.created_at).getMonth(),
  }));

  const monthly = normalized.reduce(
    (prev, current) => ({
      ...prev,
      [current.month]: [
        ((prev as any)[current.month]?.[0] ?? 0) + 1,
        parseFloat((prev as any)[current.month]?.[1] ?? 0) +
          (current.paid ? parseFloat(current.price) : 0),
      ],
    }),
    {}
  );

  const monthlyWithAverage = {
    ...Object.keys(monthly).map((month) => [
      ...(monthly as any)[month],
      (monthly as any)[month][1] / (monthly as any)[month][0],
    ]),
  };

  const paid = normalized.filter((project) => project.paid);
  const notPaid = normalized.filter((project) => !project.paid);

  return {
    // projects: normalized,

    // paid,
    // notPaid,

    count: length,
    paidCount: paid.length,
    notPaidCount: notPaid.length,

    monthly: monthlyWithAverage,

    maxValue: Math.max(...mappedIn(monthlyWithAverage, 1), 0),
    maxAverage: Math.max(...mappedIn(monthlyWithAverage, 2), 0),
    maxCount: Math.max(...mappedIn(monthlyWithAverage, 0)),
    minValue: Math.min(...mappedIn(monthlyWithAverage, 1)),
    minAverage: Math.min(...mappedIn(monthlyWithAverage, 2)),
    minCount: Math.min(...mappedIn(monthlyWithAverage, 0)),
  };
}

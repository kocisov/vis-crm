export function getMonth(month: number | string) {
  return ["Le", "Ú", "B", "D", "K", "Č", "Čc", "S", "Z", "Ř", "Li", "P"][
    month as any
  ];
}

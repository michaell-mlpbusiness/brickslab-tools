export type LatestComponentItem = {
  label: string;
  href?: string;
  section?: string;
  type?: "web" | "mobile";
};

export type TestResultItem = {
  label: string;
  percent: number;
};

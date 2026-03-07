import { TestResultItem } from "./dashboard.types";

export type { TestResultItem };

export type TestResultsCardProps = {
  results: TestResultItem[];
  title?: string;
};

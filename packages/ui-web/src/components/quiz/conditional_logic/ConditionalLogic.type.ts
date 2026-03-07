import type { LogicRule, LogicOperator, LogicAction, LogicCondition } from "../quiz.types";

export interface QuestionIndex {
  id: string;
  label: string;
  type: string;
}

export interface ConditionalLogicProps {
  rules: LogicRule[];
  onChange: (rules: LogicRule[]) => void;
  questionsIndex: QuestionIndex[];
  className?: string;
}

export type { LogicRule, LogicOperator, LogicAction, LogicCondition };

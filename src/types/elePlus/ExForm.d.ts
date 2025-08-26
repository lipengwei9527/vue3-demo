import { FormRules } from "element-plus";
export type ExFromItem = {
  prop: string | string[];
  label: string;
  labelPosition?;
};
export type ExForm = {
  model: Record<string, any>;
  rules?: FormRules;
  inline?: boolean;
  labelPosition?: labelPosition;
  labelWidth?: string | number;
  labelSuffix: string;
};
type labelPosition = "left" | "right" | "top";

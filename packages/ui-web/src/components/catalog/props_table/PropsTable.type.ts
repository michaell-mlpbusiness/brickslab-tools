export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface PropsTableProps {
  props: PropDef[];
  componentName?: string;
  showOverrideGuide?: boolean;
  overridePreviewLimit?: number;
}

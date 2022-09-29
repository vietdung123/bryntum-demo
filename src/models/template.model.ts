export interface IPauseTemplate {
  pause_start: string;
  pause_duration: number;
}

export interface ITemplate {
  pauses: IPauseTemplate[];
  id: number;
  template_duration: string;
  template_end: string;
  template_name: string;
  template_start: string;
  template_type: string;
  template_subtype: string | null;
}

export interface ITemplatePayload {
  pauses: IPauseTemplate[] | null;
  template_duration: number | string;
  template_end: string;
  template_name: string;
  template_start: string;
  template_subtype: string | null;
  template_type: string;
}

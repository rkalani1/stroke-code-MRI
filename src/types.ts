export type TreatmentDecision = 'thrombolytic' | 'evt' | 'both' | null;

export interface AppState {
  decision: TreatmentDecision;
  evtOptionalBrainMri: boolean;
  mriSafetyScreening: boolean;
  mriSafetyXrChest: boolean;
  mriSafetyXrAbdomen: boolean;
  mriSafetyCtHead: boolean;
  mriSafetyXrSkull: boolean;
  mriSafetyXrNeck: boolean;
  mriDiagnosis: string;
  mraDiagnosis: string;
  attending: string;
  lorazepam: boolean;
  transport: boolean;
  discontinue: boolean;
  mraHeadNeckSelected: boolean;
}

export const DIAGNOSIS_OPTIONS = [
  { value: 'ischemic', label: 'Acute ischemic stroke' },
  { value: 'wakeup', label: 'Wake-up stroke' },
  { value: 'lvo', label: 'Suspected large vessel occlusion' },
  { value: 'focal', label: 'Acute focal neurologic deficit' },
];

export const ATTENDING_OPTIONS = [
  { value: 'provider_a', label: 'Provider A' },
  { value: 'provider_b', label: 'Provider B' },
  { value: 'provider_c', label: 'Provider C' },
];

export type DemoState = 'blank' | 'thrombolytic' | 'evt' | 'evt-brain' | 'both' | 'unable-to-screen' | 'review';

import { AppState, ATTENDING_OPTIONS, DIAGNOSIS_OPTIONS } from '../types';

interface Props {
  state: AppState;
}

const Row = ({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) => (
  <div className="flex items-start justify-between gap-3 py-1.5 text-[12px]">
    <span className="text-slate-600">{label}</span>
    <span className={`text-right font-bold ${muted ? 'text-slate-400' : 'text-slate-800'}`}>{value}</span>
  </div>
);

export default function SummarySidebar({ state }: Props) {
  const mriSelected = state.decision === 'thrombolytic' || state.decision === 'both' || (state.decision === 'evt' && state.evtOptionalBrainMri);
  const mraSelected = state.decision === 'evt' || state.decision === 'both';
  const diagnosisLabel = (value: string) => DIAGNOSIS_OPTIONS.find((option) => option.value === value)?.label || 'Required';
  const attendingLabel = ATTENDING_OPTIONS.find((option) => option.value === state.attending)?.label || 'Required';
  const decisionLabel = state.decision === 'thrombolytic'
    ? 'Thrombolytic'
    : state.decision === 'evt'
      ? 'EVT'
      : state.decision === 'both'
        ? 'Thrombolytic + EVT'
        : 'Required';

  const screeningOrders = [
    state.mriSafetyXrChest && 'XR Chest',
    state.mriSafetyXrAbdomen && 'XR Abdomen',
    state.mriSafetyCtHead && 'CT Head',
    state.mriSafetyXrSkull && 'XR Skull',
    state.mriSafetyXrNeck && 'XR Neck',
  ].filter(Boolean) as string[];

  const ready = Boolean(
    state.decision &&
    state.attending &&
    (!mriSelected || state.mriDiagnosis) &&
    (!mraSelected || state.mraDiagnosis)
  );

  return (
    <aside className="w-full lg:w-[330px] lg:sticky lg:top-[116px]" aria-label="New Orders review">
      <div className="border border-[#9FA8B4] rounded-sm bg-white shadow-sm overflow-hidden">
        <div className="bg-[#314F6D] text-white px-3 py-2.5 flex items-center justify-between gap-3">
          <h2 className="font-bold text-[14px]">New Orders</h2>
          <span aria-live="polite" className={`rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${ready ? 'bg-[#DFF0D8] text-[#2F5D31]' : 'bg-[#FFF4CE] text-[#664D03]'}`}>
            {ready ? 'Ready for review' : 'Incomplete'}
          </span>
        </div>

        <div className="p-3 divide-y divide-[#D8DDE3]">
          <section className="pb-2">
            <Row label="Decision" value={decisionLabel} muted={!state.decision} />
            <Row label="Approving attending" value={attendingLabel} muted={!state.attending} />
          </section>

          <section className="py-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Imaging</h3>
            <Row label="Code Stroke MRI Brain" value={mriSelected ? 'Selected' : 'Not selected'} muted={!mriSelected} />
            {mriSelected && <Row label="MRI diagnosis" value={diagnosisLabel(state.mriDiagnosis)} muted={!state.mriDiagnosis} />}
            <Row label="MRA Head/Neck package" value={mraSelected ? 'Selected' : 'Not selected'} muted={!mraSelected} />
            {mraSelected && <Row label="MRA diagnosis" value={diagnosisLabel(state.mraDiagnosis)} muted={!state.mraDiagnosis} />}
          </section>

          <section className="py-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">MRI safety screening</h3>
            <Row label="Unable to complete screening" value={state.mriSafetyScreening ? 'Selected' : 'Not selected'} muted={!state.mriSafetyScreening} />
            {state.mriSafetyScreening && (
              <Row label="Screening imaging" value={screeningOrders.length ? screeningOrders.join(', ') : 'None selected'} muted={!screeningOrders.length} />
            )}
          </section>

          <section className="pt-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Support orders</h3>
            <Row label="Monitored transport" value={state.decision && state.transport ? 'Selected' : 'Not selected'} muted={!state.decision || !state.transport} />
            <Row label="Lorazepam 1 mg IV" value={state.decision && state.lorazepam ? 'Selected' : 'Not selected'} muted={!state.decision || !state.lorazepam} />
            <Row label="Panel cleanup" value={state.decision && state.discontinue ? 'Selected' : 'Not selected'} muted={!state.decision || !state.discontinue} />
          </section>
        </div>

        <div className="border-t border-[#D8DDE3] bg-[#F7F8FA] px-3 py-2 text-[10px] leading-snug text-slate-500">
          Review only. This prototype cannot sign, place, or transmit orders.
        </div>
      </div>
    </aside>
  );
}

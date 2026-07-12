import { AppState, TreatmentDecision } from '../types';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function DecisionSection({ state, updateState }: Props) {
  const onChange = (decision: TreatmentDecision) => updateState({ decision });
  
  return (
    <div className="border border-[#BCC3CD] rounded-sm mb-4 bg-white shadow-sm">
      <div className="bg-[#E5EEF6] border-b border-[#BCC3CD] flex items-center justify-between p-2.5 rounded-t-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#4A729A] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</div>
          <h2 className="font-bold text-[#203D5C] text-[14px]">Select one: treatment decision</h2>
        </div>
        <span className="text-[#C00000] font-bold text-[11px] uppercase tracking-wider shrink-0">Required</span>
      </div>
      

      <div className="divide-y divide-[#E5E5E5]">
        <label 
          className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${state.decision === 'thrombolytic' ? 'bg-[#E3EAF3]' : 'hover:bg-slate-50'}`}
          onClick={(e) => { e.preventDefault(); onChange(state.decision === 'thrombolytic' ? null : 'thrombolytic'); }}
        >
          <input type="radio" name="decision" className="mt-1 shrink-0 w-3.5 h-3.5 text-[#0055CC] focus:ring-[#0055CC]" checked={state.decision === 'thrombolytic'} readOnly />
          <div>
            <div className="font-bold text-slate-900 text-[13px]">Thrombolytic Decision</div>
            <div className="text-[12px] text-slate-600 mt-0.5 leading-snug">Wake-up or unknown-last-known-well stroke with a disabling deficit; DWI/ADC, T2/FLAIR, and GRE/SWI mismatch would determine lytic eligibility.</div>
          </div>
        </label>
        
        <label 
          className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${state.decision === 'evt' ? 'bg-[#E3EAF3]' : 'hover:bg-slate-50'}`}
          onClick={(e) => { e.preventDefault(); onChange(state.decision === 'evt' ? null : 'evt'); }}
        >
          <input type="radio" name="decision" className="mt-1 shrink-0 w-3.5 h-3.5 text-[#0055CC] focus:ring-[#0055CC]" checked={state.decision === 'evt'} readOnly />
          <div>
            <div className="font-bold text-slate-900 text-[13px]">EVT Decision</div>
            <div className="text-[12px] text-slate-600 mt-0.5 leading-snug">Suspected LVO with a true severe iodinated-contrast contraindication where CTA cannot be used.</div>
          </div>
        </label>

        <label 
          className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${state.decision === 'both' ? 'bg-[#E3EAF3]' : 'hover:bg-slate-50'}`}
          onClick={(e) => { e.preventDefault(); onChange(state.decision === 'both' ? null : 'both'); }}
        >
          <input type="radio" name="decision" className="mt-1 shrink-0 w-3.5 h-3.5 text-[#0055CC] focus:ring-[#0055CC]" checked={state.decision === 'both'} readOnly />
          <div>
            <div className="font-bold text-slate-900 text-[13px]">Both Thrombolytic and EVT Decisions</div>
            <div className="text-[12px] text-slate-600 mt-0.5 leading-snug">Concurrent treatment decisions requiring both MRI Brain and the complete MRA Head/Neck package.</div>
          </div>
        </label>
      </div>
    </div>
  );
}

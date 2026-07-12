import { AppState, ATTENDING_OPTIONS } from '../types';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function ClinicalInfoSection({ state, updateState }: Props) {
  const isError = state.attending === '';
  
  return (
    <div className="border border-[#BCC3CD] rounded-sm bg-white shadow-sm mt-6">
      <div className="bg-[#E5EEF6] border-b border-[#BCC3CD] flex items-center justify-between p-2.5 rounded-t-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#4A729A] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</div>
          <h2 className="font-bold text-[#203D5C] text-[14px]">Stroke attending approval</h2>
        </div>
        <span className="text-[#C00000] font-bold text-[11px] uppercase tracking-wider shrink-0">Required</span>
      </div>

      <div className="p-4">
        <label htmlFor="attending" className="block text-[13px] font-bold text-slate-800 mb-1">
          Approving stroke attending <span className="text-red-600">*</span>
        </label>
        
        <div className={`mt-1 border ${isError ? 'border-red-400 border-l-[3px]' : 'border-[#BCC3CD]'} rounded-sm`}>
          <select
            id="attending"
            className="w-full bg-white px-3 py-2 text-[13px] outline-none"
            value={state.attending}
            onChange={(e) => updateState({ attending: e.target.value })}
          >
            <option value="" disabled>Select approving attending</option>
            {ATTENDING_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {isError && (
          <p className="text-[12px] text-red-600 mt-2 font-medium">Select the approving stroke attending.</p>
        )}
      </div>
    </div>
  );
}

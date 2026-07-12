import { AppState, DIAGNOSIS_OPTIONS } from '../types';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const DiagnosisPicker = ({ value, onChange, id, label }: { value: string, onChange: (v: string) => void, id: string, label: string }) => {
  return (
    <div className="border border-[#BCC3CD] p-3 rounded-sm bg-white mt-3">
      <label htmlFor={id} className="block text-[12px] font-bold text-slate-700 mb-1">
        {label} <span className="text-[#C00000]">*</span>
      </label>
      
      {value ? (
        <div className="mt-1 flex items-center justify-between bg-[#E3EAF3] p-2 border border-[#BCC3CD] rounded-sm">
          <div className="flex items-center gap-2">
            <div className="bg-[#0055CC] text-white rounded text-[10px] w-4 h-4 flex items-center justify-center font-bold">✓</div>
            <span className="font-bold text-slate-800 text-[13px]">{DIAGNOSIS_OPTIONS.find(o => o.value === value)?.label}</span>
          </div>
          <button type="button" onClick={() => onChange('')} className="text-[12px] font-bold text-slate-600 bg-white border border-[#BCC3CD] px-2 py-1 rounded-sm hover:bg-slate-50 transition-colors shadow-sm">
            Remove
          </button>
        </div>
      ) : (
        <div className={`mt-1 flex rounded-sm border ${value === '' ? 'border-[#C00000] border-l-[3px]' : 'border-[#BCC3CD]'}`}>
          <select 
            id={id}
            data-focus-target={id}
            className="flex-1 p-2 text-[13px] outline-none border-none bg-white"
            value=""
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>Search for diagnosis</option>
            {DIAGNOSIS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <div className="bg-slate-50 border-l border-[#BCC3CD] px-4 py-2 font-bold text-slate-500 text-[12px] flex items-center justify-center">Add</div>
        </div>
      )}
    </div>
  );
};

export default function ImagingSection({ state, updateState }: Props) {
  const showCodeStrokeRequired = state.decision === 'thrombolytic' || state.decision === 'both';
  const showMraRequired = state.decision === 'evt' || state.decision === 'both';
  const showCodeStrokeOptional = state.decision === 'evt';
  
  const mriSelected = showCodeStrokeRequired || (showCodeStrokeOptional && state.evtOptionalBrainMri);

  return (
    <div className="border border-[#BCC3CD] rounded-sm mb-4 bg-white shadow-sm mt-6">
      <div className="bg-[#E5EEF6] border-b border-[#BCC3CD] flex items-center p-2.5 rounded-t-sm gap-2">
        <div className="bg-[#4A729A] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</div>
        <h2 className="font-bold text-[#203D5C] text-[14px]">Imaging and screening orders</h2>
      </div>


      <div className="p-3 space-y-4">
        {/* Code Stroke MRI */}
        {(showCodeStrokeRequired || showCodeStrokeOptional) && (
          <div className="border border-[#BCC3CD] rounded-sm overflow-hidden bg-[#F8F9FA]">
            <label className={`flex items-start gap-3 p-2.5 cursor-pointer border-b border-[#BCC3CD] ${mriSelected ? 'bg-[#E3EAF3]' : 'bg-white hover:bg-slate-50 transition-colors'}`}>
              <input
                type="checkbox"
                className="mt-1 w-3.5 h-3.5 text-[#0055CC] rounded-sm border-[#BCC3CD] focus:ring-[#0055CC]"
                checked={mriSelected}
                onChange={(e) => {
                  if (showCodeStrokeOptional) {
                    updateState({ evtOptionalBrainMri: e.target.checked });
                  }
                }}
                disabled={showCodeStrokeRequired}
              />
              <div>
                <div className="font-bold text-slate-900 text-[13px]">
                  Code Stroke MRI (MRI Brain wo Contrast) <span className="font-normal">— Limited Hyperacute Stroke Panel</span>
                </div>
                {showCodeStrokeRequired ? (
                  <div className="text-[10px] font-bold text-slate-600 uppercase border border-slate-300 bg-white px-1 py-0.5 rounded-sm inline-block mt-1 tracking-wider">SELECTED BY INDICATION</div>
                ) : (
                  <div className="text-[12px] text-slate-500 mt-0.5">Optional for an EVT-only decision when adequate brain imaging is already available.</div>
                )}
                {mriSelected && (
                  <div className="text-[12px] text-[#0055CC] mt-1">Limited hyperacute stroke MRI protocol • Priority: STAT</div>
                )}
              </div>
            </label>

            {mriSelected && (
              <div className="p-4 border-l-[3px] border-[#4A729A] ml-2 my-3 mr-3 bg-white border border-[#BCC3CD]">
                <DiagnosisPicker 
                  value={state.mriDiagnosis}
                  onChange={(val) => updateState({ mriDiagnosis: val })}
                  id="mri-diagnosis"
                  label="Diagnosis for Code Stroke MRI"
                />
              </div>
            )}
          </div>
        )}

        {/* MRA Head / Neck */}
        {showMraRequired && (
          <div className="border border-[#BCC3CD] rounded-sm overflow-hidden bg-[#F8F9FA]">
            <label className={`flex items-start gap-3 p-2.5 cursor-pointer border-b border-[#BCC3CD] ${state.mraHeadNeckSelected ? 'bg-[#E3EAF3]' : 'bg-white hover:bg-slate-50 transition-colors'}`}>
              <input
                type="checkbox"
                className="mt-1 w-3.5 h-3.5 text-[#0055CC] rounded-sm border-[#BCC3CD] focus:ring-[#0055CC]"
                checked={state.mraHeadNeckSelected}
                onChange={(e) => updateState({ mraHeadNeckSelected: e.target.checked })}
              />
              <div>
                <div className="font-bold text-slate-900 text-[13px]">
                  MRA Head / Neck wo Contrast <span className="font-normal">— ONLY if patient has suspected LVO and has contraindications for CTA</span>
                </div>
                {state.mraHeadNeckSelected ? (
                  <div className="text-[10px] font-bold text-slate-600 uppercase border border-slate-300 bg-white px-1 py-0.5 rounded-sm inline-block mt-1 tracking-wider">SELECTED BY INDICATION</div>
                ) : (
                  <div className="text-[12px] text-slate-500 mt-0.5">Optional for an EVT decision when MRA is indicated.</div>
                )}
              </div>
            </label>

            {state.mraHeadNeckSelected && (
              <div className="p-4 border-l-[3px] border-[#4A729A] ml-2 my-3 mr-3 bg-white border border-[#BCC3CD]">
                <div className="text-[12px] font-bold text-slate-800 uppercase tracking-wider mb-2">Includes both component orders</div>
                <ul className="list-disc pl-5 text-[12px] text-slate-700 space-y-1 mb-4 font-bold">
                  <li>MRA Head wo Contrast — <span className="font-normal">ONLY if patient has suspected LVO and has contraindication for CTA — Limited Hyperacute Stroke Panel</span></li>
                  <li>MRA Neck wo Contrast — <span className="font-normal">ONLY if patient has suspected LVO and has contraindication for CTA — Limited Hyperacute Stroke Panel</span></li>
                </ul>

                <DiagnosisPicker 
                  value={state.mraDiagnosis}
                  onChange={(val) => updateState({ mraDiagnosis: val })}
                  id="mra-diagnosis"
                  label="Diagnosis for the complete MRA Head/Neck package"
                />
              </div>
            )}
          </div>
        )}

        <div className="border-t border-[#BCC3CD] my-4 pt-4"></div>

        {/* MRI Safety Screening */}
        {state.decision !== null && (
          <div className="border border-[#BCC3CD] rounded-sm overflow-hidden bg-white mb-4">
            <label className={`flex items-start gap-3 p-3 cursor-pointer ${state.mriSafetyScreening ? 'bg-[#E3EAF3] border-b border-[#BCC3CD]' : 'hover:bg-slate-50 transition-colors'}`}>
              <input
                type="checkbox"
                className="mt-1 w-3.5 h-3.5 text-[#0055CC] rounded-sm border-[#BCC3CD] focus:ring-[#0055CC]"
                checked={state.mriSafetyScreening}
                onChange={(e) => updateState({ mriSafetyScreening: e.target.checked })}
              />
              <div>
                <div className="font-bold text-slate-900 text-[13px]">Select if patient UNABLE to complete MRI screening</div>
              </div>
            </label>
            
            {state.mriSafetyScreening && (
              <div className="p-3 bg-[#F8F9FA]">
                <div className="text-[12px] font-bold text-[#0055CC] mb-2 px-2">Optional MRI screening imaging</div>
                
                <div className="space-y-2 text-[13px]">
                  <label className="flex items-start gap-3 p-2 bg-white border border-[#BCC3CD] rounded-sm cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1" checked={state.mriSafetyXrChest} onChange={(e) => updateState({ mriSafetyXrChest: e.target.checked })} />
                    <div>
                      <div className="font-bold text-slate-800">XR Chest 1 View - <span className="font-normal">Limited Hyperacute Stroke Panel</span></div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Priority: STAT</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-2 bg-white border border-[#BCC3CD] rounded-sm cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1" checked={state.mriSafetyXrAbdomen} onChange={(e) => updateState({ mriSafetyXrAbdomen: e.target.checked })} />
                    <div>
                      <div className="font-bold text-slate-800">XR Abdomen 1 View - <span className="font-normal">Limited Hyperacute Stroke Panel</span></div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Priority: STAT</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-2 bg-white border border-[#BCC3CD] rounded-sm cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1" checked={state.mriSafetyCtHead} onChange={(e) => updateState({ mriSafetyCtHead: e.target.checked })} />
                    <div>
                      <div className="font-bold text-slate-800">CT Head wo Contrast Stroke - ONLY if not already done - <span className="font-normal">Limited Hyperacute Stroke Panel</span></div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Priority: STAT</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-2 bg-white border border-[#BCC3CD] rounded-sm cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1" checked={state.mriSafetyXrSkull} onChange={(e) => updateState({ mriSafetyXrSkull: e.target.checked })} />
                    <div>
                      <div className="font-bold text-slate-800">XR Skull 1-3 View - <span className="font-normal uppercase text-[#C00000]">select ONLY IF CT HEAD NOT DONE</span></div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Priority: STAT</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-2 bg-white border border-[#BCC3CD] rounded-sm cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1" checked={state.mriSafetyXrNeck} onChange={(e) => updateState({ mriSafetyXrNeck: e.target.checked })} />
                    <div>
                      <div className="font-bold text-slate-800">XR Neck Soft Tissue - <span className="font-normal uppercase text-[#C00000]">select ONLY IF PATIENT DOES NOT HAVE CTA HEAD/NECK</span></div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Priority: STAT</div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transport, Medication, Order Lifecycle */}
        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 mt-4 px-1">Transport, Medication, and Order Lifecycle</div>
        
        <div className="border border-[#BCC3CD] rounded-sm bg-[#F8F9FA] p-3 space-y-3">
          <label className={`flex items-start gap-3 p-2.5 rounded-sm cursor-pointer ${state.transport ? 'bg-[#E3EAF3] border border-[#BCC3CD]' : 'bg-white border border-[#BCC3CD] hover:bg-slate-50'}`}>
            <input type="checkbox" className="mt-1" checked={state.transport} onChange={(e) => updateState({ transport: e.target.checked })} />
            <div>
              <div className="font-bold text-slate-800 text-[13px]">Transport on monitor with RN / Maintain monitoring and IV lines <span className="font-normal">— Limited Hyperacute Stroke Panel</span></div>
              <div className="text-[11px] text-[#0055CC] mt-0.5">Until discontinued • Starting today • Until Specified</div>
            </div>
          </label>

          <label className={`flex items-start gap-3 p-2.5 rounded-sm cursor-pointer ${state.lorazepam ? 'bg-[#E3EAF3] border border-[#BCC3CD]' : 'bg-white border border-[#BCC3CD] hover:bg-slate-50'}`}>
            <input type="checkbox" className="mt-1" checked={state.lorazepam} onChange={(e) => updateState({ lorazepam: e.target.checked })} />
            <div>
              <div className="font-bold text-slate-800 text-[13px]">LORazepam (Ativan) injection — <span className="font-normal uppercase text-[#C00000] font-bold">if {'>'} 1 mg needed use MODERATE sedation via separate order set</span></div>
              <div className="text-[11px] text-[#0055CC] mt-0.5">1 mg • Intravenous • Once • Sedation for limited hyperacute stroke MRI • Not to exceed 1 mg IV</div>
            </div>
          </label>
          
          <label className={`flex items-start gap-3 p-2.5 rounded-sm cursor-pointer ${state.discontinue ? 'bg-[#E3EAF3] border border-[#BCC3CD]' : 'bg-white border border-[#BCC3CD] hover:bg-slate-50'}`}>
            <input type="checkbox" className="mt-1" checked={state.discontinue} onChange={(e) => updateState({ discontinue: e.target.checked })} />
            <div>
              <div className="font-bold text-slate-800 text-[13px]">Discontinue THIS Order and Discontinue All Orders from the Same Panel/Order Set [ NEURO Limited Hyperacute Stroke Panel ]</div>
              <div className="text-[11px] text-[#0055CC] mt-0.5">Until discontinued • Starting today • Until Specified • WHEN: procedure complete.</div>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
}

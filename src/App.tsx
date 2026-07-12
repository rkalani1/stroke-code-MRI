import { useEffect, useState } from 'react';
import { AppState, DemoState } from './types';
import DecisionSection from './components/DecisionSection';
import ImagingSection from './components/ImagingSection';
import ClinicalInfoSection from './components/ClinicalInfoSection';
import SummarySidebar from './components/SummarySidebar';

export default function App() {
  const [state, setState] = useState<AppState>({
    decision: null,
    evtOptionalBrainMri: false,
    mriSafetyScreening: false,
    mriSafetyXrChest: false,
    mriSafetyXrAbdomen: false,
    mriSafetyCtHead: false,
    mriSafetyXrSkull: false,
    mriSafetyXrNeck: false,
    mriDiagnosis: '',
    mraDiagnosis: '',
    attending: '',
    lorazepam: false,
    transport: true,
    discontinue: true
  });
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get('demo') as DemoState;
    if (demo) {
      applyDemoState(demo);
    }
  }, []);

  const applyDemoState = (demo: DemoState) => {
    const base = {
      decision: null, evtOptionalBrainMri: false, mriSafetyScreening: false, 
      mriSafetyXrChest: false, mriSafetyXrAbdomen: false, mriSafetyCtHead: false, 
      mriSafetyXrSkull: false, mriSafetyXrNeck: false,
      mriDiagnosis: '', mraDiagnosis: '', attending: '', lorazepam: false, transport: true, discontinue: true
    } as AppState;
    switch (demo) {
      case 'blank':
        setState(base);
        break;
      case 'thrombolytic':
        setState({ ...base, decision: 'thrombolytic' });
        break;
      case 'evt':
        setState({ ...base, decision: 'evt' });
        break;
      case 'evt-brain':
        setState({ ...base, decision: 'evt', evtOptionalBrainMri: true });
        break;
      case 'both':
        setState({ ...base, decision: 'both' });
        break;
      case 'unable-to-screen':
        setState({ ...base, decision: 'both', mriSafetyScreening: true, mriSafetyXrChest: true });
        break;
      case 'review':
        setState({ ...base, decision: 'both', mriSafetyScreening: true, mriDiagnosis: 'ischemic', mraDiagnosis: 'ischemic', attending: 'provider_a', lorazepam: false });
        break;
    }
    
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('demo', demo);
    window.history.pushState({}, '', newUrl.toString());
  };

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };
      
      if (updates.decision !== undefined && updates.decision !== 'evt') {
        next.evtOptionalBrainMri = false;
      }

      if (updates.mriSafetyScreening === false) {
        next.mriSafetyXrChest = false;
        next.mriSafetyXrAbdomen = false;
        next.mriSafetyCtHead = false;
        next.mriSafetyXrSkull = false;
        next.mriSafetyXrNeck = false;
      }
      
      const brainMriSelected = next.decision === 'thrombolytic' || next.decision === 'both' || (next.decision === 'evt' && next.evtOptionalBrainMri);
      if (!brainMriSelected) {
        next.mriDiagnosis = '';
      }
      
      const mraSelected = next.decision === 'evt' || next.decision === 'both';
      if (!mraSelected) {
        next.mraDiagnosis = '';
      }
      
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-900 font-sans flex flex-col selection:bg-[#E3EAF3]">
      {/* Main Header */}
      <header className="sticky top-0 z-20 shadow-sm">
        <div className="bg-[#4A729A] text-white px-4 py-3">
          <h1 className="text-[20px] font-bold">NEURO Limited Hyperacute Stroke MRI Panel</h1>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#EAF2F8] mt-0.5">PRACTICE • Synthetic design prototype</p>
        </div>

      </header>

      {/* Content Area */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row items-start gap-4 p-4 lg:p-6">
        <div className="flex-1 min-w-0 w-full">
          <DecisionSection state={state} updateState={updateState} />

          <div className="border border-[#BCC3CD] rounded-sm bg-white p-3 mb-6 shadow-sm">
            <h3 className="font-bold text-[13px] text-slate-800 uppercase tracking-wider mb-2">GENERAL GUIDELINES:</h3>
            <p className="text-[13px] font-bold text-[#C00000] mb-3">ONLY to be ordered by ED and Neurology (stroke attending approved - call stroke phone if confirmation is needed) and solely for acute stroke intervention decision making:</p>
            <ul className="list-disc pl-5 text-[12px] text-slate-800 space-y-2 font-medium">
              <li><strong>Thrombolytic decisions:</strong> (wake up or unknown last known well) with disabling deficits thought due to acute ischemic stroke and lytics would be given if imaging demonstrates DWI/FLAIR mismatch</li>
              <li><strong>Endovascular decisions:</strong> suspected LVO with a known severe contrast allergy (aka, cannot follow our current contrast allergy hyperacute CTA process) then can do a TOF MRA.</li>
            </ul>
          </div>
          
          <ImagingSection state={state} updateState={updateState} />
          {state.decision && <ClinicalInfoSection state={state} updateState={updateState} />}
        </div>

        <SummarySidebar state={state} />
      </main>
    </div>
  );
}

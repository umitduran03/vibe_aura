"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Loader2 } from "lucide-react";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { compressAndEncodeImage } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";

const ZODIAC_OPTIONS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const MOOD_OPTIONS = ["Drained & Exhausted","Anxious & Overthinking","Heartbroken","Lost & Confused","Angry & Frustrated","Numb","Stuck in a Loop"];
const BREAKUP_DYNAMIC_OPTIONS = ["I dumped them", "They dumped me", "Got ghosted", "Mutual breakup"];
const RELATIONSHIP_DURATION_OPTIONS = ["Just a fling", "A few months", "Over a year", "Multiple years"];
const TALKING_DURATION_OPTIONS = ["Just started", "A few weeks", "A few months", "Way too long"];
const MET_IN_PERSON_OPTIONS = ["Yes", "No"];

type FieldDef = { key: string; label: string; type: "text"|"textarea"|"photo"|"select"; options?: string[]; placeholder?: string };

const FIELDS: Record<ExtrasType, FieldDef[]> = {
  "toxic-ex": [
    { key:"yourZodiac", label:"Your Zodiac", type:"select", options:ZODIAC_OPTIONS },
    { key:"exZodiac", label:"Their Zodiac", type:"select", options:ZODIAC_OPTIONS },
    { key:"breakupDynamic", label:"Breakup Dynamic", type:"select", options:BREAKUP_DYNAMIC_OPTIONS },
    { key:"relationshipDuration", label:"Relationship Duration", type:"select", options:RELATIONSHIP_DURATION_OPTIONS },
    { key:"situation", label:"What happened?", type:"textarea", placeholder:"What do you want to text them right now? Spill..." },
    { key:"photo", label:"Their Photo (optional)", type:"photo" },
  ],
  situationship: [
    { key:"yourZodiac", label:"Your Zodiac", type:"select", options:ZODIAC_OPTIONS },
    { key:"theirZodiac", label:"Their Zodiac", type:"select", options:ZODIAC_OPTIONS },
    { key:"talkingDuration", label:"Talking Duration", type:"select", options:TALKING_DURATION_OPTIONS },
    { key:"metInPerson", label:"Met in person?", type:"select", options:MET_IN_PERSON_OPTIONS },
    { key:"situation", label:"Describe it", type:"textarea", placeholder:"What's the vibe?" },
    { key:"yourPhoto", label:"Your Photo", type:"photo" },
    { key:"theirPhoto", label:"Their Photo", type:"photo" },
  ],
  "mood-reset": [
    { key:"yourZodiac", label:"Your Zodiac", type:"select", options:ZODIAC_OPTIONS },
    { key:"currentMood", label:"Current Energy", type:"select", options:MOOD_OPTIONS },
    { key:"situation", label:"What's weighing on you?", type:"textarea", placeholder:"Vent it all out..." },
    { key:"photo", label:"Your Photo", type:"photo" },
  ],
};

const META: Record<ExtrasType, { title:string; emoji:string; subtitle:string; cost:number; color:string }> = {
  "toxic-ex": { title:"Toxic Ex Scanner", emoji:"💀", subtitle:"Let's scan those red flags...", cost:3, color:"#ef4444" },
  situationship: { title:"Situationship Clarifier", emoji:"🤡", subtitle:"Decoding what you are...", cost:5, color:"#d946ef" },
  "mood-reset": { title:"Mood Reset", emoji:"🔋", subtitle:"Emergency vibe check...", cost:3, color:"#06b6d4" },
};


export default function ExtrasModal() {
  const isOpen = useAppStore((s) => s.isExtrasModalOpen);
  const extrasType = useAppStore((s) => s.extrasType);
  const close = useAppStore((s) => s.setExtrasModalOpen);
  const balance = useAppStore((s) => s.tokenBalance);
  const openTokens = useAppStore((s) => s.setTokenModalOpen);
  const [form, setForm] = useState<Record<string,string>>({});
  const [photos, setPhotos] = useState<Record<string,string>>({});
  const [uploading, setUploading] = useState<string|null>(null);
  const refs = useRef<Record<string, HTMLInputElement|null>>({});

  if (!isOpen || !extrasType) return null;
  const cfg = META[extrasType];
  const fields = FIELDS[extrasType];
  if (!cfg || !fields) return null;

  const handleClose = () => { hapticLight(); close(false); setForm({}); setPhotos({}); };

  const upload = async (key: string, file: File) => {
    setUploading(key);
    try { const b = await compressAndEncodeImage(file); setPhotos(p => ({...p,[key]:b})); }
    catch(e){ console.error(e); }
    finally { setUploading(null); }
  };

  const valid = fields.filter(f=>f.type!=="photo").every(f=>form[f.key]?.trim());

  const vip = useAppStore.getState().vipExpiry;
  const isVip = vip ? new Date(vip) > new Date() : false;
  const canAfford = isVip || balance >= cfg.cost;

  const submit = () => {
    hapticMedium();
    if (!canAfford) { close(false); openTokens(true); return; }
    const s = useAppStore.getState();
    s.setExtrasFormData({...form,...photos});
    s.setExtrasModalOpen(false);
    s.triggerExtrasAnalysis();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
          <motion.div className="relative w-full max-w-[430px] max-h-[85dvh] rounded-t-3xl overflow-hidden"
            initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}
            transition={{type:"spring",damping:30,stiffness:300}}
            style={{background:"linear-gradient(180deg,rgba(25,25,35,0.98),rgba(10,10,18,0.99))",border:"1px solid rgba(255,255,255,0.08)",borderBottom:"none"}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-20 rounded-full" style={{background:cfg.color}} />
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-white/20" /></div>
            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cfg.emoji}</span>
                <div><h2 className="text-[16px] font-bold text-white/90">{cfg.title}</h2>
                <p className="text-[11px] text-white/40">{cfg.subtitle}</p></div>
              </div>
              <button onClick={handleClose} className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-5 pb-8 overflow-y-auto max-h-[60dvh] space-y-4">
              {fields.map(f=>(
                <div key={f.key}>
                  <label className="block text-[12px] font-semibold text-white/60 mb-1.5 tracking-wide uppercase">{f.label}</label>
                  {f.type==="select"&&<select value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/90 appearance-none focus:outline-none focus:border-white/20">
                    <option value="" disabled className="bg-[#1a1a2e]">Select...</option>
                    {f.options?.map(o=><option key={o} value={o} className="bg-[#1a1a2e]">{o}</option>)}
                  </select>}
                  {f.type==="text"&&<input type="text" value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    placeholder={f.placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/90 placeholder:text-white/25 focus:outline-none focus:border-white/20" />}
                  {f.type==="textarea"&&<textarea value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    placeholder={f.placeholder} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/90 placeholder:text-white/25 focus:outline-none focus:border-white/20 resize-none" />}
                  {f.type==="photo"&&<div>
                    <input type="file" accept="image/*" className="hidden" ref={el=>{refs.current[f.key]=el}}
                      onChange={e=>{const file=e.target.files?.[0]; if(file) upload(f.key,file);}} />
                    <button onClick={()=>refs.current[f.key]?.click()}
                      className="w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/15 rounded-xl px-4 py-3 text-[13px] text-white/50 hover:bg-white/8 transition-colors cursor-pointer">
                      {uploading===f.key?<><Loader2 className="h-4 w-4 animate-spin"/>Uploading...</>
                        :photos[f.key]?<><Camera className="h-4 w-4 text-emerald-400"/><span className="text-emerald-400">Photo Added ✓</span></>
                        :<><Camera className="h-4 w-4"/>Tap to Upload</>}
                    </button>
                  </div>}
                </div>
              ))}
              <motion.button onClick={submit} disabled={!valid} whileTap={{scale:0.97}}
                className="w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-[14px] font-bold text-white cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-white/10"
                style={{background:valid?`linear-gradient(135deg,${cfg.color},${cfg.color}99)`:"rgba(255,255,255,0.05)",boxShadow:valid?`0 0 30px ${cfg.color}30`:"none"}}>
                {!canAfford?"Get Tokens to Unlock":"Let's Go"} <span className="text-[12px] opacity-70 ml-1">✦ {cfg.cost}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

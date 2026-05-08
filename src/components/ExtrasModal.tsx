"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Loader2, ImagePlus, Trash2 } from "lucide-react";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { compressAndEncodeImage } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";

const ZODIAC_OPTIONS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const MOOD_OPTIONS = ["Drained & Exhausted","Anxious & Overthinking","Heartbroken","Lost & Confused","Angry & Frustrated","Numb","Stuck in a Loop"];
const BREAKUP_DYNAMIC_OPTIONS = ["I dumped them", "They dumped me", "Got ghosted", "Mutual breakup"];
const RELATIONSHIP_DURATION_OPTIONS = ["Just a fling", "A few months", "Over a year", "Multiple years"];
const TALKING_DURATION_OPTIONS = ["Just started", "A few weeks", "A few months", "Way too long"];
const MET_IN_PERSON_OPTIONS = ["Yes", "No"];

type FieldDef = { key: string; label: string; type: "text"|"textarea"|"photo"|"select"|"multi-photo"; options?: string[]; placeholder?: string; maxPhotos?: number };

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
  "delulu-check": [
    { key:"screenshots", label:"Drop the Receipts", type:"multi-photo", maxPhotos: 3 },
    { key:"chatText", label:"Or Paste the Chat", type:"textarea", placeholder:"Copy-paste the conversation here..." },
    { key:"yourZodiac", label:"Your Zodiac", type:"select", options:ZODIAC_OPTIONS },
    { key:"theirZodiac", label:"Their Zodiac (optional)", type:"select", options:[...ZODIAC_OPTIONS, "Idk"] },
    { key:"situation", label:"Context / Your side of the story", type:"textarea", placeholder:"What's confusing you? What do you THINK it means vs what it probably means?" },
  ],
  "rizz-architect": [
    { key:"screenshots", label:"Drop the Screenshot", type:"multi-photo", maxPhotos: 1 },
    { key:"draftText", label:"Your Draft Reply (optional)", type:"textarea", placeholder:"What were you going to reply? Let's see it before I judge..." },
  ],
};

const META: Record<ExtrasType, { title:string; emoji:string; subtitle:string; cost:number; color:string }> = {
  "toxic-ex": { title:"Toxic Ex Scanner", emoji:"💀", subtitle:"Let's scan those red flags...", cost:3, color:"#ef4444" },
  situationship: { title:"Situationship Clarifier", emoji:"🤡", subtitle:"Decoding what you are...", cost:5, color:"#d946ef" },
  "mood-reset": { title:"Mood Reset", emoji:"🔋", subtitle:"Emergency vibe check...", cost:3, color:"#06b6d4" },
  "delulu-check": { title:"Delulu Check", emoji:"📱", subtitle:"Time for a reality check...", cost:10, color:"#f59e0b" },
  "rizz-architect": { title:"The Reply Guru", emoji:"💬", subtitle:"Crafting the perfect reply...", cost:3, color:"#8b5cf6" },
};


export default function ExtrasModal() {
  const isOpen = useAppStore((s) => s.isExtrasModalOpen);
  const extrasType = useAppStore((s) => s.extrasType);
  const close = useAppStore((s) => s.setExtrasModalOpen);
  const balance = useAppStore((s) => s.tokenBalance);
  const openTokens = useAppStore((s) => s.setTokenModalOpen);
  const [form, setForm] = useState<Record<string,string>>({});
  const [photos, setPhotos] = useState<Record<string,string>>({});
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [uploading, setUploading] = useState<string|null>(null);
  const refs = useRef<Record<string, HTMLInputElement|null>>({});
  const screenshotRef = useRef<HTMLInputElement|null>(null);

  if (!isOpen || !extrasType) return null;
  const cfg = META[extrasType];
  const fields = FIELDS[extrasType];
  if (!cfg || !fields) return null;

  const handleClose = () => { hapticLight(); close(false); setForm({}); setPhotos({}); setScreenshots([]); };

  const upload = async (key: string, file: File) => {
    setUploading(key);
    try { const b = await compressAndEncodeImage(file); setPhotos(p => ({...p,[key]:b})); }
    catch(e){ console.error(e); }
    finally { setUploading(null); }
  };

  const uploadScreenshot = async (file: File) => {
    if (screenshots.length >= 3) return;
    setUploading("screenshot");
    try {
      const b = await compressAndEncodeImage(file);
      setScreenshots(prev => [...prev, b]);
    } catch(e) { console.error(e); }
    finally { setUploading(null); }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  // Validation: for delulu-check, user needs either screenshots OR chatText; for rizz-architect, at least 1 screenshot
  const isDeluluCheck = extrasType === "delulu-check";
  const isRizzArchitect = extrasType === "rizz-architect";
  const valid = isDeluluCheck
    ? (screenshots.length > 0 || form.chatText?.trim())
    : isRizzArchitect
    ? screenshots.length > 0
    : fields.filter(f=>f.type!=="photo" && f.type!=="multi-photo").every(f=>form[f.key]?.trim());

  const vip = useAppStore.getState().vipExpiry;
  const isVip = vip ? new Date(vip) > new Date() : false;
  const canAfford = isVip || balance >= cfg.cost;

  const submit = () => {
    hapticMedium();
    if (!canAfford) { close(false); openTokens(true); return; }
    const s = useAppStore.getState();
    // Merge form, photos, and screenshots into formData
    const formData: Record<string, any> = { ...form, ...photos };
    if ((isDeluluCheck || isRizzArchitect) && screenshots.length > 0) {
      formData.screenshots = screenshots;
    }
    s.setExtrasFormData(formData);
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
              {fields.map((f, fieldIndex) => (
                <div key={f.key}>
                  {/* OR Separator for delulu-check between screenshots and chat text */}
                  {isDeluluCheck && f.key === "chatText" && (
                    <div className="flex items-center gap-3 my-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">or</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  )}

                  <label className="block text-[12px] font-semibold text-white/60 mb-1.5 tracking-wide uppercase">{f.label}</label>

                  {/* Multi-photo upload for screenshots */}
                  {f.type==="multi-photo" && (
                    <div className="space-y-2">
                      {/* Uploaded screenshots grid */}
                      {screenshots.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {screenshots.map((ss, i) => (
                            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 group">
                              <img src={ss} alt={`Screenshot ${i+1}`} className="w-full h-full object-cover" />
                              <button
                                onClick={() => removeScreenshot(i)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </button>
                              {(f.maxPhotos || 3) > 1 && (
                                <div className="absolute bottom-0.5 right-0.5 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] text-white/70 font-bold">
                                  {i+1}/{f.maxPhotos || 3}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Add image button */}
                      {screenshots.length < (f.maxPhotos || 3) && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={screenshotRef}
                            onChange={e => { const file = e.target.files?.[0]; if (file) uploadScreenshot(file); e.target.value = ""; }}
                          />
                          <button
                            onClick={() => screenshotRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/15 rounded-xl px-4 py-3 text-[13px] text-white/50 hover:bg-white/8 transition-colors cursor-pointer"
                          >
                            {uploading === "screenshot" ? (
                              <><Loader2 className="h-4 w-4 animate-spin" />Uploading...</>
                            ) : (
                              <><ImagePlus className="h-4 w-4" />
                              {screenshots.length === 0 ? "Upload Screenshot" : `+ Add Image (${screenshots.length}/${f.maxPhotos || 3})`}</>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  )}

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

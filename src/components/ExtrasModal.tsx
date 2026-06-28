"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Loader2, ImagePlus, Trash2 } from "lucide-react";
import { useAppStore, type ExtrasType } from "@/store/useAppStore";
import { compressAndEncodeImage } from "@/lib/services";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { useT } from "@/hooks/useT";

const ZODIAC_OPTIONS_EN = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const ZODIAC_OPTIONS_TR = ["Koç","Boğa","İkizler","Yengeç","Aslan","Başak","Terazi","Akrep","Yay","Oğlak","Kova","Balık"];
const MOOD_OPTIONS_EN = ["Drained & Exhausted","Anxious & Overthinking","Heartbroken","Lost & Confused","Angry & Frustrated","Numb","Stuck in a Loop"];
const MOOD_OPTIONS_TR = ["Tükenmiş & Yorgun","Kaygılı & Aşırı Düşünen","Kalp Kırıklığı","Kaybolmuş & Kafası Karışık","Sinirli & Engellenmiş","Hissizleşmiş","Döngüde Sıkışmış"];
const BREAKUP_DYNAMIC_OPTIONS_EN = ["I dumped them", "They dumped me", "Got ghosted", "Mutual breakup"];
const BREAKUP_DYNAMIC_OPTIONS_TR = ["Ben ayrıldım", "O ayrıldı", "Ghost'landım", "Karşılıklı ayrıldık"];
const RELATIONSHIP_DURATION_OPTIONS_EN = ["Just a fling", "A few months", "Over a year", "Multiple years"];
const RELATIONSHIP_DURATION_OPTIONS_TR = ["Kısa bir macera", "Birkaç ay", "Bir yılı geçti", "Yıllar geçti"];
const TALKING_DURATION_OPTIONS_EN = ["Just started", "A few weeks", "A few months", "Way too long"];
const TALKING_DURATION_OPTIONS_TR = ["Daha yeni başladık", "Birkaç haftadır", "Birkaç aydır", "Çok uzun süredir"];
const MET_IN_PERSON_OPTIONS_EN = ["Yes", "No"];
const MET_IN_PERSON_OPTIONS_TR = ["Evet", "Hayır"];

type FieldDef = { key: string; label: string; type: "text"|"textarea"|"photo"|"select"|"multi-photo"; options?: string[]; placeholder?: string; maxPhotos?: number };

// Moved to component


export default function ExtrasModal() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const isTr = locale === "tr";
  
  const FIELDS: Record<ExtrasType, FieldDef[]> = {
    "toxic-ex": [
      { key:"yourZodiac", label:isTr ? "Senin Burcun" : "Your Zodiac", type:"select", options:isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN },
      { key:"exZodiac", label:isTr ? "Onun Burcu" : "Their Zodiac", type:"select", options:isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN },
      { key:"breakupDynamic", label:isTr ? "Ayrılık Durumu" : "Breakup Dynamic", type:"select", options:isTr ? BREAKUP_DYNAMIC_OPTIONS_TR : BREAKUP_DYNAMIC_OPTIONS_EN },
      { key:"relationshipDuration", label:isTr ? "İlişki Süresi" : "Relationship Duration", type:"select", options:isTr ? RELATIONSHIP_DURATION_OPTIONS_TR : RELATIONSHIP_DURATION_OPTIONS_EN },
      { key:"situation", label:isTr ? "Ne oldu?" : "What happened?", type:"textarea", placeholder:isTr ? "Ona şu an ne yazmak istiyorsun? Dökül..." : "What do you want to text them right now? Spill..." },
      { key:"photo", label:isTr ? "Onun Fotoğrafı (opsiyonel)" : "Their Photo (optional)", type:"photo" },
    ],
    situationship: [
      { key:"yourZodiac", label:isTr ? "Senin Burcun" : "Your Zodiac", type:"select", options:isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN },
      { key:"theirZodiac", label:isTr ? "Onun Burcu" : "Their Zodiac", type:"select", options:isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN },
      { key:"talkingDuration", label:isTr ? "Konuşma Süresi" : "Talking Duration", type:"select", options:isTr ? TALKING_DURATION_OPTIONS_TR : TALKING_DURATION_OPTIONS_EN },
      { key:"metInPerson", label:isTr ? "Yüz yüze görüştünüz mü?" : "Met in person?", type:"select", options:isTr ? MET_IN_PERSON_OPTIONS_TR : MET_IN_PERSON_OPTIONS_EN },
      { key:"situation", label:isTr ? "Durumu anlat" : "Describe it", type:"textarea", placeholder:isTr ? "Nasıl bir vibe var?" : "What's the vibe?" },
      { key:"yourPhoto", label:isTr ? "Senin Fotoğrafın" : "Your Photo", type:"photo" },
      { key:"theirPhoto", label:isTr ? "Onun Fotoğrafı" : "Their Photo", type:"photo" },
    ],
    "mood-reset": [
      { key:"yourZodiac", label:isTr ? "Senin Burcun" : "Your Zodiac", type:"select", options:isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN },
      { key:"currentMood", label:isTr ? "Şu anki Enerjin" : "Current Energy", type:"select", options:isTr ? MOOD_OPTIONS_TR : MOOD_OPTIONS_EN },
      { key:"situation", label:isTr ? "İçini ne daraltıyor?" : "What's weighing on you?", type:"textarea", placeholder:isTr ? "İçini dök..." : "Vent it all out..." },
      { key:"photo", label:isTr ? "Senin Fotoğrafın" : "Your Photo", type:"photo" },
    ],
    "delulu-check": [
      { key:"screenshots", label:isTr ? "Kanıtları Bırak" : "Drop the Receipts", type:"multi-photo", maxPhotos: 3 },
      { key:"chatText", label:isTr ? "Veya Mesajı Yapıştır" : "Or Paste the Chat", type:"textarea", placeholder:isTr ? "Konuşmayı buraya yapıştır..." : "Copy-paste the conversation here..." },
      { key:"yourZodiac", label:isTr ? "Senin Burcun" : "Your Zodiac", type:"select", options:isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN },
      { key:"theirZodiac", label:isTr ? "Onun Burcu (opsiyonel)" : "Their Zodiac (optional)", type:"select", options:[...(isTr ? ZODIAC_OPTIONS_TR : ZODIAC_OPTIONS_EN), isTr ? "Bilmiyorum" : "Idk"] },
      { key:"situation", label:isTr ? "Bağlam / Senin tarafın" : "Context / Your side of the story", type:"textarea", placeholder:isTr ? "Kafanı ne karıştırıyor? Ne anlama geldiğini DÜŞÜNÜYORSUN ve aslında ne anlama geliyor?" : "What's confusing you? What do you THINK it means vs what it probably means?" },
    ],
    "rizz-architect": [
      { key:"screenshots", label:isTr ? "Ekran Görüntüsünü Bırak" : "Drop the Screenshot", type:"multi-photo", maxPhotos: 1 },
      { key:"draftText", label:isTr ? "Taslak Cevabın (opsiyonel)" : "Your Draft Reply (optional)", type:"textarea", placeholder:isTr ? "Ne cevap verecektin? Ben yargılamadan önce bir göreyim..." : "What were you going to reply? Let's see it before I judge..." },
    ],
    "profile-autopsy": [
      { key:"profileMode", label:isTr ? "Ne analiz ediyoruz?" : "What are we analyzing?", type:"select", options:isTr ? ["Kendi Profilim", "Başkasının Profili"] : ["My Own Profile", "Someone Else's Profile"] },
      { key:"platform", label:isTr ? "Platform" : "Platform", type:"select", options:["Tinder", "Bumble", "Hinge", "Instagram", "X (Twitter)", "BeReal", isTr ? "Diğer" : "Other"] },
      { key:"screenshots", label:isTr ? "Profil Ekran Görüntüleri" : "Profile Screenshots", type:"multi-photo", maxPhotos: 4 },
      { key:"situation", label:isTr ? "Bize eklemek istediğin bir şey var mı? (opsiyonel)" : "Any context you want to add? (optional)", type:"textarea", placeholder:isTr ? "Hedefin ne? Özel endişen var mı?" : "What's your goal? Any specific concern?" },
    ],
  };

  const META: Record<ExtrasType, { title:string; emoji:string; subtitle:string; cost:number; color:string }> = {
    "toxic-ex": { title: t.extrasToxicTitle, emoji:"💀", subtitle:isTr ? "Şu red flag'leri bir tarayalım..." : "Let's scan those red flags...", cost:5, color:"#ef4444" },
    situationship: { title: t.extrasSitTitle, emoji:"🤡", subtitle:isTr ? "Ne olduğunuzu çözüyoruz..." : "Decoding what you are...", cost:5, color:"#d946ef" },
    "mood-reset": { title: t.extrasMoodTitle, emoji:"🔋", subtitle:isTr ? "Acil vibe kontrolü..." : "Emergency vibe check...", cost:2, color:"#06b6d4" },
    "delulu-check": { title: t.extrasDeluluTitle, emoji:"📱", subtitle:isTr ? "Gerçeklerle yüzleşme zamanı..." : "Time for a reality check...", cost:10, color:"#f59e0b" },
    "rizz-architect": { title: t.extrasRizzTitle, emoji:"💬", subtitle:isTr ? "Mükemmel cevabı hazırlıyoruz..." : "Crafting the perfect reply...", cost:2, color:"#8b5cf6" },
    "profile-autopsy": { title: isTr ? "Profil Otopsisi" : "Profile Autopsy", emoji:"🔬", subtitle:isTr ? "Profil masaya yatıyor..." : "Your profile, under the microscope...", cost:7, color:"#7c3aed" },
  };

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

  useEffect(() => {
    if (isOpen) {
      setForm({});
      setPhotos({});
      setScreenshots([]);
      setUploading(null);
    }
  }, [isOpen, extrasType]);

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
    const maxPhotos = fields.find(f => f.type === "multi-photo")?.maxPhotos || 3;
    if (screenshots.length >= maxPhotos) return;
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

  // Validation
  const isDeluluCheck = extrasType === "delulu-check";
  const isRizzArchitect = extrasType === "rizz-architect";
  const isProfileAutopsy = extrasType === "profile-autopsy";
  const valid = isDeluluCheck
    ? (screenshots.length > 0 || form.chatText?.trim())
    : isRizzArchitect
    ? screenshots.length > 0
    : isProfileAutopsy
    ? (screenshots.length > 0 && form.profileMode?.trim() && form.platform?.trim())
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
    // Profile Autopsy: include screenshots + map display label to internal value
    if (isProfileAutopsy) {
      formData.screenshots = screenshots;
      // Map display labels to internal values
      const selfLabels = ["Kendi Profilim", "My Own Profile"];
      formData.profileMode = selfLabels.includes(form.profileMode || "") ? "self" : "other";
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
              <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors cursor-pointer">
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
                      <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{t.extrasModalOr}</span>
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
                                aria-label="Remove screenshot"
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
                              <><Loader2 className="h-4 w-4 animate-spin" />{t.extrasModalUploading}</>
                            ) : (
                              <><ImagePlus className="h-4 w-4" />
                              {screenshots.length === 0 ? t.extrasModalUploadScreenshot : t.extrasModalAddImage.replace("{count}", screenshots.length.toString()).replace("{max}", (f.maxPhotos || 3).toString())}</>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {f.type==="select"&&<select value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/90 appearance-none focus:outline-none focus:border-white/20">
                    <option value="" disabled className="bg-[#1a1a2e]">{t.extrasModalSelect}</option>
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
                      {uploading===f.key?<><Loader2 className="h-4 w-4 animate-spin"/>{t.extrasModalUploading}</>
                        :photos[f.key]?<><Camera className="h-4 w-4 text-emerald-400"/><span className="text-emerald-400">{t.extrasModalPhotoAdded}</span></>
                        :<><Camera className="h-4 w-4"/>{t.extrasModalTapToUpload}</>}
                    </button>
                  </div>}
                </div>
              ))}
              <motion.button onClick={submit} disabled={!valid} whileTap={{scale:0.97}}
                className="w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-[14px] font-bold text-white cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-white/10"
                style={{background:valid?`linear-gradient(135deg,${cfg.color},${cfg.color}99)`:"rgba(255,255,255,0.05)",boxShadow:valid?`0 0 30px ${cfg.color}30`:"none"}}>
                {!canAfford?t.extrasModalGetTokens:t.extrasModalLetsGo} <span className="text-[12px] opacity-70 ml-1">✦ {cfg.cost}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

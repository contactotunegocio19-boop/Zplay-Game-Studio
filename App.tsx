import React, { useEffect, useMemo, useRef, useState } from 'react';
import zplayLogo from 'container:///mnt/data/src/assets/40688b797c6b1529-zplay_header_nitido.png';
import { Search, Globe, MessageCircle, Gift, Star, Share2, Bookmark, Triangle, Check, Copy, ShieldCheck, Headphones, ChevronRight, Minus, Plus, X, ArrowLeft, Filter, Clock, Landmark, Phone, Fingerprint, User, Send, ChevronDown, ThumbsUp } from 'lucide-react';

type Prod = { id:number; name:string; price:string; rating:string; cat:string; bg:string; fg:string; big:string; sub:string; badge?:string; badgeColor?:string; discount?:string; cashback?:boolean; recent?:boolean };

const PRODUCTS: Prod[] = [
  {id:1,name:'Steam USD',price:'$5 - $50',rating:'5',cat:'Videojuegos',bg:'#000000',fg:'#fff',big:'STEAM',sub:'USD • GIFT CARD'},
  {id:2,name:'Nintendo eShop USA International',price:'$5 - $200',rating:'5',cat:'Videojuegos',bg:'#E60012',fg:'#fff',big:'Nintendo',sub:'eSHOP • USA'},
  {id:3,name:'Roblox USD',price:'$10 - $500',rating:'5',cat:'Videojuegos',bg:'#FF2D55',fg:'#fff',big:'ROBLOX',sub:'ROBUX • USD'},
  {id:4,name:'Riot Access USA International',price:'$4.99 - $100',rating:'5',cat:'Videojuegos',bg:'#D13639',fg:'#fff',big:'RIOT',sub:'ACCESS • USA'},
  {id:5,name:'Free Fire Direct International',price:'2200 Diamonds',rating:'5',cat:'Videojuegos',bg:'#2B2B2B',fg:'#FFC107',big:'FREE FIRE',sub:'2200 DIAMONDS',badge:'Agotado',badgeColor:'#FF6B00'},
  {id:6,name:'G2A Digital Marketplace',price:'$20 - $200',rating:'4.9',cat:'Videojuegos',bg:'#6A00FF',fg:'#fff',big:'G2A',sub:'MARKETPLACE'},
  {id:7,name:'Minecraft Java International',price:'$26.95',rating:'5',cat:'Videojuegos',bg:'#1B7A2E',fg:'#fff',big:'MINECRAFT',sub:'JAVA EDITION'},
  {id:8,name:'Bitrefill Gift Card (USD)',price:'$0.1 - $2000',rating:'4.8',cat:'Multimarca',bg:'#0F9D58',fg:'#fff',big:'B',sub:'BITREFILL • USD'},
  {id:9,name:'PUBG Mobile UC International',price:'PUBG 10 UC - PUBG 40500 UC',rating:'4.8',cat:'Videojuegos',bg:'#111111',fg:'#FFC107',big:'PUBG',sub:'MOBILE • UC'},
  {id:10,name:'Disney USD International',price:'$10 - $1000',rating:'4.8',cat:'Entretenimiento',bg:'#0B4ED8',fg:'#fff',big:'Disney',sub:'USD • INTERNATIONAL'},
  {id:11,name:'Discord Nitro USD',price:'1 Year',rating:'4.8',cat:'Entretenimiento',bg:'#5865F2',fg:'#fff',big:'Discord',sub:'NITRO • 1 YEAR'},
  {id:12,name:'Hotelgift USD',price:'$25 - $2000',rating:'5',cat:'Viajes',bg:'#C9A227',fg:'#111',big:'HOTELGIFT',sub:'USD • STAYS'},
  {id:13,name:'Riot Access LATAM',price:'$4.99 - $99.99',rating:'4.9',cat:'Videojuegos',bg:'#D13639',fg:'#fff',big:'RIOT',sub:'ACCESS • LATAM',badge:'Agotado',badgeColor:'#FF6B00'},
  {id:14,name:'NordVPN International',price:'1 Month - 1 Year',rating:'4.7',cat:'Privacidad y herramientas',bg:'#FFFFFF',fg:'#0A3D8F',big:'NordVPN',sub:'INTERNATIONAL',discount:'10%'},
  {id:15,name:'Jagex RuneScape International',price:'$10 - $25',rating:'5',cat:'Videojuegos',bg:'#7A1F1F',fg:'#FFC107',big:'RuneScape',sub:'JAGEX'},
  {id:16,name:'Surfshark VPN International',price:'1 Month - 2 Years',rating:'4.8',cat:'Privacidad y herramientas',bg:'#1DE9B6',fg:'#04211A',big:'Surfshark',sub:'VPN'},
  {id:17,name:'League of Legends LATAM',price:'$5 - $100',rating:'4.9',cat:'Videojuegos',bg:'#0A1428',fg:'#C8AA6E',big:'LEAGUE',sub:'OF LEGENDS • LATAM',badge:'Agotado',badgeColor:'#FF6B00'},
  {id:18,name:'Kinguin Games Store',price:'$5 - $100',rating:'5',cat:'Videojuegos',bg:'#FF5A00',fg:'#fff',big:'KINGUIN',sub:'GAMES STORE'},
  {id:19,name:'Age of Empires Mobile',price:'$4.99 - $99.99',rating:'4.8',cat:'Videojuegos',bg:'#0B6E4F',fg:'#fff',big:'AGE OF',sub:'EMPIRES MOBILE'},
  {id:20,name:'Bankless.com International',price:'$10 - $500',rating:'4.9',cat:'Cripto',bg:'#111111',fg:'#fff',big:'BANKLESS',sub:'INTERNATIONAL',discount:'5%'},
  {id:21,name:'Bitrefill Gift Card (EUR)',price:'€0.1 - €1500',rating:'4.8',cat:'Multimarca',bg:'#0F9D58',fg:'#fff',big:'B',sub:'BITREFILL • EUR'},
  {id:22,name:'Call of Duty Points Xbox',price:'$4.99 - $99.99',rating:'4.9',cat:'Videojuegos',bg:'#1A1A1A',fg:'#A0FF00',big:'CALL OF DUTY',sub:'POINTS • XBOX'},
  {id:23,name:'Cherry Credits Multi-Game',price:'$4 - $80',rating:'5',cat:'Videojuegos',bg:'#E91E63',fg:'#fff',big:'Cherry',sub:'CREDITS'},
  {id:24,name:'CoinEd',price:'$80',rating:'4.7',cat:'Cripto',bg:'#FF8F00',fg:'#111',big:'CoinEd',sub:'$80 • COURSE',discount:'20%'},
  {id:25,name:'CoinTracking International',price:'$155',rating:'4.8',cat:'Cripto',bg:'#0B2A4A',fg:'#fff',big:'CoinTracking',sub:'INTERNATIONAL',discount:'5%'},
  {id:26,name:'Delta Force LATAM',price:'18 Delta Coins - 19440',rating:'4.9',cat:'Videojuegos',bg:'#0F1F1F',fg:'#FFD600',big:'DELTA FORCE',sub:'LATAM',badge:'Nuevo',badgeColor:'#FF1E3C'},
  {id:27,name:'EA FC27 FC Points PC',price:'$49.99 - $149.99',rating:'4.8',cat:'Videojuegos',bg:'#00FF88',fg:'#111',big:'EA FC 27',sub:'FC POINTS • PC',badge:'Nuevo',badgeColor:'#FF1E3C'},
  {id:28,name:'eFootball For Xbox',price:'€9.99 - €99.99',rating:'4.7',cat:'Videojuegos',bg:'#0072FF',fg:'#fff',big:'eFootball',sub:'FOR XBOX'},
  {id:29,name:'ExitLag International',price:'1 Month - 1 Year',rating:'5',cat:'Videojuegos',bg:'#FF1E3C',fg:'#fff',big:'EXITLAG',sub:'INTERNATIONAL'},
  {id:30,name:'Farlight 84 Diamonds',price:'5 Diamantes - 4700',rating:'4.9',cat:'Videojuegos',bg:'#7B2FFF',fg:'#fff',big:'FARLIGHT 84',sub:'DIAMONDS',badge:'Nuevo',badgeColor:'#FF1E3C'},
  {id:31,name:'Flightgift EUR',price:'€25 - €9071',rating:'4.4',cat:'Viajes',bg:'#00A8E8',fg:'#fff',big:'FLIGHTGIFT',sub:'EUR • FLIGHTS'},
  {id:32,name:'Flightgift USD',price:'$25 - $2000',rating:'5',cat:'Viajes',bg:'#00A8E8',fg:'#fff',big:'FLIGHTGIFT',sub:'USD • FLIGHTS'},
];

const CATS = ['Todas las tarjetas regalo','Añadido recientemente','Viajes','Videojuegos','Transporte','Privacidad y herramientas','IA','Multimarca','Entretenimiento','Regalos','Cripto'];
const VENEZUELA_BANKS = [
  '100% Banco (0156)',
  'Banco Activo (0171)',
  'Banco Agrícola de Venezuela (0166)',
  'Banco Bicentenario del Pueblo (0175)',
  'Banco Caroní (0121)',
  'Banco de Comercio Exterior (0196)',
  'Banco de Desarrollo Económico y Social de Venezuela (0195)',
  'Banco de la Fuerza Armada Nacional Bolivariana (0155)',
  'Banco de la Gente Emprendedora (0146)',
  'Banco de Venezuela (0102)',
  'Banco del Caribe (0114)',
  'Banco del Pueblo Soberano (0149)',
  'Banco del Tesoro (0153)',
  'Banco Exterior (0115)',
  'Banco Fondo Común (0151)',
  'Banco Internacional de Desarrollo (0173)',
  'Banco Mercantil (0105)',
  'Banco Mi Banco (0169)',
  'Banco Nacional de Crédito (0191)',
  'Banco Occidental de Descuento (0116)',
  'Banco Plaza (0138)',
  'Banco Provincial (0108)',
  'Banco Sofitasa (0137)',
  'Banco Venezolano de Crédito (0104)',
  'Bancamiga (0172)',
  'Bancrecer (0168)',
  'Banesco (0134)',
  'Banplus (0174)',
  'Citibank (0190)',
  'DelSur (0157)',
];
const STEAM_DEN = [
  {label:'5 USD',price:'5,89 US$',num:5.89},
  {label:'20 USD',price:'22,47 US$',num:22.47},
  {label:'30 USD',price:'32,10 US$',num:32.10},
  {label:'50 USD',price:'56,18 US$',num:56.18},
];
type Denom = {label:string;price:string;num?:number};
function moneyDenoms(amounts:number[],currency:string,suffix:string):Denom[]{ return amounts.map(a=>({label:`${a} ${suffix}`,price:`${currency}${Number.isInteger(a)?a:a.toFixed(2)}`,num:a})); }
function denominationsFor(p:Prod):Denom[]{
  if(p.id===1) return STEAM_DEN;
  const n=p.name.toLowerCase();
  if(n.includes('roblox')) return moneyDenoms([10,25,50,100],'$','USD');
  if(n.includes('nintendo')) return moneyDenoms([5,10,20,50],'$','USD');
  if(n.includes('playstation')||n.includes('psn')) return moneyDenoms([10,20,50,100],'$','USD');
  if(n.includes('xbox')) return moneyDenoms([10,25,50,100],'$','USD');
  const price=p.price;
  if(/month|year/i.test(price)){
    if(price.toLowerCase().includes('2 year')) return [{label:'1 Month',price:'1 Month'},{label:'6 Months',price:'6 Months'},{label:'1 Year',price:'1 Year'},{label:'2 Years',price:'2 Years'}];
    if(price.includes('-')) return [{label:'1 Month',price:'1 Month'},{label:'3 Months',price:'3 Months'},{label:'6 Months',price:'6 Months'},{label:'1 Year',price:'1 Year'}];
    return [{label:price,price}];
  }
  if(price.includes('-')){
    const nums=(price.match(/[\d]+(?:[.,][\d]+)?/g)||[]).map(s=>parseFloat(s.replace(',','.')));
    if(nums.length>=2){
      const min=nums[0]; const max=nums[nums.length-1];
      const isEUR=price.includes('€');
      const currency=isEUR?'€':'$';
      const suffix=isEUR?'EUR':'USD';
      const isCoin=/diamonds|diamantes|coins|uc|points|diamante/i.test(price);
      if(isCoin){
        const unit=price.includes('Diamantes')||price.includes('Diamonds')?'Diamantes':price.includes('Coins')?'Coins':price.includes('UC')?'UC':'Puntos';
        const raw=[min,min*2,min*5,min*10].map(v=>Math.min(Math.round(v),max));
        const uniq=[...new Set(raw)].sort((a,b)=>a-b);
        return uniq.map(a=>({label:`${a} ${unit}`,price:`${a} ${unit}`,num:a}));
      }
      const raw=[min,min*2,min*5,min*10].map(v=>Math.min(Math.round(v*100)/100,max));
      const uniq=[...new Set(raw)].sort((a,b)=>a-b);
      return moneyDenoms(uniq,currency,suffix);
    }
  }
  return [{label:price,price}];
}

async function api(action:string,args:any){
  const r = await fetch("actions",{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action,args})});
  const j = await r.json().catch(()=>({}));
  if(!r.ok || j.error) throw new Error(j.error || `Error ${r.status}`);
  return j.data;
}

export default function App(){
  useEffect(()=>{ document.title='ZPLAY GAME STUDIO - Tarjetas regalo'; },[]);
  const [view,setView]=useState<'home'|'detail'>('home');
  const [selected,setSelected]=useState<Prod>(PRODUCTS[0]);
  const [cat,setCat]=useState(CATS[0]);
  const [query,setQuery]=useState('');
  const [tab,setTab]=useState('Tarjetas regalo');
  const [denIdx,setDenIdx]=useState(0);
  const [qty,setQty]=useState(1);
  const [saved,setSaved]=useState(false);
  const [filterVE,setFilterVE]=useState(false);
  const [filterCash,setFilterCash]=useState(false);
  const [sort,setSort]=useState('Popular');

  const [copied,setCopied]=useState('');
  const [toast,setToast]=useState('');
  const [report,setReport]=useState({referencia:'',monto:'',telefono:'',banco:'',titular:''});
  const [saving,setSaving]=useState(false);
  const [saveMsg,setSaveMsg]=useState('');
  const [reports,setReports]=useState<any[]>([]);
  const [loadErr,setLoadErr]=useState('');
  const [comments,setComments]=useState<any[]>([]);
  const [commentForm,setCommentForm]=useState({rating:0,texto:''});
  const [hoverRating,setHoverRating]=useState(0);
  const [savingComment,setSavingComment]=useState(false);
  const [commentMsg,setCommentMsg]=useState('');
  const [likedComments,setLikedComments]=useState<Record<string,boolean>>({});
  const [likeRecordIds,setLikeRecordIds]=useState<Record<string,string>>({});
  const [likingComments,setLikingComments]=useState<Record<string,boolean>>({});
  const [ownerWhatsApp,setOwnerWhatsApp]=useState('584140000000');
  const [ownerId,setOwnerId]=useState<string|null>(null);
  const [savingOwner,setSavingOwner]=useState(false);
  const [ownerMsg,setOwnerMsg]=useState('');
  const [lastWhatsAppUrl,setLastWhatsAppUrl]=useState('');
  const [authModal,setAuthModal]=useState<'register'|'login'|null>(null);
  const [inviteOpen,setInviteOpen]=useState(false);
  const [currentUser,setCurrentUser]=useState<{id:string;nombre:string;telefono:string;correo:string}|null>(null);
  const [sessionId,setSessionId]=useState<string|null>(null);
  const [regForm,setRegForm]=useState({nombre:'',telefono:'',correo:'',password:'',confirm:'',terms:false});
  const [regErrors,setRegErrors]=useState<Record<string,string>>({});
  const [loginForm,setLoginForm]=useState({identificador:'',password:''});
  const [loginErrors,setLoginErrors]=useState<Record<string,string>>({});
  const [authSaving,setAuthSaving]=useState(false);
  const [authGeneralError,setAuthGeneralError]=useState('');

  async function hashPassword(pw:string){
    try{
      const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pw));
      return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
    }catch{
      let h=0; for(let i=0;i<pw.length;i++){ h=((h<<5)-h)+pw.charCodeAt(i); h|=0; }
      return `fallback-${h}`;
    }
  }
  async function saveSession(user:{id:string;nombre:string;telefono:string;correo:string}){
    const value={userId:user.id,nombre:user.nombre,telefono:user.telefono,correo:user.correo};
    try{
      const existing:any=await api('records.list',{collection:'sesion-activa'});
      const first=(existing.records||[])[0];
      if(first){ await api('records.replace',{collection:'sesion-activa',id:first.id,value}); setSessionId(first.id); }
      else { const created:any=await api('records.create',{collection:'sesion-activa',value,idempotency_key:`sesion-${user.id}-${Date.now()}`}); if(created?.id) setSessionId(created.id); }
    }catch{ /* La sesión queda en pantalla aunque el guardado falle. */ }
  }
  async function submitRegister(e:React.FormEvent){
    e.preventDefault();
    const errs:Record<string,string>={};
    const nombre=regForm.nombre.trim();
    const telefono=regForm.telefono.trim();
    const correo=regForm.correo.trim().toLowerCase();
    if(!nombre) errs.nombre='Escribe tu nombre completo.';
    if(!telefono) errs.telefono='Escribe tu teléfono.';
    if(!correo) errs.correo='Escribe tu correo electrónico.';
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errs.correo='Escribe un correo válido.';
    if(!regForm.password) errs.password='Escribe una contraseña.';
    else if(regForm.password.length<6) errs.password='La contraseña debe tener al menos 6 caracteres.';
    if(!regForm.confirm) errs.confirm='Confirma tu contraseña.';
    else if(regForm.password!==regForm.confirm) errs.confirm='Las contraseñas no coinciden.';
    if(!regForm.terms) errs.terms='Debes aceptar los términos para crear tu cuenta.';
    setRegErrors(errs); setAuthGeneralError('');
    if(Object.keys(errs).length>0) return;
    setAuthSaving(true);
    try{
      const existing:any=await api('records.list',{collection:'usuarios-registrados'});
      const dup=(existing.records||[]).find((r:any)=>String(r.value?.correo||'').toLowerCase()===correo || String(r.value?.telefono||'').replace(/[^\d]/g,'')===telefono.replace(/[^\d]/g,''));
      if(dup){ setAuthGeneralError('Ya existe una cuenta con ese correo o teléfono. Inicia sesión.'); setAuthSaving(false); return; }
      const passwordHash=await hashPassword(regForm.password);
      const value={nombre,telefono,correo,passwordHash};
      const created:any=await api('records.create',{collection:'usuarios-registrados',value,idempotency_key:`usuario-${correo}`});
      const user={id:created?.id||`usuario-${correo}`,nombre,telefono,correo};
      setCurrentUser(user);
      await saveSession(user);
      setRegForm({nombre:'',telefono:'',correo:'',password:'',confirm:'',terms:false});
      setRegErrors({});
      setAuthModal(null);
      setToast(`¡Cuenta creada! Bienvenido, ${nombre}`);
      setTimeout(()=>setToast(''),2500);
    }catch(err:any){ setAuthGeneralError(err.message||'No se pudo crear la cuenta. Inténtalo de nuevo.'); }
    setAuthSaving(false);
  }
  async function submitLogin(e:React.FormEvent){
    e.preventDefault();
    const errs:Record<string,string>={};
    const identificador=loginForm.identificador.trim();
    if(!identificador) errs.identificador='Escribe tu correo o teléfono.';
    if(!loginForm.password) errs.password='Escribe tu contraseña.';
    setLoginErrors(errs); setAuthGeneralError('');
    if(Object.keys(errs).length>0) return;
    setAuthSaving(true);
    try{
      const existing:any=await api('records.list',{collection:'usuarios-registrados'});
      const needle=identificador.toLowerCase();
      const found=(existing.records||[]).find((r:any)=>String(r.value?.correo||'').toLowerCase()===needle || String(r.value?.telefono||'').replace(/[^\d]/g,'')===identificador.replace(/[^\d]/g,''));
      if(!found){ setAuthGeneralError('Esa cuenta no existe, regístrate primero.'); setAuthSaving(false); return; }
      const passwordHash=await hashPassword(loginForm.password);
      if(found.value?.passwordHash!==passwordHash){ setAuthGeneralError('Contraseña incorrecta.'); setAuthSaving(false); return; }
      const user={id:found.id,nombre:String(found.value?.nombre||'Usuario'),telefono:String(found.value?.telefono||''),correo:String(found.value?.correo||'')};
      setCurrentUser(user);
      await saveSession(user);
      setLoginForm({identificador:'',password:''});
      setLoginErrors({});
      setAuthModal(null);
      setToast(`¡Bienvenido de nuevo, ${user.nombre}`);
      setTimeout(()=>setToast(''),2500);
    }catch(err:any){ if(!authGeneralError) setAuthGeneralError(err.message||'No se pudo iniciar sesión. Inténtalo de nuevo.'); }
    setAuthSaving(false);
  }
  async function logout(){
    try{ if(sessionId) await api('records.delete',{collection:'sesion-activa',id:sessionId}); }catch{ /* La sesión se limpia en pantalla. */ }
    setSessionId(null); setCurrentUser(null);
    setToast('Sesión cerrada. ¡Hasta pronto!');
    setTimeout(()=>setToast(''),2000);
  }

  useEffect(()=>{ (async()=>{ try{ const d:any = await api('records.list',{collection:'reportes-pago-movil'}); setReports(d.records||[]);}catch(e){ setLoadErr('No se pudieron cargar los reportes guardados. El servicio no está disponible.'); } try{ const cm:any = await api('records.list',{collection:'comentarios-clientes'}); const list=(cm.records||[]).slice().sort((a:any,b:any)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime()); setComments(list);}catch(e){ /* Sin comentarios guardados: se muestran los ejemplos. */ } try{ const c:any = await api('records.list',{collection:'config-tienda'}); const first=(c.records||[])[0]; if(first){ if(first.value?.whatsapp) setOwnerWhatsApp(String(first.value.whatsapp)); setOwnerId(first.id); } }catch(e){ /* Configuración no disponible: se usa el número por defecto. */ } try{ const likes:any = await api('records.list',{collection:'me-gusta-comentarios'}); const liked:Record<string,boolean>={}; const ids:Record<string,string>={}; (likes.records||[]).forEach((r:any)=>{ if(r.value?.commentId){ liked[String(r.value.commentId)]=true; ids[String(r.value.commentId)]=r.id; } }); setLikedComments(liked); setLikeRecordIds(ids); }catch(e){ /* Sin me gusta guardados: todos los botones empiezan sin marcar. */ } try{ const s:any = await api('records.list',{collection:'sesion-activa'}); const first=(s.records||[])[0]; if(first?.value?.nombre){ setCurrentUser({id:String(first.value.userId||''),nombre:String(first.value.nombre),telefono:String(first.value.telefono||''),correo:String(first.value.correo||'')}); setSessionId(first.id); } }catch(e){ /* Sin sesión guardada: se muestra Iniciar sesión / Registrarse. */ } })(); },[]);

  const filtered = useMemo(()=>{
    let list=[...PRODUCTS];
    if(cat==='Videojuegos') list=list.filter(p=>p.cat==='Videojuegos');
    else if(cat==='Viajes') list=list.filter(p=>p.cat==='Viajes');
    else if(cat==='Multimarca') list=list.filter(p=>p.cat==='Multimarca');
    else if(cat==='Entretenimiento') list=list.filter(p=>p.cat==='Entretenimiento');
    else if(cat==='Privacidad y herramientas') list=list.filter(p=>p.cat==='Privacidad y herramientas');
    else if(cat==='Cripto') list=list.filter(p=>p.cat==='Cripto');
    else if(cat==='Añadido recientemente') list=list.filter(p=>[26,27,30,1,2].includes(p.id));
    else if(cat==='Transporte') list=list.filter(p=>p.cat==='Viajes');
    else if(cat==='IA') list=list.filter(p=>p.id===20||p.id===25);
    else if(cat==='Regalos') list=list.filter(p=>p.id===8||p.id===21||p.id===12);
    if(query) list=list.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()));
    if(filterCash) list=list.filter(p=>p.discount);
    if(filterVE) list=list.filter(p=>!p.badge || p.badge!=='Agotado');
    if(sort==='Calificación') list.sort((a,b)=>parseFloat(b.rating)-parseFloat(a.rating));
    if(sort==='Precio') list.sort((a,b)=>a.price.localeCompare(b.price));
    return list;
  },[cat,query,filterCash,filterVE,sort]);

  function openDetail(p:Prod){ setSelected(p); setDenIdx(0); setQty(1); setSaved(false); setView('detail'); window.scrollTo({top:0}); }
  async function copyText(text:string,label:string){
    let ok = false;
    // 1. API moderna (puede fallar en preview / iframe / sin permiso).
    try{
      if(navigator.clipboard && window.isSecureContext){
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    }catch{ /* Se intenta el fallback de abajo. */ }
    // 2. Fallback que funciona en iframe/preview: textarea temporal + execCommand.
    if(!ok){
      let ta: HTMLTextAreaElement | null = null;
      try{
        ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly','');
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.opacity = '0';
        ta.style.pointerEvents = 'none';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        ok = document.execCommand('copy');
      }catch{ ok = false; }
      finally{
        if(ta && ta.parentNode) ta.parentNode.removeChild(ta);
      }
    }
    // IMPORTANTE: limpia la selección para que NO quede texto marcado en azul.
    try{ if(window.getSelection) window.getSelection()?.removeAllRanges(); }catch{}
    if(document.activeElement instanceof HTMLElement) document.activeElement.blur();
    if(ok){
      setCopied(label);
      setToast('Copiado al portapapeles');
      setTimeout(()=>{ setCopied(''); setToast(''); },1500);
    }else{
      setToast('No se pudo copiar automáticamente. Inténtalo de nuevo.');
      setTimeout(()=>setToast(''),2000);
    }
  }
  async function saveOwnerWhatsApp(){
    const digits = ownerWhatsApp.replace(/[^\d]/g,'');
    if(!digits){ setOwnerMsg('Escribe tu número de WhatsApp con código de país.'); return; }
    setSavingOwner(true); setOwnerMsg('');
    try{
      const value={whatsapp:digits};
      if(ownerId){ await api('records.replace',{collection:'config-tienda',id:ownerId,value}); }
      else { const created:any = await api('records.create',{collection:'config-tienda',value,idempotency_key:'config-tienda-whatsapp'}); if(created?.id) setOwnerId(created.id); }
      setOwnerWhatsApp(digits);
      setOwnerMsg('Número de WhatsApp guardado. Todos los reportes llegarán a este número.');
    }catch(err:any){ setOwnerMsg(err.message||'No se pudo guardar el número. Inténtalo de nuevo.'); }
    setSavingOwner(false);
  }
  function buildWhatsAppUrl(){
    const now=new Date();
    const pad=(n:number)=>String(n).padStart(2,'0');
    const fecha=`${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const _denoms=denominationsFor(selected);
    const _den=_denoms[Math.min(denIdx,_denoms.length-1)]||_denoms[0];
    const denominacion=_den.label;
    const precio=selected.id===1 && _den.num!==undefined?`$${_den.num.toFixed(2)}`:_den.price;
    const message=[
      '🧾 NUEVO REPORTE DE PAGO - Bitrefill VE',
      '-------------------------',
      `Producto: ${selected.name} - Tarjeta regalo de ${denominacion}`,
      `Precio: ${precio}`,
      `Cantidad: ${qty}`,
      '-------------------------',
      'BANCO DESTINO: Banco de Venezuela (0102)',
      'TELÉFONO DESTINO: 0414-000-0000',
      'CÉDULA: V-12.345.678',
      'TITULAR: Tienda Bitrefill VE',
      '-------------------------',
      'DATOS DEL CLIENTE:',
      `N° Referencia: ${report.referencia}`,
      `Monto transferido: Bs. ${report.monto}`,
      `Teléfono que pagó: ${report.telefono}`,
      `Banco desde donde pagó: ${report.banco}`,
      `Titular de la cuenta: ${report.titular || 'No indicado'}`,
      `Fecha: ${fecha}`,
      '-------------------------',
      'Por favor verificar pago y enviar código.'
    ].join('\n');
    const digits=(ownerWhatsApp.replace(/[^\d]/g,'') || '584140000000');
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }
  async function submitReport(e:React.FormEvent){
    e.preventDefault();
    if(!report.referencia || !report.monto || !report.telefono || !report.banco){ setSaveMsg('Completa referencia, monto, teléfono y selecciona tu banco.'); return; }
    setSaving(true); setSaveMsg('');
    const whatsappUrl=buildWhatsAppUrl();
    setLastWhatsAppUrl(whatsappUrl);
    try{ window.open(whatsappUrl,'_blank','noopener,noreferrer'); }catch{ /* Si el navegador bloquea la pestaña, el botón de reenviar abre el mismo enlace. */ }
    const value={producto:selected.name, denominacion:(denominationsFor(selected)[Math.min(denIdx,denominationsFor(selected).length-1)]||denominationsFor(selected)[0]).label, cantidad:qty, referencia:report.referencia, monto:report.monto, telefono:report.telefono, banco:report.banco, titular:report.titular, metodo:'Pago Móvil', estado:'Pendiente por verificar', fecha:new Date().toISOString(), whatsapp:ownerWhatsApp.replace(/[^\d]/g,'') || '584140000000'};
    try{
      const key=`pago-${report.referencia}-${selected.id}-${Date.now()}`;
      await api('records.create',{collection:'reportes-pago-movil',value,idempotency_key:key});
      const d:any = await api('records.list',{collection:'reportes-pago-movil'});
      setReports(d.records||[]);
      setSaveMsg('✅ Reporte enviado - Se abrió WhatsApp con toda la información. Si no se abrió, pulsa aquí para reenviar.');
      setReport({referencia:'',monto:'',telefono:'',banco:'',titular:''});
    }catch(err:any){ setSaveMsg(err.message||'No se pudo guardar el reporte. Inténtalo de nuevo.'); }
    setSaving(false);
  }
  const EXAMPLE_COMMENTS:any[] = [
    {id:'ejemplo-1',created_at:new Date(Date.now()-2*24*60*60*1000).toISOString(),value:{nombre:'Carlos R.',verificado:true,rating:5,texto:'Me llegó el código de Steam en menos de 10 minutos, pagué por Pago Móvil y todo fino. 100% recomendado.',helpful:12,fechaLabel:'hace 2 días'}},
    {id:'ejemplo-2',created_at:new Date(Date.now()-3*24*60*60*1000).toISOString(),value:{nombre:'María G.',verificado:true,rating:5,texto:'Al principio tenía dudas pero me atendieron por WhatsApp y me verificaron el pago rápido. Muy confiable.',helpful:9,fechaLabel:'hace 3 días'}},
    {id:'ejemplo-3',created_at:new Date(Date.now()-5*24*60*60*1000).toISOString(),value:{nombre:'José L.',verificado:true,rating:4,texto:'Buen precio y entrega rápida. La segunda vez que compro y todo bien.',helpful:8,fechaLabel:'hace 5 días'}},
  ];
  function timeAgo(iso?:string){
    if(!iso) return 'Hace un momento';
    const diff=Date.now()-new Date(iso).getTime();
    const mins=Math.floor(diff/60000);
    if(mins<1) return 'Hace un momento';
    if(mins<60) return `Hace ${mins} ${mins===1?'minuto':'minutos'}`;
    const hours=Math.floor(mins/60);
    if(hours<24) return `Hace ${hours} ${hours===1?'hora':'horas'}`;
    const days=Math.floor(hours/24);
    return `Hace ${days} ${days===1?'día':'días'}`;
  }
  async function submitComment(e:React.FormEvent){
    e.preventDefault();
    if(!commentForm.texto.trim()){ setCommentMsg('Escribe tu comentario para publicarlo.'); return; }
    if(commentForm.rating===0){ setCommentMsg('Elige cuántas estrellas le das a tu experiencia.'); return; }
    setSavingComment(true); setCommentMsg('');
    const value={nombre:currentUser ? currentUser.nombre : 'Cliente',verificado:!!currentUser,rating:commentForm.rating,texto:commentForm.texto.trim(),helpful:0,fecha:new Date().toISOString()};
    try{
      const key=`comentario-${Date.now()}`;
      await api('records.create',{collection:'comentarios-clientes',value,idempotency_key:key});
      const d:any = await api('records.list',{collection:'comentarios-clientes'});
      const list=(d.records||[]).slice().sort((a:any,b:any)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
      setComments(list);
      setCommentForm({rating:0,texto:''});
      setHoverRating(0);
      setCommentMsg('¡Gracias! Tu opinión ya está publicada.');
      try{ if(window.getSelection) window.getSelection()?.removeAllRanges(); }catch{}
      if(document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }catch(err:any){ setCommentMsg(err.message||'No se pudo publicar tu comentario. Inténtalo de nuevo.'); }
    setSavingComment(false);
  }
  async function markHelpful(c:any){
    const commentId=String(c.id);
    if(likingComments[commentId]) return;
    const already=!!likedComments[commentId];
    setLikingComments(prev=>({...prev,[commentId]:true}));
    setLikedComments(prev=>{ const next={...prev}; if(already) delete next[commentId]; else next[commentId]=true; return next; });
    try{
      if(already){
        const recordId=likeRecordIds[commentId];
        if(recordId){ await api('records.delete',{collection:'me-gusta-comentarios',id:recordId}); }
        setLikeRecordIds(prev=>{ const next={...prev}; delete next[commentId]; return next; });
      } else {
        const created:any=await api('records.create',{collection:'me-gusta-comentarios',value:{commentId},idempotency_key:`me-gusta-${commentId}-${Date.now()}`});
        if(created?.id) setLikeRecordIds(prev=>({...prev,[commentId]:created.id}));
        else { const refreshed:any=await api('records.list',{collection:'me-gusta-comentarios'}); const ids:Record<string,string>={}; (refreshed.records||[]).forEach((r:any)=>{ if(r.value?.commentId) ids[String(r.value.commentId)]=r.id; }); setLikeRecordIds(ids); }
      }
    }catch(e){
      setLikedComments(prev=>{ const next={...prev}; if(already) next[commentId]=true; else delete next[commentId]; return next; });
    } finally {
      setLikingComments(prev=>{ const next={...prev}; delete next[commentId]; return next; });
    }
  }
  const displayComments = comments.length>0 ? comments : EXAMPLE_COMMENTS;
  const denoms = denominationsFor(selected);
  const den = denoms[Math.min(denIdx,denoms.length-1)]||denoms[0];
  const isMoney = selected.id===1 || den.price.startsWith('$') || den.price.startsWith('€');
  const _cur = selected.id===1 ? '$' : den.price.startsWith('€') ? '€' : '$';
  const displayPrice = isMoney && den.num!==undefined ? `${_cur}${(den.num*qty).toFixed(2)}` : den.price;

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box',paddingTop:'var(--safe-area-inset-top)',minHeight:'100vh',background:'#121212',color:'#fff'}} className="overflow-x-clip">
      {toast && <div role="status" aria-live="polite" className="fixed left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-[#1E1E1E] border border-[#2A2A2A] shadow-2xl rounded-full px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap" style={{top:'calc(var(--safe-area-inset-top) + 12px)'}}><Check size={15} className="text-[#22C55E] shrink-0"/> {toast}</div>}
      {/* HEADER */}
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-40 bg-[#0A0A0A] border-b border-[#2A2A2A]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 py-3 flex items-center gap-4 flex-nowrap" style={{display:'flex',alignItems:'center',gap:16,flexWrap:'nowrap'}}>
          <button onClick={()=>{setView('home');setCat(CATS[0]);}} aria-label="ZPLAY GAME STUDIO" className="leading-none flex items-center bg-transparent border-0 p-0 m-0 cursor-pointer" style={{flexShrink:0,flexGrow:0,width:'min(170px, 30vw)',height:'auto'}}><img src={zplayLogo} alt="ZPLAY GAME STUDIO" loading="eager" decoding="async" className="block" style={{width:'100%',height:'auto',aspectRatio:'auto',objectFit:'contain',display:'block',imageRendering:'auto'}} /></button>
          <div className="flex flex-1 min-w-0 items-center gap-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-full px-3 sm:px-4 h-[44px]">
            <Search size={18} className="text-[#A0A0A0] shrink-0"/>
            <input value={query} onChange={e=>{setQuery(e.target.value); setView('home');}} placeholder="Search for Gift Cards, eSIMs, Top-ups..." className="bg-transparent flex-1 text-[14px] placeholder:text-[#A0A0A0] border-0 min-w-0"/>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
            {currentUser ? (
              <>
                <span className="flex items-center gap-1.5 min-w-0"><span className="w-[30px] h-[30px] rounded-full bg-[#FF1E3C] text-white font-bold text-[14px] flex items-center justify-center shrink-0">{currentUser.nombre.trim().charAt(0).toUpperCase()}</span><span className="text-[12px] sm:text-[13px] font-semibold whitespace-nowrap max-w-[110px] sm:max-w-[150px] truncate">Hola, {currentUser.nombre.split(' ')[0]}</span></span>
                <button onClick={logout} className="bg-transparent border border-[#3A3A3A] text-white px-2.5 sm:px-3 py-2 rounded-[10px] text-[12px] sm:text-[13px] font-semibold whitespace-nowrap">Salir</button>
              </>
            ) : (
              <>
                <button onClick={()=>{setAuthGeneralError('');setLoginErrors({});setAuthModal('login');}} className="bg-transparent border border-[#3A3A3A] text-white px-2.5 sm:px-3.5 py-2 rounded-[10px] text-[12px] sm:text-[13px] font-semibold whitespace-nowrap">Iniciar sesión</button>
                <button onClick={()=>{setAuthGeneralError('');setRegErrors({});setAuthModal('register');}} className="bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] text-white font-bold px-2.5 sm:px-3.5 py-2 rounded-[10px] text-[12px] sm:text-[13px] whitespace-nowrap shadow-[0_8px_20px_rgba(255,30,60,0.35)]">Registrarse</button>
              </>
            )}
          </div>
        </div>

      </header>

      {view==='home' ? (
        <main className="w-full px-3 sm:px-5 py-5">
          <section className="w-full min-w-0">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">{CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`whitespace-nowrap px-3 py-2 rounded-full border text-[13px] ${cat===c?'bg-[#2E2E2E] border-white':'border-[#2A2A2A] bg-[#1E1E1E] text-[#A0A0A0]'}`}>{c}</button>)}</div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h1 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-none">Todas las tarjetas regalo</h1>
              <span className="text-[#A0A0A0] text-[13px]">{filtered.length} productos</span>
            </div>

            {/* FILTER PILLS */}
            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <button onClick={()=>setSort(sort==='Calificación'?'Popular':'Calificación')} className={`px-3 py-2 rounded-full border text-[13px] bg-[#1E1E1E] ${sort==='Calificación'?'border-white':'border-[#2A2A2A]'}`}>Calificación</button>
              <button onClick={()=>setFilterCash(!filterCash)} className={`px-3 py-2 rounded-full border text-[13px] bg-[#1E1E1E] ${filterCash?'border-white':'border-[#2A2A2A]'}`}>Cashback {filterCash && '✓'}</button>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[13px] text-[#A0A0A0] hidden sm:inline">Ordenar por:</span>
                <select value={sort} onChange={e=>setSort(e.target.value)} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-full px-3 py-2 text-[13px]"><option>Popular</option><option>Calificación</option><option>Precio</option></select>
              </div>
            </div>
            {tab!=='Tarjetas regalo' && <div className="mt-4 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[13px] text-[#A0A0A0]">Estás viendo <b className="text-white">{tab}</b>. El catálogo completo de tarjetas regalo está arriba. Usa “Tarjetas regalo” para volver al grid.</div>}

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
              {filtered.map(p=>(
                <article key={p.id} onClick={()=>openDetail(p)} className="card-hover cursor-pointer bg-[#1E1E1E] border border-[#2A2A2A] rounded-[16px] overflow-hidden text-left">
                  <div className="relative aspect-square flex flex-col items-center justify-center p-4 text-center overflow-hidden" style={{background:p.bg}}>
                    {p.badge && <span className="absolute top-2 left-2 text-[11px] font-bold px-2 py-1 rounded-full text-white" style={{background:p.badgeColor}}>{p.badge}</span>}
                    {p.discount && <span className="absolute top-2 right-2 bg-[#FFC107] text-black text-[11px] font-bold px-2 py-1 rounded-full">{p.discount} descuento</span>}
                    <div className="font-display font-black leading-[0.9] break-words" style={{color:p.fg,fontSize:'clamp(20px,2.2vw,32px)'}}>{p.big}</div>
                    <div className="text-[10px] tracking-[0.18em] mt-2 font-semibold opacity-80" style={{color:p.fg}}>{p.sub}</div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/25 flex items-center justify-center text-[12px]">↗</div>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="font-bold text-[13px] sm:text-[14px] leading-snug line2">{p.name}</h3>
                    <span className="flex items-center gap-1 text-[13px] font-semibold"><Star size={13} className="fill-[#FFC107] text-[#FFC107]"/>{p.rating}★</span>
                    <p className="text-[#A0A0A0] text-[12px] sm:text-[13px] leading-snug break-words">{p.price}</p>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length===0 && <div className="mt-8 bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-6 text-center"><p className="font-bold">Sin resultados</p><p className="text-[#A0A0A0] text-[13px] mt-1">Quita un filtro o busca otro nombre.</p><button onClick={()=>{setQuery('');setFilterCash(false);setFilterVE(false);setCat(CATS[0]);}} className="mt-3 bg-white text-black px-4 py-2 rounded-full text-[13px] font-semibold">Ver todo</button></div>}
            <p className="text-[12px] text-[#A0A0A0] mt-6 leading-relaxed">Compra protegida • Entrega por correo electrónico • Atención 24/7. Los precios en US$ incluyen la comisión de servicio mostrada en el detalle.</p>
          </section>
        </main>
      ) : (
        /* DETAIL */
        <main className="max-w-[1440px] mx-auto px-3 sm:px-5 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button onClick={()=>setView('home')} className="flex items-center gap-1 text-[13px] text-[#A0A0A0] hover:text-white"><ArrowLeft size={16}/> Internacional <ChevronRight size={14}/> Videojuegos</button>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 bg-[#1E1E1E] border border-[#2A2A2A] px-3 py-2 rounded-full text-[13px]"><Share2 size={15}/> Compartir</button>
              <button onClick={()=>setSaved(!saved)} className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] border ${saved?'bg-white text-black border-white':'bg-[#1E1E1E] border-[#2A2A2A]'}`}><Bookmark size={15} className={saved?'fill-black':''}/> {saved?'Guardado':'Guardar'}</button>
            </div>
          </div>

          <h1 className="font-display text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.02] mt-4">Tarjeta regalo {selected.name}</h1>
          <div className="flex items-center gap-2 mt-2"><span className="flex text-[#FFC107]">{[1,2,3,4,5].map(i=><Star key={i} size={17} className="fill-[#FFC107]"/>)}</span><span className="text-[14px] font-semibold">5 (669)</span><span className="text-[#A0A0A0] text-[13px]">• {selected.rating}★ en esta tarjeta</span></div>

          <div className="grid lg:grid-cols-[60%_40%] gap-5 mt-5 items-start">
            {/* LEFT */}
            <section className="min-w-0">
              <ul className="space-y-3 text-[14px] sm:text-[15px] leading-relaxed">
                <li className="flex gap-2"><span className="text-[#FF1E3C] mt-0.5 shrink-0"><Triangle size={13} className="fill-[#FF1E3C]"/></span>Compra juegos PC y artículos de Dota 2 y CS.</li>
                <li className="flex gap-2"><span className="text-[#FF1E3C] mt-0.5 shrink-0"><Triangle size={13} className="fill-[#FF1E3C]"/></span>Entrega inmediata por correo electrónico</li>
                <li className="flex gap-2"><span className="text-[#FF1E3C] mt-0.5 shrink-0"><Triangle size={13} className="fill-[#FF1E3C]"/></span><span>Paga con Pago Móvil en bolívares</span></li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-[13px] bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl px-3 py-3"><Globe size={16} className="shrink-0"/> Para cuentas de Steam con saldo en USD (USA) <button className="text-white underline underline-offset-2">Más opciones</button></div>

              <div className="flex gap-3 mt-4">
                <div className="w-[110px] sm:w-[150px] shrink-0 rounded-[12px] flex flex-col items-center justify-center aspect-square text-center p-2" style={{background:selected.bg}}><span className="font-display font-black leading-none" style={{color:selected.fg,fontSize:'clamp(18px,3vw,28px)'}}>{selected.big}</span><span className="text-[9px] tracking-widest mt-1" style={{color:selected.fg}}>{selected.sub}</span></div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
                  {denoms.map((d,i)=>({label:d.label,price:d.price,idx:i})).map((d:any)=>(
                    <button key={d.idx} onClick={()=>setDenIdx(d.idx)} className={`rounded-[12px] border p-3 sm:p-4 text-left ${ (selected.id===1?denIdx===d.idx:denIdx===d.idx)?'border-white bg-[#232323]':'border-[#2A2A2A] bg-[#1E1E1E]'}`}>
                      <div className="font-display font-extrabold text-[16px] sm:text-[20px] leading-tight break-words">{d.label}</div>
                      <div className="text-[#A0A0A0] text-[12px] sm:text-[13px] mt-1">{d.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[13px]"><span className="w-7 h-7 rounded-full bg-[#232323] border border-[#2A2A2A] flex items-center justify-center">🌐</span> Canjear online / app móvil</div>

              <div className="mt-4 bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4 sm:p-5">
                <div className="flex justify-between items-center"><h2 className="font-bold text-[16px]">Cómo funciona</h2><button className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center">−</button></div>
                <ol className="mt-3 space-y-3 text-[13px] sm:text-[14px] text-[#D9D9D9] leading-relaxed">
                  <li><b className="text-white">1.</b> Después de recibir el código de su tarjeta de regalo de Steam, inicie sesión en su cuenta de Steam.</li>
                  <li><b className="text-white">2.</b> A continuación, haga clic en el nombre de su cuenta y seleccione los detalles de la cuenta.</li>
                  <li><b className="text-white">3.</b> Luego, elija “agregar fondos a su cuenta de Steam” y canjea el código.</li>
                </ol>
              </div>

              {/* PAGO MOVIL - ALWAYS VISIBLE */}
              <div className="mt-6 w-full max-w-[720px] mx-auto bg-[#1A1A1E] border border-[#2E2E35] rounded-[20px] p-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h2 className="flex items-center gap-3 min-w-0">
                    <span className="bg-[#FF1E3C] border border-[#FF5A6E]/60 text-white text-[10px] font-black tracking-[0.12em] px-3 py-1.5 rounded-full shrink-0 shadow-[0_6px_18px_rgba(255,30,60,0.35)]">VENEZUELA</span>
                    <span className="font-bold text-[24px] leading-none tracking-[-0.5px] text-white">Pago Móvil</span>
                  </h2>
                  <span className="flex items-center gap-2 text-[12px] text-[#9CA3AF] pt-2 shrink-0"><span className="flex items-center gap-1.5"><span className="w-[4px] h-[4px] rounded-full bg-[#9CA3AF]"/>Sin tarjeta</span><span className="flex items-center gap-1.5"><span className="w-[4px] h-[4px] rounded-full bg-[#9CA3AF]"/>Verificación manual</span></span>
                </div>
                <p className="text-[14px] text-[#C6C6CC] mt-4 leading-[1.6]">Elige Pago Móvil para pagar en bolívares. Transfiere el monto exacto, copia los datos y reporta tu pago abajo.</p>
                <div className="bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] text-white shadow-[0_8px_20px_rgba(255,30,60,0.35)] py-[11px] rounded-[10px] font-bold text-[14px] text-center mt-5 mb-4">Pago Móvil</div>
                <>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        {label:'Banco', value:'Banco de Venezuela (0102)', Icon:Landmark},
                        {label:'Teléfono', value:'0414-000-0000', Icon:Phone},
                        {label:'Cédula', value:'V-12.345.678', Icon:Fingerprint},
                        {label:'Titular', value:'Tienda Bitrefill VE', Icon:User},
                      ].map(({label,value,Icon})=>(
                        <div key={label} role="button" tabIndex={0} aria-label={`Copiar ${label}: ${value}`} title="Toca para copiar" onClick={()=>copyText(value,label)} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); copyText(value,label); } }} style={{height:78,minHeight:78,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,padding:'16px 18px'}} className="pago-card bg-[#242428] border border-[#33333A] rounded-[14px] cursor-pointer">
                          <span style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:4}}>
                            <span className="flex items-center gap-1.5 text-[#8B8B93] text-[10px] font-semibold uppercase tracking-[1px]"><Icon size={13} strokeWidth={2}/>{label}</span>
                            <span className="pago-value font-bold text-white" style={{display:'block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',fontSize:14,lineHeight:1.3,minHeight:20}}>{value}</span>
                          </span>
                          <button type="button" onMouseDown={(e)=>e.preventDefault()} onClick={(e)=>{ e.stopPropagation(); e.currentTarget.blur(); copyText(value,label); }} style={{width:88,height:30,minWidth:88,maxWidth:88,flexShrink:0,flexGrow:0,display:'inline-flex',alignItems:'center',justifyContent:'center',whiteSpace:'nowrap',padding:0,fontSize:12,gap:4}} className={`pago-copy font-semibold rounded-full ${copied===label?'text-[#00E676]':'text-[#FFC107]'}`}>{copied===label?<Check size={13}/>:<Copy size={13}/>}<span style={{whiteSpace:'nowrap',fontSize:12,lineHeight:1}}>{copied===label?'¡Copiado!':'Copiar'}</span></button>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={submitReport} className="mt-7">
                      <h3 className="flex items-center gap-2.5 font-bold text-[18px] text-white"><span className="w-[4px] h-[18px] rounded-full bg-[#FF1E3C] shrink-0"/>Reportar pago</h3>
                      <div className="grid sm:grid-cols-2 gap-3 mt-4">
                        <input value={report.referencia} onChange={e=>setReport({...report,referencia:e.target.value})} placeholder="N° de referencia *" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>
                        <input value={report.monto} onChange={e=>setReport({...report,monto:e.target.value})} placeholder="Monto transferido *" inputMode="decimal" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>
                        <input value={report.telefono} onChange={e=>setReport({...report,telefono:e.target.value})} placeholder="Tu teléfono *" inputMode="tel" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>
                        <div className="relative">
                          <select required aria-label="Selecciona tu banco" value={report.banco} onChange={e=>setReport({...report,banco:e.target.value})} className={`pago-input appearance-none bg-[#242428] border border-[#33333A] rounded-[12px] pl-4 pr-10 py-[14px] text-[14px] w-full ${report.banco ? 'text-white' : 'text-[#6B6B73]'}`}><option value="" disabled>Selecciona tu banco</option>{VENEZUELA_BANKS.map((b)=><option key={b} value={b} className="text-white bg-[#242428]">{b}</option>)}</select>
                          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B93]"/>
                        </div>
                        <input value={report.titular} onChange={e=>setReport({...report,titular:e.target.value})} placeholder="Titular de la cuenta (opcional)" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full sm:col-span-2 placeholder:text-[#6B6B73] text-white"/>
                      </div>
                      <button disabled={saving} className="pago-submit w-full mt-4 bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] disabled:opacity-60 h-[52px] rounded-[12px] font-bold text-[15px] text-white shadow-[0_12px_28px_rgba(255,30,60,0.32)] flex items-center justify-center gap-2">{saving?'Guardando reporte…':<><Send size={16}/>Reportar pago</>}</button>
                      {saveMsg && <p className={`text-[13px] mt-3 leading-relaxed ${saveMsg.includes('enviado')||saveMsg.includes('guardado')?'text-[#00E676]':saveMsg.includes('Completa')?'text-[#FF5252]':'text-[#FFC107]'}`}>{saveMsg}</p>}
                      {saveMsg.includes('enviado') && lastWhatsAppUrl && <button type="button" onClick={()=>{ try{ window.open(lastWhatsAppUrl,'_blank','noopener,noreferrer'); }catch{} }} className="mt-1 text-[13px] font-semibold text-[#00E676] underline underline-offset-2 text-left">Pulsa aquí para reenviar por WhatsApp</button>}
                    </form>
                    <div className="mt-7">
                      <p className="flex items-center gap-2 text-[12px] text-[#8B8B93] font-medium"><span className="w-[6px] h-[6px] rounded-full bg-[#00E676] shrink-0"/>Reportes guardados ({reports.length})</p>
                      {loadErr && <p className="text-[12px] text-[#A0A0A0] mt-3">{loadErr}</p>}
                      {reports.length===0 ? <p className="text-[12px] text-[#A0A0A0] mt-3">Aún no hay reportes guardados para esta tienda.</p> : <ul className="mt-3 space-y-2">{reports.slice(0,5).map((r:any)=><li key={r.id} className="bg-[#242428] border border-[#33333A] rounded-[12px] px-3 py-3 text-[13px] flex justify-between gap-3 flex-wrap items-center"><span className="text-white min-w-0"><b>{r.value?.producto}</b> • Ref. {r.value?.referencia} • {r.value?.monto}</span><span className="flex items-center gap-1.5 text-[#FFC107] font-medium shrink-0"><span className="w-[6px] h-[6px] rounded-full bg-[#FFC107]"/>Pendiente por verificar</span></li>)}</ul>}
                    </div>
                  </>
              </div>

              {/* OPINIONES DE NUESTROS CLIENTES */}
              <div className="mt-6 w-full max-w-[720px] mx-auto bg-[#1A1A1E] border border-[#2E2E35] rounded-[20px] p-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <h2 className="font-bold text-[20px] leading-tight text-white">Opiniones de nuestros clientes</h2>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="flex text-[#FFC107]">{[1,2,3,4,5].map(i=><Star key={i} size={17} className="fill-[#FFC107]"/>)}</span>
                  <span className="text-[14px] font-bold text-white">4.9</span>
                  <span className="text-[13px] text-[#A0A0A0]">4.9 de 5 • Basado en opiniones de clientes</span>
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#00E676]"><span className="w-[6px] h-[6px] rounded-full bg-[#00E676]"/>Verificado</span>
                </div>
                <p className="text-[13px] text-[#A0A0A0] mt-2 leading-relaxed">Compra con confianza. Así nos califican quienes ya recargaron con nosotros.</p>

                <form onSubmit={submitComment} className="mt-6">
                  <h3 className="font-bold text-[14px] text-white">Deja tu opinión</h3>
                  <div className="flex items-center gap-1 mt-4" role="radiogroup" aria-label="Calificación con estrellas">
                    {[1,2,3,4,5].map(n=>(
                      <button key={n} type="button" aria-label={`${n} ${n===1?'estrella':'estrellas'}`} onMouseEnter={()=>setHoverRating(n)} onMouseLeave={()=>setHoverRating(0)} onClick={()=>setCommentForm({...commentForm,rating:n})} className="p-1 transition-transform hover:scale-110">
                        <Star size={30} className={(hoverRating||commentForm.rating)>=n ? 'fill-[#FFC107] text-[#FFC107]' : 'fill-[#3A3A3A] text-[#3A3A3A]'}/>
                      </button>
                    ))}
                    {commentForm.rating>0 && <span className="text-[13px] text-[#A0A0A0] ml-1">{commentForm.rating} de 5</span>}
                  </div>
                  <label htmlFor="comentario-texto" className="block text-[13px] font-semibold text-white mt-4">Tu comentario</label>
                  <textarea id="comentario-texto" value={commentForm.texto} onChange={e=>setCommentForm({...commentForm,texto:e.target.value})} placeholder="Cuéntanos cómo te fue con tu recarga..." aria-label="Cuéntanos cómo te fue con tu recarga" rows={3} className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white mt-2 resize-none" style={{height:90,minHeight:90}}/>
                  <button disabled={savingComment} className="pago-submit w-full mt-4 bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] disabled:opacity-60 h-[48px] rounded-[12px] font-bold text-[15px] text-white shadow-[0_12px_28px_rgba(255,30,60,0.32)] flex items-center justify-center">{savingComment?'Publicando…':'Publicar comentario'}</button>
                  {commentMsg && <p className={`text-[13px] mt-3 leading-relaxed ${commentMsg.includes('¡Gracias')?'text-[#00E676]':'text-[#FFC107]'}`}>{commentMsg}</p>}
                </form>

                <div className="mt-7 space-y-3">
                  {displayComments.map((c:any)=>{
                    const initial=(c.value?.nombre||'C').trim().charAt(0).toUpperCase();
                    const isLiked = !!likedComments[String(c.id)];
                    const isLiking = !!likingComments[String(c.id)];
                    const helpful = (c.value?.helpful||0) + (isLiked ? 1 : 0);
                    const rawName = String(c.value?.nombre||'Cliente');
                    const isVerified = c.value?.verificado ?? (rawName !== 'Cliente Verificado' && rawName !== 'Cliente');
                    const displayName = rawName === 'Cliente Verificado' ? 'Cliente' : rawName;
                    return (
                      <article key={c.id} className="bg-[#242428] border border-[#33333A] rounded-[14px] p-4">
                        <div className="flex items-start gap-3">
                          <span className="w-[38px] h-[38px] rounded-full bg-[#FF1E3C] text-white font-bold text-[16px] flex items-center justify-center shrink-0">{initial}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-[14px] text-white leading-tight flex flex-wrap items-center gap-1.5 select-none" style={{userSelect:'none',WebkitUserSelect:'none'}}><span>{displayName}</span>{isVerified && <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00E676]">✓ Verificado</span>}</p>
                            <p className="text-[12px] text-[#A0A0A0] mt-0.5">{c.value?.fechaLabel || timeAgo(c.created_at)}</p>
                          </div>
                          <span className="flex text-[#FFC107] shrink-0">{[1,2,3,4,5].map(i=><Star key={i} size={14} className={i<=(c.value?.rating||0)?'fill-[#FFC107]':'fill-[#3A3A3A] text-[#3A3A3A]'}/>)}</span>
                        </div>
                        <p className="text-[14px] text-[#D9D9D9] leading-[1.6] mt-3">{c.value?.texto}</p>
                        <button type="button" disabled={isLiking} aria-pressed={isLiked} aria-label={isLiked ? 'Quitar me gusta' : 'Dar me gusta'} title={isLiked ? 'Quitar me gusta' : 'Dar me gusta'} onClick={()=>markHelpful(c)} className={`mt-3 flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-full border transition-colors ${isLiked ? 'bg-[rgba(255,30,60,0.15)] border-[#FF1E3C] text-white' : 'border-transparent text-[#A0A0A0] hover:text-white'} ${isLiking ? 'opacity-60' : ''}`}><ThumbsUp size={15} className={isLiked ? 'text-[#FF1E3C] fill-[#FF1E3C]' : ''}/> Útil ({helpful})</button>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* RIGHT */}
            <aside className="lg:sticky lg:top-[132px] space-y-3">
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center font-black text-[16px] shrink-0" style={{background:selected.bg,color:selected.fg}}>{selected.big.slice(0,2)}</div>
                  <div className="min-w-0"><p className="font-bold text-[14px] truncate">{selected.name}</p><p className="text-[#A0A0A0] text-[12px]">Tarjeta regalo de {den.label}</p></div>
                  <div className="ml-auto flex items-center gap-1 bg-[#121212] border border-[#2A2A2A] rounded-full px-2 py-1 shrink-0"><button aria-label="Disminuir cantidad" onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><span className="w-[18px] text-center text-[14px] font-bold">{qty}</span><button aria-label="Aumentar cantidad" onClick={()=>setQty(qty+1)}><Plus size={14}/></button></div>
                </div>
                <p className="font-display text-[clamp(34px,4vw,48px)] font-black leading-none mt-4">{displayPrice}</p>
                <p className="text-[#A0A0A0] text-[12px] mt-1">Incluye comisión de servicio. Total por {qty} {qty===1?'unidad':'unidades'}.</p>
              </div>
              <div id="pago-movil" className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4">
                <div className="flex items-center justify-between"><span className="font-bold">Excelente 4.5/5</span><span className="flex text-[#00B67A]">{[1,2,3,4,5].map(i=><Star key={i} size={15} className="fill-[#00B67A]"/>)}</span></div>
                <p className="text-[12px] text-[#A0A0A0] mt-1">Trustpilot • Reseñas verificadas</p>
                <div className="mt-3 space-y-2 text-[13px]">
                  <p className="flex gap-2"><ShieldCheck size={16} className="text-[#00C853] shrink-0"/> Compra protegida • Política de reembolso justa</p>
                  <p className="flex gap-2"><Headphones size={16} className="text-[#00C853] shrink-0"/> Atención al cliente 24/7 • Centro de ayuda</p>
                  <p className="flex gap-2"><Clock size={16} className="text-[#00C853] shrink-0"/> Entrega inmediata por correo electrónico</p>
                </div>
              </div>
              <button onClick={()=>setView('home')} className="w-full text-center text-[13px] text-[#A0A0A0] hover:text-white py-1">← Volver a todas las tarjetas regalo</button>
            </aside>
          </div>
        </main>
      )}

      {inviteOpen && (
        <div role="dialog" aria-modal="true" aria-label="Invitar a un amigo" className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={()=>setInviteOpen(false)}>
          <div className="w-full bg-[#1A1A1E] border border-[#2E2E35] rounded-[20px] p-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] my-auto" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div><h2 className="text-white font-bold text-[22px] leading-tight">Invitar a un amigo</h2><p className="text-[13px] text-[#A0A0A0] mt-1.5 leading-relaxed">Comparte tu enlace y gana cuando tu amigo haga su primera compra.</p></div>
              <button aria-label="Cerrar" onClick={()=>setInviteOpen(false)} className="w-8 h-8 shrink-0 rounded-full border border-[#2E2E35] flex items-center justify-center text-[#A0A0A0] hover:text-white"><X size={16}/></button>
            </div>
            <div className="mt-5 bg-[#2A2A2E] rounded-[12px] px-[18px] py-[14px] text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
              <p className="text-[12px] text-[#C6C6CC] m-0">Asegúrate de estar visitando</p>
              <div className="mt-2 flex justify-center">
                <span className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white rounded-[999px] px-5 py-2.5 text-[13px] font-semibold shadow-[0_6px_16px_rgba(0,0,0,0.45)]">🔒 https://www.bitrefill.com</span>
              </div>
            </div>
            <div className="mt-5 bg-[#242428] border border-dashed border-[#444] rounded-[12px] px-4 py-[14px]">
              <p className="text-[14px] font-bold text-white m-0">Tu enlace de invitación</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-[13px] text-[#C6C6CC] truncate" style={{userSelect:'none',WebkitUserSelect:'none'}}>https://www.bitrefill.com/invite</span>
                <button type="button" onClick={()=>copyText('https://www.bitrefill.com/invite','Invitación')} className={`shrink-0 flex items-center gap-1.5 text-[12px] font-semibold ${copied==='Invitación'?'text-[#00E676]':'text-[#FFC107]'}`}>{copied==='Invitación'?<Check size={13}/>:<Copy size={13}/>} {copied==='Invitación'?'¡Copiado!':'Copiar'}</button>
              </div>
            </div>
            <button type="button" onClick={()=>copyText('https://www.bitrefill.com/invite','Invitación')} className="pago-submit w-full mt-4 bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] h-[50px] rounded-[12px] font-bold text-[15px] text-white shadow-[0_12px_28px_rgba(255,30,60,0.32)] flex items-center justify-center gap-2"><Share2 size={16}/> Compartir enlace de invitación</button>
          </div>
        </div>
      )}

      {authModal && (
        <div role="dialog" aria-modal="true" aria-label={authModal==='register'?'Crear tu cuenta':'Bienvenido de nuevo'} className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={()=>setAuthModal(null)}>
          <div className="w-full bg-[#1A1A1E] border border-[#2E2E35] rounded-[20px] p-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] my-auto" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div><h2 className="text-white font-bold text-[22px] leading-tight">{authModal==='register'?'Crear tu cuenta':'Bienvenido de nuevo'}</h2><p className="text-[13px] text-[#A0A0A0] mt-1.5 leading-relaxed">{authModal==='register'?'Regístrate para comprar más rápido y dejar tus opiniones.':'Inicia sesión para comprar más rápido y dejar tus opiniones.'}</p></div>
              <button aria-label="Cerrar" onClick={()=>setAuthModal(null)} className="w-8 h-8 shrink-0 rounded-full border border-[#2E2E35] flex items-center justify-center text-[#A0A0A0] hover:text-white"><X size={16}/></button>
            </div>
            {authModal==='register' ? (
              <form onSubmit={submitRegister} className="mt-5" noValidate>
                <div className="space-y-3">
                  <div><input value={regForm.nombre} onChange={e=>setRegForm({...regForm,nombre:e.target.value})} placeholder="Nombre completo *" autoComplete="name" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{regErrors.nombre && <p className="text-[#FF5252] text-[12px] mt-1.5">{regErrors.nombre}</p>}</div>
                  <div><input value={regForm.telefono} onChange={e=>setRegForm({...regForm,telefono:e.target.value})} placeholder="Teléfono (ej: 0414-000-0000) *" inputMode="tel" autoComplete="tel" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{regErrors.telefono && <p className="text-[#FF5252] text-[12px] mt-1.5">{regErrors.telefono}</p>}</div>
                  <div><input value={regForm.correo} onChange={e=>setRegForm({...regForm,correo:e.target.value})} placeholder="Correo electrónico *" type="email" autoComplete="email" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{regErrors.correo && <p className="text-[#FF5252] text-[12px] mt-1.5">{regErrors.correo}</p>}</div>
                  <div><input value={regForm.password} onChange={e=>setRegForm({...regForm,password:e.target.value})} placeholder="Contraseña *" type="password" autoComplete="new-password" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{regErrors.password && <p className="text-[#FF5252] text-[12px] mt-1.5">{regErrors.password}</p>}</div>
                  <div><input value={regForm.confirm} onChange={e=>setRegForm({...regForm,confirm:e.target.value})} placeholder="Confirmar contraseña *" type="password" autoComplete="new-password" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{regErrors.confirm && <p className="text-[#FF5252] text-[12px] mt-1.5">{regErrors.confirm}</p>}</div>
                </div>
                <label className="flex items-start gap-2.5 mt-4 cursor-pointer"><input type="checkbox" checked={regForm.terms} onChange={e=>setRegForm({...regForm,terms:e.target.checked})} className="mt-0.5 w-[18px] h-[18px] accent-[#FF1E3C] shrink-0"/><span className="text-[13px] text-[#D9D9D9] leading-relaxed">Acepto los términos</span></label>
                {regErrors.terms && <p className="text-[#FF5252] text-[12px] mt-1.5">{regErrors.terms}</p>}
                {authGeneralError && <p className="text-[#FF5252] text-[13px] mt-3 leading-relaxed">{authGeneralError}</p>}
                <button disabled={authSaving} className="pago-submit w-full mt-4 bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] disabled:opacity-60 h-[50px] rounded-[12px] font-bold text-[15px] text-white shadow-[0_12px_28px_rgba(255,30,60,0.32)] flex items-center justify-center">{authSaving?'Creando cuenta…':'Crear cuenta'}</button>
                <p className="text-center text-[13px] text-[#A0A0A0] mt-4">¿Ya tienes cuenta? <button type="button" onClick={()=>{setAuthGeneralError('');setLoginErrors({});setAuthModal('login');}} className="text-white font-semibold underline underline-offset-2">Iniciar sesión</button></p>
              </form>
            ) : (
              <form onSubmit={submitLogin} className="mt-5" noValidate>
                <div className="space-y-3">
                  <div><input value={loginForm.identificador} onChange={e=>setLoginForm({...loginForm,identificador:e.target.value})} placeholder="Correo o teléfono" autoComplete="username" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{loginErrors.identificador && <p className="text-[#FF5252] text-[12px] mt-1.5">{loginErrors.identificador}</p>}</div>
                  <div><input value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} placeholder="Contraseña" type="password" autoComplete="current-password" className="pago-input bg-[#242428] border border-[#33333A] rounded-[12px] px-4 py-[14px] text-[14px] w-full placeholder:text-[#6B6B73] text-white"/>{loginErrors.password && <p className="text-[#FF5252] text-[12px] mt-1.5">{loginErrors.password}</p>}</div>
                </div>
                {authGeneralError && <p className="text-[#FF5252] text-[13px] mt-3 leading-relaxed">{authGeneralError}</p>}
                <button disabled={authSaving} className="pago-submit w-full mt-4 bg-gradient-to-b from-[#FF1E3C] to-[#E11D2E] disabled:opacity-60 h-[50px] rounded-[12px] font-bold text-[15px] text-white shadow-[0_12px_28px_rgba(255,30,60,0.32)] flex items-center justify-center">{authSaving?'Entrando…':'Entrar'}</button>
                <p className="text-center text-[13px] text-[#A0A0A0] mt-4">¿No tienes cuenta? <button type="button" onClick={()=>{setAuthGeneralError('');setRegErrors({});setAuthModal('register');}} className="text-white font-semibold underline underline-offset-2">Regístrate</button></p>
              </form>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-[#2A2A2A] mt-8"><div className="max-w-[1440px] mx-auto px-5 py-5"><p style={{color:'#A1A1AA',fontSize:12,textAlign:'center',margin:0}}>🔒 Asegúrate de estar visitando la página oficial</p><div className="flex flex-wrap gap-3 justify-between items-center text-[12px] text-[#A0A0A0] mt-4"><span className="flex items-center gap-2 min-w-0"><img src={zplayLogo} alt="ZPLAY GAME STUDIO" className="block h-[28px] w-auto object-contain shrink-0" /><span>ZPLAY GAME STUDIO • Venezuela — Tarjetas regalo, eSIMs y recargas</span></span><span>Pago Móvil • Entrega inmediata</span></div></div></footer>
    </div>
  );
}

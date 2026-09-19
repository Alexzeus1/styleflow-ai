'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Onboarding(){const router=useRouter(); const [name,setName]=useState('');const [phone,setPhone]=useState('');const [city,setCity]=useState('');const [busy,setBusy]=useState(false);const [error,setError]=useState('')
 useEffect(()=>{if(!supabase){return} supabase.auth.getUser().then(({data})=>{if(!data.user) router.replace('/login')})},[router])
 async function save(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');if(!supabase){setError('Supabase is not configured.');setBusy(false);return};const {data:{user}}=await supabase.auth.getUser();if(!user){router.replace('/login');return}
 const slug=name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-'+Math.random().toString(36).slice(2,7)
 const {data:salon,error:salonError}=await supabase.from('salons').insert({owner_id:user.id,business_name:name,slug,phone,city}).select().single();if(salonError){setError(salonError.message);setBusy(false);return}
 const {error:memberError}=await supabase.from('salon_members').insert({salon_id:salon.id,user_id:user.id,role:'owner'});if(memberError){setError(memberError.message);setBusy(false);return}
 await supabase.from('subscriptions').insert({salon_id:salon.id,plan:'free',status:'active'});router.push('/dashboard');router.refresh()}
 return <main className="auth-page"><div className="auth-card"><div className="brand auth-brand">StyleFlow <span>AI</span></div><div className="eyebrow">Step 1 of 1</div><h1 className="title">Set up your business</h1><p className="muted">This creates your workspace and prepares your booking system.</p><form className="form" onSubmit={save}><label className="small">Business name<input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Braids by Debbie" required/></label><label className="small">Business phone<input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="080..."/></label><label className="small">City<input className="input" value={city} onChange={e=>setCity(e.target.value)} placeholder="Lagos"/></label>{error&&<div className="ai-box"><p className="small">{error}</p></div>}<button className="btn btn-primary" disabled={busy}>{busy?'Creating workspace…':'Launch my workspace'}</button></form></div></main>}

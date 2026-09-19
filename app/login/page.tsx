'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login(){
  const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [mode,setMode]=useState<'login'|'signup'>('login'); const [busy,setBusy]=useState(false); const [error,setError]=useState('')
  async function submit(e:React.FormEvent){e.preventDefault();setError('');setBusy(true)
    if(!supabase){setError('Supabase is not configured yet. Add the environment variables in Vercel.');setBusy(false);return}
    const result=mode==='login'?await supabase.auth.signInWithPassword({email,password}):await supabase.auth.signUp({email,password})
    if(result.error){setError(result.error.message);setBusy(false);return}
    if(mode==='signup' && !result.data.session){setError('Account created. Check your email to confirm the account, then sign in.');setBusy(false);return}
    router.push('/onboarding'); router.refresh()
  }
  return <main className="auth-page"><div className="auth-card"><div className="brand auth-brand">StyleFlow <span>AI</span></div><div className="eyebrow">Beauty business operating system</div><h1 className="title">{mode==='login'?'Welcome back':'Create your account'}</h1><p className="muted">{mode==='login'?'Sign in to manage your salon.':'Start your StyleFlow workspace.'}</p><form className="form" onSubmit={submit}><label className="small">Email<input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label className="small">Password<input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required/></label>{error&&<div className="ai-box"><p className="small">{error}</p></div>}<button className="btn btn-primary" disabled={busy}>{busy?'Please wait…':mode==='login'?'Sign in':'Create account'}</button></form><button className="link-btn" onClick={()=>{setMode(mode==='login'?'signup':'login');setError('')}}>{mode==='login'?'Create a new account':'Already have an account? Sign in'}</button></div></main>
}

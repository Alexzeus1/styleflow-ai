'use client';
import Link from 'next/link';
import {LayoutDashboard,CalendarDays,Users,Scissors,CreditCard,Sparkles,MessageSquare,Settings} from 'lucide-react';
const items=[['Dashboard','/dashboard',LayoutDashboard],['Appointments','/appointments',CalendarDays],['Customers','/customers',Users],['Services','/services',Scissors],['Payments','/payments',CreditCard],['Marketing','/marketing',MessageSquare],['AI Assistant','/ai-assistant',Sparkles],['Settings','/settings',Settings]] as const;
export function Sidebar(){return <aside className="sidebar"><div className="brand">StyleFlow <span>AI</span></div><div className="nav-section">Workspace</div><nav className="nav">{items.map(([name,href,Icon])=><Link key={href} href={href}><Icon size={16} style={{verticalAlign:'-3px',marginRight:10}}/>{name}</Link>)}</nav><div style={{marginTop:'auto',padding:'25px 12px',fontSize:11,color:'#777'}}>AI business manager<br/>for beauty professionals</div></aside>}

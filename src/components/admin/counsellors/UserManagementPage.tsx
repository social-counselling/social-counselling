"use client";
import { useState } from "react";
import Link from "next/link";
import { useDashboardAuth } from "@/components/dashboard/SharedDashboardShell";
import { hasPermission } from "@/lib/auth/permissions";
import { UsersRound, Clock3, UserRound } from "lucide-react";
import CounsellorsPage from "./CounsellorsPage";
import ClientsManagement from "./ClientsManagement";
import CounsellorAvailabilityManagement from "@/components/admin/slots/CounsellorAvailabilityManagement";

type Tab = "counsellors" | "availability" | "clients";
const tabs: {id:Tab;label:string;icon:typeof UsersRound}[] = [
 {id:"counsellors",label:"Counsellors",icon:UsersRound},
 {id:"availability",label:"Counsellor Availability",icon:Clock3},
 {id:"clients",label:"Clients",icon:UserRound},
];
export default function UserManagementPage() {
 const [tab,setTab]=useState<Tab>("counsellors");
 const { user } = useDashboardAuth();
 const canCreate = hasPermission(user, "admin.counsellors.create");
 return <div className="min-h-screen p-4 sm:p-6 lg:p-8">
  <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
   <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#147d7e]">People & access</p><h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">User Management</h1><p className="mt-1 text-sm text-slate-500">Manage counsellors, their availability and client accounts.</p></div>
   <div className="flex flex-wrap items-center gap-2">
    <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">{tabs.map(({id,label,icon:Icon})=><button key={id} onClick={()=>setTab(id)} className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${tab===id?"bg-[#103f3d] text-white shadow-sm":"text-slate-600 hover:bg-slate-100"}`}><Icon className="h-4 w-4"/>{label}</button>)}</div>
    {tab==="counsellors" && canCreate && <Link href="/admin/counsellors/new" className="inline-flex h-11 items-center rounded-xl bg-[#147d7e] px-4 text-sm font-semibold text-white hover:bg-[#103f3d]">+ Add Counsellor</Link>}
   </div>
  </div>
  {tab==="counsellors" && <CounsellorsPage showHeader={false}/>}
  {tab==="availability" && <CounsellorAvailabilityManagement/>}
  {tab==="clients" && <ClientsManagement/>}
 </div>;
}

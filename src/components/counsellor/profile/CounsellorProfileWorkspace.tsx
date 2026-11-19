"use client";
import { useState } from "react";
import { CalendarClock, UserRound, Eye } from "lucide-react";
import CounsellorProfile from "./CounsellorProfile";
import SingleDateAvailability from "@/components/counsellor/availability/SingleDateAvailability";
import UpcomingAvailability from "@/components/counsellor/availability/UpcomingAvailability";
import { useDashboardAuth } from "@/components/dashboard/SharedDashboardShell";
import { hasPermission } from "@/lib/auth/permissions";
type Tab = "profile" | "manage" | "view";
export default function CounsellorProfileWorkspace() {
 const [tab,setTab]=useState<Tab>("profile");
 const [manageOpen,setManageOpen]=useState(false);
 const [viewOpen,setViewOpen]=useState(false);
 const {user}=useDashboardAuth();
 const canManage=hasPermission(user,"counsellor.availability");
 const select=(next:Tab)=>{setTab(next);if(next==="manage"&&canManage)setManageOpen(true);if(next==="view")setViewOpen(true);};
 return <div>
  <div className="sticky top-[70px] z-20 flex flex-wrap gap-2 border-b border-slate-200 bg-[#f5f8f5] px-4 py-3 sm:px-6 lg:top-0 lg:px-8">
   <button onClick={()=>select("profile")} className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${tab==="profile"?"bg-[#103f3d] text-white":"border border-slate-200 bg-white text-slate-600"}`}><UserRound className="h-4 w-4"/>My Profile</button>
   {canManage&&<button onClick={()=>select("manage")} className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${tab==="manage"?"bg-[#103f3d] text-white":"border border-slate-200 bg-white text-slate-600"}`}><CalendarClock className="h-4 w-4"/>Manage Availability</button>}
   <button onClick={()=>select("view")} className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${tab==="view"?"bg-[#103f3d] text-white":"border border-slate-200 bg-white text-slate-600"}`}><Eye className="h-4 w-4"/>View Availability</button>
  </div>
  {tab==="profile"&&<CounsellorProfile/>}
  {manageOpen&&<SingleDateAvailability onClose={()=>{setManageOpen(false);setTab("profile");}}/>}
  {viewOpen&&<UpcomingAvailability onClose={()=>{setViewOpen(false);setTab("profile");}}/>}
 </div>;
}

"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Plus, Users } from "lucide-react";

const actions = [
  {
    title: "Add Counsellor",
    description: "Create a new counsellor profile",
    href: "/admin/counsellors/new",
    icon: Users,
  },
  {
    title: "Manage Counsellors",
    description: "View and manage counsellors",
    href: "/admin/counsellors",
    icon: Users,
  },
  {
    title: "Add Service",
    description: "Create a new counselling service",
    href: "/admin/services/new",
    icon: BriefcaseBusiness,
  },
  {
    title: "Manage Services",
    description: "View and manage existing services",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
];

export default function QuickActions() {
  return (
    <section className="mt-6">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-[#183b3b]">
          Quick Actions
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Quickly access common admin tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c8dfdb] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f3f0] text-[#2d716b]">
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#2d716b]" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#183b3b]">
                {action.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

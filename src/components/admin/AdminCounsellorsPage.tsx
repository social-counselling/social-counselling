"use client";

import Image from "next/image";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CircleHelp,
  Eye,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";

type Counsellor = {
  id: number;
  name: string;
  age?: string;
  image: string;
  credentials: string[];
  specializations: string[];
  languages: string[];
  coverage: string;
  status: "Active" | "Inactive";
  availability: "Available Today" | "Not Available";
};

const counsellors: Counsellor[] = [
  {
    id: 1,
    name: "Vikram Srivastava",
    age: "49 yrs",
    image: "/images/counsellors/vikram-srivastava.png",
    credentials: [
      "Ex Army Officer",
      "Corporate Leader",
      "Social Advisor",
    ],
    specializations: [
      "Youth Counselling",
      "Marriage Counselling",
      "Corporate Counselling",
    ],
    languages: ["English", "Hindi"],
    coverage: "Pan India (ESP Northern & Central India)",
    status: "Active",
    availability: "Available Today",
  },

  {
    id: 2,
    name: "Dr. Hemali Jariwala",
    image: "/images/counsellors/dr-hemali-jariwala.png",
    credentials: [
      "Homeopathy Consultant",
      "Palliative Care Associate",
      "Spiritual Healer",
    ],
    specializations: [
      "Women's Post-Pregnancy",
      "Lifestyle Disorders",
      "Student Counselling",
    ],
    languages: ["English", "Hindi", "Gujrati"],
    coverage: "Pan India (ESP Mumbai & Gujrat)",
    status: "Active",
    availability: "Available Today",
  },

  {
    id: 3,
    name: "Kiranmai Patwari",
    age: "42 yrs",
    image: "/images/counsellors/kiranmai-patwari.png",
    credentials: [
      "Corporate Professional",
      "Trained Counsellor",
    ],
    specializations: [
      "Family Counselling",
      "Marriage Counselling",
      "Postpartum Counselling",
    ],
    languages: ["English", "Hindi", "Telugu", "Kannada"],
    coverage: "Pan India",
    status: "Active",
    availability: "Not Available",
  },
];

const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    label: "Counsellors",
    icon: Users,
    active: true,
  },
  {
    label: "Services",
    icon: ClipboardList,
  },
  {
    label: "Clients",
    icon: Users,
  },
  {
    label: "Enquiries",
    icon: CircleHelp,
  },
  {
    label: "Payments",
    icon: WalletCards,
  },
  {
    label: "Reviews",
    icon: ShieldCheck,
  },
  {
    label: "Content",
    icon: FileText,
  },
  {
    label: "Reports",
    icon: ClipboardList,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminCounsellorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [specialization, setSpecialization] =
    useState("All Specializations");

  const [language, setLanguage] =
    useState("All Languages");

  const [status, setStatus] =
    useState("All Status");

  const filteredCounsellors = counsellors.filter(
    (counsellor) => {
      const searchableText = [
        counsellor.name,
        ...counsellor.credentials,
        ...counsellor.specializations,
        ...counsellor.languages,
        counsellor.coverage,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchableText.includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "All Specializations" ||
        counsellor.specializations.some((item) =>
          item
            .toLowerCase()
            .includes(specialization.toLowerCase()),
        );

      const matchesLanguage =
        language === "All Languages" ||
        counsellor.languages.includes(language);

      const matchesStatus =
        status === "All Status" ||
        counsellor.status === status;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesLanguage &&
        matchesStatus
      );
    },
  );

  const resetFilters = () => {
    setSearch("");
    setSpecialization("All Specializations");
    setLanguage("All Languages");
    setStatus("All Status");
  };

  return (
    <div className="min-h-screen bg-[#f8fbf7] text-[#123b69]">

      {/* =====================================================
          MOBILE SIDEBAR BACKDROP
          ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-[#123b69]/25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[258px]
          flex-col
          border-r
          border-[#e4eee7]
          bg-white
          transition-transform
          duration-300

          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Logo */}

        <div className="flex h-[76px] items-center border-b border-[#edf2ee] px-7">

          <Image
            src="/images/logo/logo2.png"
            alt="Social Counselling"
            width={180}
            height={70}
            priority
            className="h-auto w-[170px]"
          />

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-500 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-1 px-3 py-5">

          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium
                  transition

                  ${
                    item.active
                      ? "bg-[#e6f4eb] text-[#087c59]"
                      : "text-[#173d64] hover:bg-[#f2f8f3]"
                  }
                `}
              >
                <Icon className="h-[19px] w-[19px]" />

                <span>{item.label}</span>
              </button>
            );
          })}

        </nav>

        {/* Sidebar bottom message */}

        <div className="px-5 pb-6">

          <div className="rounded-2xl bg-[#f0f7ed] px-4 py-5">

            <p className="font-serif text-xl font-semibold leading-tight text-[#123b69]">
              Better Conversations.
            </p>

            <p className="mt-1 text-sm text-[#168f91]">
              Brighter Tomorrows.
            </p>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
          ===================================================== */}

      <div className="lg:pl-[258px]">

        {/* ===================================================
            TOP BAR
            =================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            flex
            h-[76px]
            items-center
            gap-4
            border-b
            border-[#e7efea]
            bg-white/95
            px-4
            shadow-[0_3px_20px_rgba(24,59,59,0.04)]
            backdrop-blur

            sm:px-6
            lg:px-8
          "
        >

          {/* Mobile menu */}

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="
              rounded-xl
              border
              border-[#e1ebe4]
              p-2.5
              text-[#123b69]
              lg:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}

          <div className="relative hidden max-w-[450px] flex-1 md:block">

            <Search
              className="
                absolute
                left-4
                top-1/2
                h-4.5
                w-4.5
                -translate-y-1/2
                text-[#123b69]/60
              "
            />

            <input
              placeholder="Search anything..."
              className="
                h-11
                w-full
                rounded-xl
                border-0
                bg-[#f3f7f5]
                pl-11
                pr-4
                text-sm
                text-[#123b69]
                outline-none
                ring-1
                ring-transparent
                transition

                focus:bg-white
                focus:ring-[#168f91]/25
              "
            />

          </div>

          {/* Right */}

          <div className="ml-auto flex items-center gap-4">

            <button
              type="button"
              className="relative rounded-xl p-2 text-[#123b69] hover:bg-[#f2f7f4]"
            >
              <Bell className="h-5 w-5" />

              <span
                className="
                  absolute
                  right-1
                  top-0
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                3
              </span>
            </button>

            <div className="hidden h-9 w-px bg-[#dce7df] sm:block" />

            <button
              type="button"
              className="flex items-center gap-3"
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e6f3e5]
                  text-sm
                  font-bold
                  text-[#087c59]
                "
              >
                A
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold text-[#123b69]">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Super Admin
                </p>

              </div>

              <ChevronDown className="hidden h-4 w-4 sm:block" />

            </button>

          </div>

        </header>

        {/* ===================================================
            CONTENT
            =================================================== */}

        <main className="px-4 py-7 sm:px-6 lg:px-8">

          {/* =================================================
              PAGE HEADER
              ================================================= */}

          <div
            className="
              flex
              flex-col
              justify-between
              gap-4

              sm:flex-row
              sm:items-end
            "
          >

            <div>

              <h1
                className="
                  font-serif
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-[#123b69]
                "
              >
                Counsellors
              </h1>

              <p className="mt-1 text-sm text-[#294766]">
                Manage counsellor profiles, availability, and status
              </p>

            </div>

            <button
              type="button"
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#087c59]
                px-5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#066b4d]
              "
            >
              <span className="text-xl leading-none">
                +
              </span>

              Add Counsellor
            </button>

          </div>

          {/* =================================================
              STATISTICS
              ================================================= */}

          <div
            className="
              mt-7
              grid
              gap-4

              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            <StatCard
              title="Total Counsellors"
              value="3"
              note="+1 this month"
              icon={<Users className="h-6 w-6" />}
              tone="green"
            />

            <StatCard
              title="Active Counsellors"
              value="3"
              note="100% active"
              icon={<ShieldCheck className="h-6 w-6" />}
              tone="blue"
            />

            <StatCard
              title="Pending Approval"
              value="0"
              note="No pending requests"
              icon={<CalendarDays className="h-6 w-6" />}
              tone="yellow"
            />

            <StatCard
              title="Available Today"
              value="2"
              note="Out of 3 counsellors"
              icon={<CalendarDays className="h-6 w-6" />}
              tone="purple"
            />

          </div>

          {/* =================================================
              FILTERS
              ================================================= */}

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-[#e4eee7]
              bg-white
              p-3
              shadow-[0_5px_20px_rgba(24,59,59,0.04)]
            "
          >

            <div
              className="
                grid
                gap-3

                md:grid-cols-2

                xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto_auto]
              "
            >

              {/* Search */}

              <div className="relative">

                <Search
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    h-4.5
                    w-4.5
                    -translate-y-1/2
                    text-[#123b69]/55
                  "
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by name, specialization or keyword..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[#dce8df]
                    pl-10
                    pr-3
                    text-sm
                    outline-none
                    transition

                    focus:border-[#168f91]
                  "
                />

              </div>

              {/* Specialization */}

              <FilterSelect
                value={specialization}
                onChange={setSpecialization}
                options={[
                  "All Specializations",
                  "Youth Counselling",
                  "Marriage Counselling",
                  "Corporate Counselling",
                  "Family Counselling",
                  "Postpartum Counselling",
                ]}
              />

              {/* Language */}

              <FilterSelect
                value={language}
                onChange={setLanguage}
                options={[
                  "All Languages",
                  "English",
                  "Hindi",
                  "Gujrati",
                  "Telugu",
                  "Kannada",
                ]}
              />

              {/* Status */}

              <FilterSelect
                value={status}
                onChange={setStatus}
                options={[
                  "All Status",
                  "Active",
                  "Inactive",
                ]}
              />

              {/* Filter */}

              <button
                type="button"
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#087c59]
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#066b4d]
                "
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>

              {/* Reset */}

              <button
                type="button"
                onClick={resetFilters}
                className="
                  h-11
                  px-2
                  text-sm
                  font-medium
                  text-[#168f91]
                "
              >
                Reset
              </button>

            </div>

          </div>

          {/* =================================================
              COUNSELLOR TABLE
              ================================================= */}

          <div
            className="
              mt-6
              overflow-hidden
              rounded-2xl
              border
              border-[#e2ece5]
              bg-white
              shadow-[0_7px_25px_rgba(24,59,59,0.05)]
            "
          >

            {/* Desktop */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full min-w-[1180px] border-collapse text-left">

                <thead>

                  <tr
                    className="
                      bg-[#edf6f0]
                      text-xs
                      font-semibold
                      text-[#123b69]
                    "
                  >

                    <th className="w-12 px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded accent-[#087c59]"
                      />
                    </th>

                    <th className="px-4 py-4">
                      Counsellor
                    </th>

                    <th className="px-4 py-4">
                      Credentials
                    </th>

                    <th className="px-4 py-4">
                      Specializations
                    </th>

                    <th className="px-4 py-4">
                      Languages
                    </th>

                    <th className="px-4 py-4">
                      Coverage
                    </th>

                    <th className="px-4 py-4">
                      Status
                    </th>

                    <th className="px-4 py-4">
                      Availability
                    </th>

                    <th className="px-4 py-4">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-[#edf1ee]">

                  {filteredCounsellors.map(
                    (counsellor) => (
                      <CounsellorRow
                        key={counsellor.id}
                        counsellor={counsellor}
                      />
                    ),
                  )}

                </tbody>

              </table>

            </div>

            {/* Mobile / Tablet */}

            <div className="divide-y divide-[#edf1ee] lg:hidden">

              {filteredCounsellors.map(
                (counsellor) => (
                  <CounsellorMobileCard
                    key={counsellor.id}
                    counsellor={counsellor}
                  />
                ),
              )}

            </div>

            {/* Empty */}

            {filteredCounsellors.length === 0 && (
              <div className="px-6 py-14 text-center">

                <Users className="mx-auto h-10 w-10 text-[#168f91]/40" />

                <p className="mt-3 font-semibold text-[#123b69]">
                  No counsellors found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

          {/* =================================================
              PAGINATION
              ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-4
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p className="text-sm text-[#294766]">

              Showing{" "}

              <span className="font-semibold">
                {filteredCounsellors.length}
              </span>

              {" "}of{" "}

              <span className="font-semibold">
                {counsellors.length}
              </span>

              {" "}counsellors

            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe9e2] bg-white text-[#123b69] hover:bg-[#f1f7f2]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087c59] text-sm font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe9e2] bg-white text-[#123b69] hover:bg-[#f1f7f2]"
              >
                2
              </button>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe9e2] bg-white text-[#123b69] hover:bg-[#f1f7f2]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  title,
  value,
  note,
  icon,
  tone,
}: {
  title: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  tone: "green" | "blue" | "yellow" | "purple";
}) {
  const styles = {
    green: "bg-[#eff9f2] text-[#087c59]",
    blue: "bg-[#eef7ff] text-[#1263a0]",
    yellow: "bg-[#fff8e9] text-[#a46d00]",
    purple: "bg-[#f5f0ff] text-[#7050bb]",
  };

  return (
    <div
      className={`
        rounded-2xl
        p-5
        ${styles[tone]}
      `}
    >

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/75
          "
        >
          {icon}
        </div>

        <div>

          <p className="text-xs font-medium opacity-80">
            {title}
          </p>

          <p className="mt-0.5 text-3xl font-semibold">
            {value}
          </p>

          <p className="mt-0.5 text-xs opacity-75">
            {note}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   FILTER SELECT
   ========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-11
          w-full
          appearance-none
          rounded-xl
          border
          border-[#dce8df]
          bg-white
          px-3
          pr-9
          text-sm
          text-[#123b69]
          outline-none

          focus:border-[#168f91]
        "
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

      <ChevronDown
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
        "
      />

    </div>
  );
}

/* =========================================================
   DESKTOP ROW
   ========================================================= */

function CounsellorRow({
  counsellor,
}: {
  counsellor: Counsellor;
}) {
  return (
    <tr className="align-middle hover:bg-[#fbfdfb]">

      <td className="px-4 py-5">

        <input
          type="checkbox"
          className="h-4 w-4 rounded accent-[#087c59]"
        />

      </td>

      {/* Counsellor */}

      <td className="px-4 py-5">

        <div className="flex min-w-[190px] items-center gap-3">

          <div
            className="
              relative
              h-16
              w-16
              shrink-0
              overflow-hidden
              rounded-xl
              bg-[#eaf4e6]
            "
          >

            <Image
              src={counsellor.image}
              alt={counsellor.name}
              fill
              sizes="64px"
              className="object-contain object-bottom"
            />

          </div>

          <div>

            <p className="font-semibold leading-5 text-[#0d4f87]">
              {counsellor.name}
            </p>

            {counsellor.age && (
              <p className="mt-1 text-xs text-slate-500">
                {counsellor.age}
              </p>
            )}

          </div>

        </div>

      </td>

      {/* Credentials */}

      <td className="max-w-[190px] px-4 py-5 text-sm leading-5 text-[#294766]">

        {counsellor.credentials.map(
          (credential) => (
            <div key={credential}>
              {credential}
            </div>
          ),
        )}

      </td>

      {/* Specialization */}

      <td className="max-w-[220px] px-4 py-5">

        <div className="flex flex-wrap gap-1.5">

          {counsellor.specializations.map(
            (item) => (
              <span
                key={item}
                className="
                  rounded-full
                  bg-[#f0f5f2]
                  px-2.5
                  py-1
                  text-[11px]
                  leading-4
                  text-[#294766]
                "
              >
                {item}
              </span>
            ),
          )}

        </div>

      </td>

      {/* Languages */}

      <td className="px-4 py-5">

        <div className="flex flex-wrap gap-1.5">

          {counsellor.languages.map(
            (item) => (
              <span
                key={item}
                className="
                  rounded-full
                  bg-[#f0f5f2]
                  px-2.5
                  py-1
                  text-[11px]
                  text-[#294766]
                "
              >
                {item}
              </span>
            ),
          )}

        </div>

      </td>

      {/* Coverage */}

      <td className="max-w-[170px] px-4 py-5 text-sm leading-5 text-[#294766]">
        {counsellor.coverage}
      </td>

      {/* Status */}

      <td className="px-4 py-5">

        <StatusBadge active={counsellor.status === "Active"}>
          {counsellor.status}
        </StatusBadge>

      </td>

      {/* Availability */}

      <td className="px-4 py-5">

        <StatusBadge
          active={
            counsellor.availability ===
            "Available Today"
          }
        >
          {counsellor.availability}
        </StatusBadge>

      </td>

      {/* Actions */}

      <td className="px-4 py-5">

        <ActionButtons />

      </td>

    </tr>
  );
}

/* =========================================================
   MOBILE CARD
   ========================================================= */

function CounsellorMobileCard({
  counsellor,
}: {
  counsellor: Counsellor;
}) {
  return (
    <article className="p-5">

      <div className="flex gap-4">

        <div
          className="
            relative
            h-20
            w-20
            shrink-0
            overflow-hidden
            rounded-2xl
            bg-[#eaf4e6]
          "
        >

          <Image
            src={counsellor.image}
            alt={counsellor.name}
            fill
            sizes="80px"
            className="object-contain object-bottom"
          />

        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div>

              <h2 className="font-semibold text-[#0d4f87]">
                {counsellor.name}
              </h2>

              {counsellor.age && (
                <p className="mt-1 text-xs text-slate-500">
                  {counsellor.age}
                </p>
              )}

            </div>

            <StatusBadge
              active={
                counsellor.status === "Active"
              }
            >
              {counsellor.status}
            </StatusBadge>

          </div>

          <p className="mt-2 text-sm leading-5 text-[#2f7d48]">
            {counsellor.credentials.join(" / ")}
          </p>

        </div>

      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">

        <InfoBlock title="Specializations">

          <div className="flex flex-wrap gap-1.5">

            {counsellor.specializations.map(
              (item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    bg-[#f0f5f2]
                    px-2.5
                    py-1
                    text-xs
                    text-[#294766]
                  "
                >
                  {item}
                </span>
              ),
            )}

          </div>

        </InfoBlock>

        <InfoBlock title="Languages">
          <p>
            {counsellor.languages.join(" / ")}
          </p>
        </InfoBlock>

        <InfoBlock title="Coverage">
          <p>{counsellor.coverage}</p>
        </InfoBlock>

        <InfoBlock title="Availability">

          <StatusBadge
            active={
              counsellor.availability ===
              "Available Today"
            }
          >
            {counsellor.availability}
          </StatusBadge>

        </InfoBlock>

      </div>

      <div className="mt-5">

        <ActionButtons />

      </div>

    </article>
  );
}

/* =========================================================
   INFO BLOCK
   ========================================================= */

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <p
        className="
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {title}
      </p>

      <div className="mt-1.5 text-sm leading-5 text-[#294766]">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   STATUS BADGE
   ========================================================= */

function StatusBadge({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        px-3
        py-2
        text-xs
        font-semibold

        ${
          active
            ? "bg-[#eaf8ef] text-[#087c59]"
            : "bg-[#f0f3f5] text-[#516579]"
        }
      `}
    >

      <span
        className={`
          h-2
          w-2
          rounded-full

          ${
            active
              ? "bg-[#1a9a6a]"
              : "bg-[#60758a]"
          }
        `}
      />

      {children}

    </span>
  );
}

/* =========================================================
   ACTION BUTTONS
   ========================================================= */

function ActionButtons() {
  return (
    <div className="flex items-center gap-1.5">

      <button
        type="button"
        title="View"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#dce8df]
          bg-white
          text-[#123b69]
          hover:bg-[#f1f7f2]
        "
      >
        <Eye className="h-4 w-4" />
      </button>

      <button
        type="button"
        title="Edit"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#dce8df]
          bg-white
          text-[#123b69]
          hover:bg-[#f1f7f2]
        "
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        title="Availability"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#dce8df]
          bg-white
          text-[#123b69]
          hover:bg-[#f1f7f2]
        "
      >
        <CalendarDays className="h-4 w-4" />
      </button>

      <button
        type="button"
        title="More"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#dce8df]
          bg-white
          text-[#123b69]
          hover:bg-[#f1f7f2]
        "
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

    </div>
  );
}
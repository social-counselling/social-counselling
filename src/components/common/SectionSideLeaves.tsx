export default function SectionSideLeaves() {
  return (
    <>
      {/* LEFT SIDE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          h-full
          w-[55px]
          overflow-hidden
          opacity-45

          sm:w-[65px]
          sm:opacity-50

          md:w-[75px]

          lg:w-[85px]

          xl:w-[95px]
        "
      >
        <div
          className="
            h-full
            w-full
            bg-[url('/images/contact/section-leaf-leftFull2.png')]
            bg-left-top
            bg-[length:100%_auto]
            bg-repeat-y
          "
        />
      </div>

      {/* RIGHT SIDE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          h-full
          w-[55px]
          overflow-hidden
          opacity-45

          sm:w-[65px]
          sm:opacity-50

          md:w-[75px]

          lg:w-[85px]

          xl:w-[95px]
        "
      >
        <div
          className="
            h-full
            w-full
            bg-[url('/images/contact/section-leaf-rightFull2.png')]
            bg-right-top
            bg-[length:100%_auto]
            bg-repeat-y
          "
        />
      </div>
    </>
  );
}
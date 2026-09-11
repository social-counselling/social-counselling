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
         w-[30px]
          overflow-hidden
          opacity-30

          sm:w-[40px]
          sm:opacity-50

          md:w-[50px]

          lg:w-[60px]

          xl:w-[70px]
        "
      >
        <div
          className="
            h-full
            w-full
            bg-[url('/images/contact/newmainSideLeaf.png')]
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
          w-[30px]
          overflow-hidden
          opacity-30

          sm:w-[40px]
          sm:opacity-50

          md:w-[50px]

          lg:w-[60px]

          xl:w-[70px]
        "
      >
        <div
          className="
            h-full
            w-full
            bg-[url('/images/contact/newmainSideLeaf.png')]
            bg-right-top
            bg-[length:100%_auto]
            bg-repeat-y
          "
        />
      </div>
    </>
  );
}
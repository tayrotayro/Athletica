import Link from 'next/link'

const Helment = () => {

  // red #a0040e

  return (
    <Link href='/cart' className="m-auto m-width-full  bg-[var(--red-1)] text-white h-10 flex flex-column items-center justify-center">
      50% off sale on select items only! Click here to see more!
    </Link>
  );
}

export default Helment;
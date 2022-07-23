import Image from 'next/image'
import Link from 'next/link'
import { RiFacebookFill, RiInstagramLine, RiLinkedinFill } from 'react-icons/ri'

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-between gap-12 bg-white-rock px-6 pb-16 pt-9 md:gap-20 xl:px-32">
      <div className="flex min-w-max flex-1 flex-col items-start gap-8 md:flex-row md:gap-16">
        <Image
          width={140}
          height={80}
          src="/images/full-logo.svg"
          alt="Logo d'Atabulapp"
        />
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-base font-medium text-scarlet">
            Recevoir la newsletter
          </h3>
          <form className="flex w-full max-w-xs md:w-2/3">
            <input
              placeholder="Email"
              type="text"
              className="flex-1 rounded-l-[4px] border-[1px] border-r-0 border-solid border-scarlet/30 bg-[transparent] py-2 px-3 outline-none transition-colors duration-200 placeholder:text-scarlet/30 focus:border-scarlet"
            />
            <button className="rounded-r-[4px] border-[1px] border-l-0 border-solid border-scarlet/30 px-3 py-2 text-scarlet transition-colors duration-200 label-focus:border-scarlet">
              OK
            </button>
          </form>
        </div>
      </div>
      <nav className="flex flex-wrap gap-10 font-medium text-black-rose md:gap-20">
        <ul className="flex flex-col gap-2">
          <li>
            <h3 className="font-bold">A propos</h3>
          </li>
          <li>
            <Link href="/cgv">CGV</Link>
          </li>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li>
            <h3 className="font-bold">Contact</h3>
          </li>
          <li>
            <Link href="/partenariat">Partenariat</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li>
            <h3 className="font-bold">Communauté</h3>
          </li>
          <li>
            <Link href="/atabula">Atabula</Link>
          </li>
          <li className="flex items-center gap-4 text-black">
            <Link href="https://facebook.com">
              <RiFacebookFill size={20} />
            </Link>
            <Link href="https://linkedin.com">
              <RiLinkedinFill size={20} />
            </Link>
            <Link href="https://instagram.com">
              <RiInstagramLine size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer

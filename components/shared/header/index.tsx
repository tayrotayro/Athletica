import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'
import Helment from './helment'

const Header = () => {
  return (
    <header className="header w-full border-b">
      <Helment />
      <div className="div wrapper flex-between">
        <div className="div flex-start">
          <Link href='/' className="flex-start">
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="span hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
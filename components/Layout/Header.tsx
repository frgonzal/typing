'use client';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import GitHubImg from '@/public/github-mark-white.svg';
import Link from 'next/link';


/**
 * Header component that renders the top navigation bar.
 * 
 * This component includes:
 * - A logo that reloads the page when clicked.
 * - A title "TYPING GAME".
 * - A link to the GitHub repository with a GitHub icon.
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
const Header = () => {
  return (
    <header className="w-full px-20 py-3 flex items-center justify-between">

      <div className="flex items-center justify-center gap-2 font-monofett text-4xl cursor-pointer">
        <Image src={Logo} alt="Logo" width={100} onClick={() => window.location.reload()}/>
        <div>TYPING GAME</div>
      </div>

      <div>
        <Link href="https://github.com/frgonzal/typing">
          <Image src={GitHubImg} alt="GitHub" width={30} height={30}/>
        </Link>
      </div>
    </header>
  );
}


export default Header;
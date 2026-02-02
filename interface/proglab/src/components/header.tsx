import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-6 bg-white shadow-lg border-b border-gray-200">
      {/* ЛОГОТИП */}
      <div className="flex items-center">
        <Link href="/" className="transition-transform hover:scale-105">
          <Image 
            src="/epstein.jpg" 
            alt="Logo" 
            width={100}   // 100 
            height={100} 
            className="rounded-full shadow-xl object-cover" 
          />
        </Link>
      </div>

      {/* КНОПКИ НАВИГАЦИИ */}
      <nav className="flex items-center gap-8">
        <Link 
          href="/" 
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-xl font-extrabold hover:bg-blue-700 hover:shadow-2xl transition-all active:scale-95"
        >
          Main
        </Link>
        
        <Link 
          href="/Lab3" 
          className="px-8 py-3 bg-blue-900 text-white text-lg rounded-xl font-extrabold hover:bg-black hover:shadow-2xl transition-all active:scale-95"
        >
          Lab 3
        </Link>

         <Link 
          href="/Login" 
          className="px-8 py-3 bg-blue-900 text-white text-lg rounded-xl font-extrabold hover:bg-black hover:shadow-2xl transition-all active:scale-95"
        >
          Login
        </Link>

         <Link 
          href="/Logout" 
          className="px-8 py-3 bg-blue-900 text-white text-lg rounded-xl font-extrabold hover:bg-black hover:shadow-2xl transition-all active:scale-95"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}
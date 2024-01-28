'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
          <Image
            src="https://res.cloudinary.com/dxpbkctix/image/upload/f_auto,q_auto/qkad0ovu8skxpcjv2oii"
            width={120}
            height={50}
            alt="logo"
          />
        </a>

        <a
          role="button"
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                className={`button bg-gray-600 ${
                  !currentPath.includes('new') ? 'is-hidden' : ''
                }`}
                onClick={() => router.push('/')}
              >
                <strong className="!text-[#fefefe]">Annuler</strong>
              </button>
              <button
                className={`button ${styles.new}`}
                disabled={currentPath.includes('new')}
                onClick={() => router.push('/new')}
              >
                <strong>Nouvel article</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

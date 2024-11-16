'use client';

import styles from './header.module.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NHCLogo } from '../svgs';
import { NavLinks } from './links';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles['header']}>
      <Link href="/">
        <NHCLogo className={styles['logo']} />
      </Link>
      {NavLinks.map((link) => {
        const isActive = pathname.startsWith(link.path);
        return (
          <Link
            key={link.path}
            href={link.path}
            className={isActive ? styles['active'] : styles['link']}
          >
            {link.title}
          </Link>
        );
      })}
    </header>
  );
}

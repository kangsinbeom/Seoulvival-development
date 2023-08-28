'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  category,
  children,
}: {
  category: {
    link: string | null;
    name: string;
  };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const link = category.link
    ? `/community?category=${category.link}`
    : '/community';

  const isActive = category.link
    ? `${category.link}` === pathname.split('/')[2]
    : pathname.split('/')[2] === 'All' || pathname === '/community';

  return (
    <Link
      href={link}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
      className={`relative w-1/4 flex items-center justify-center py-4`}
    >
      {children}
    </Link>
  );
}

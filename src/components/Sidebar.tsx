import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getManuals, getSections } from '@/lib/content';
import { getAllowedManuals } from '@/lib/roles';
import SidebarContent from './SidebarContent';

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const allowed = getAllowedManuals(role);

  const allManuals = await getManuals();
  const manuals = allManuals.filter((m) => allowed.includes(m.slug));

  // Build sections map for each accessible manual
  const sectionsByManual: Record<string, Awaited<ReturnType<typeof getSections>>> = {};
  for (const manual of manuals) {
    sectionsByManual[manual.slug] = await getSections(manual.slug);
  }

  return <SidebarContent manuals={manuals} sectionsByManual={sectionsByManual} role={role} />;
}

import { getManuals, getSections } from '@/lib/content';
import SidebarContent from './SidebarContent';

export default async function Sidebar() {
  const manuals = await getManuals();

  // Build sections map for each manual
  const sectionsByManual: Record<string, Awaited<ReturnType<typeof getSections>>> = {};
  for (const manual of manuals) {
    sectionsByManual[manual.slug] = await getSections(manual.slug);
  }

  return <SidebarContent manuals={manuals} sectionsByManual={sectionsByManual} />;
}

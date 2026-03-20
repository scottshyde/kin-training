export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is handled by middleware — no redundant check here
  return <>{children}</>;
}

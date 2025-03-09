import AccountSidebar from '@/components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          {/* <AccountSidebar /> */}
        </div>
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
} 
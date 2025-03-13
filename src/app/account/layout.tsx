// import AccountSidebar from '@/components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-8">
      <div className="">
        <div className="md:col-span-1">
          {/* <AccountSidebar /> */}
        </div>
        <div className="md:col-span-1">
          {children}
        </div>
      </div>
    </div>
  );
} 
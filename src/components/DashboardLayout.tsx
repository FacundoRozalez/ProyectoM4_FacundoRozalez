import { Navbar } from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div style={{ backgroundColor: '#ffffffff', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ padding: '20px', maxWidth: '850px', margin: '0 auto' }}>
      {children}
    </main>
  </div>
);
import { Home, Briefcase, Ticket, Users, CreditCard, DollarSign, Smartphone, FileText, Layout } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Briefcase, label: 'Projects' },
    { icon: Ticket, label: 'Tickets' },
    { icon: Users, label: 'Our Clients' },
    { icon: Users, label: 'Employees' },
    { icon: CreditCard, label: 'Accounts' },
    { icon: DollarSign, label: 'Payroll' },
    { icon: Smartphone, label: 'App' },
    { icon: FileText, label: 'Other Pages' },
    { icon: Layout, label: 'UI Components' },
  ];

  return (
    <div className="w-[240px] h-screen bg-[#5b5f97] text-white flex flex-col fixed left-0 top-0">
      <div className="flex items-center gap-3 p-6 pb-8">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Ticket className="w-6 h-6 text-[#5b5f97]" />
        </div>
        <span className="text-xl font-semibold">My-Task</span>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              item.active
                ? 'bg-[#4a4d7f] text-white'
                : 'text-gray-300 hover:bg-[#4a4d7f]/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 pb-6 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-[#4a4d7f]/50 rounded-lg">
          <div className="w-8 h-8 bg-white/20 rounded"></div>
          <span className="text-sm">Enable Dark Mode!</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-[#4a4d7f]/50 rounded-lg">
          <div className="w-8 h-8 bg-white/20 rounded"></div>
          <span className="text-sm">Enable RTL Mode!</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
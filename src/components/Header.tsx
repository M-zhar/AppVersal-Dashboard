import { Search, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.role);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5f97] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-700">+3</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400"></div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">Dylan Hunter</div>
              <div className="text-xs text-gray-500">Admin Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
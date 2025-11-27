import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setMembers, setTasks } from '../redux/slices/membersSlice';
import { switchRole, setUser } from '../redux/slices/roleSlice';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import EmployeesChart from '../components/EmployeesChart';
import StatusPieChart from '../components/Charts/StatusPieChart';
import UpcomingInterviews from '../components/UpcomingInterviews';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import StatusSelector from '../components/StatusSelector';
import TaskList from '../components/TaskList';
import { Users, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state: RootState) => state.role);
  const { members, tasks } = useSelector((state: RootState) => state.members);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: membersData, error: membersError } = await supabase
        .from('team_members')
        .select('*')
        .order('name');

      if (membersError) throw membersError;

      if (!membersData || membersData.length === 0) {
        await initializeData();
        return;
      }

      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (tasksError) throw tasksError;

      dispatch(setMembers(membersData || []));
      dispatch(setTasks(tasksData || []));

      if (membersData && membersData.length > 0) {
        const firstMember = membersData[0];
        dispatch(
          setUser({
            name: firstMember.name,
            id: firstMember.id,
          })
        );
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=5');
      const data = await response.json();

      const teamMembers = data.results.map((user: any, index: number) => ({
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.large,
        role: index === 0 ? 'lead' : 'member',
        status: ['Working', 'Break', 'Meeting', 'Offline'][Math.floor(Math.random() * 4)],
      }));

      const { data: insertedMembers, error } = await supabase
        .from('team_members')
        .insert(teamMembers)
        .select();

      if (error) throw error;

      dispatch(setMembers(insertedMembers || []));

      if (insertedMembers && insertedMembers.length > 0) {
        const firstMember = insertedMembers[0];
        dispatch(
          setUser({
            name: firstMember.name,
            id: firstMember.id,
          })
        );
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTaskCount = (memberId: string) => {
    return tasks.filter((task) => task.member_id === memberId && !task.completed).length;
  };

  const filteredMembers = members
    .filter((member) => filterStatus === 'all' || member.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'tasks') {
        return getTaskCount(b.id) - getTaskCount(a.id);
      }
      return a.name.localeCompare(b.name);
    });

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusSummary = `${statusCounts['Working'] || 0} Working • ${statusCounts['Break'] || 0} Break • ${statusCounts['Meeting'] || 0} Meeting`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 ml-[240px]">
        <Header />

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Welcome back to your workspace</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => dispatch(switchRole('lead'))}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentRole === 'lead'
                    ? 'bg-[#5b5f97] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Team Lead View
              </button>
              <button
                onClick={() => dispatch(switchRole('member'))}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentRole === 'member'
                    ? 'bg-[#5b5f97] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Team Member View
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-6">
            <StatsCard
              title="Total Applications"
              value="1546"
              icon={<Users className="w-6 h-6" />}
              bgColor="bg-gradient-to-br from-[#5b5f97] to-[#4a4d7f]"
            />
            <StatsCard
              title="Shortlisted"
              value="246"
              icon={<CheckCircle className="w-6 h-6" />}
              trend={12}
              bgColor="bg-gradient-to-br from-yellow-500 to-green-600"
            />
            <StatsCard
              title="On Hold"
              value="101"
              icon={<TrendingUp className="w-6 h-6" />}
              trend={-5}
              bgColor="bg-gradient-to-br from-emerald-400 to-emerald-600"
            />
            <StatsCard
              title="Total Employees"
              value={members.length}
              icon={<BarChart3 className="w-6 h-6" />}
              bgColor="bg-gradient-to-br from-green-600 to-gray-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <EmployeesChart />
            </div>
            <UpcomingInterviews />
          </div>

          {currentRole === 'lead' ? (
            <>
              <div className="mb-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                      <p className="text-sm text-gray-500 mt-1">{statusSummary}</p>
                    </div>
                    <div className="flex gap-4">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5f97]"
                      >
                        <option value="all">All Status</option>
                        <option value="Working">Working</option>
                        <option value="Break">Break</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Offline">Offline</option>
                      </select>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5f97]"
                      >
                        <option value="name">Sort by Name</option>
                        <option value="tasks">Sort by Tasks</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {filteredMembers.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        taskCount={getTaskCount(member.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <StatusPieChart statusCounts={statusCounts} totalEmployees={members.length} />
                </div>
                <TaskForm />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <StatusPieChart statusCounts={statusCounts} totalEmployees={members.length} />
                </div>
                <StatusSelector />
              </div>

              <TaskList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
const UpcomingInterviews = () => {
  const interviews = [
    {
      id: 1,
      name: 'Natalie Gibson',
      role: 'UI/UX Designer',
      time: '1:30 - 1:30',
      avatar: 'bg-yellow-400',
    },
    {
      id: 2,
      name: 'Peter Piperg',
      role: 'Senior Designer',
      time: '9:00 - 1:30',
      avatar: 'bg-orange-400',
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
      <div className="space-y-4">
        {interviews.map((interview) => (
          <div key={interview.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${interview.avatar} rounded-full`}></div>
              <div>
                <div className="font-semibold text-gray-900">{interview.name}</div>
                <div className="text-sm text-gray-500">{interview.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {interview.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingInterviews;
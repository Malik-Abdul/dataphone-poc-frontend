const AdminDashboard = () => {
  const teams = [
    {
      id: "1",
      name: "Engineering",
      created_at: "2026-10-01T10:00:00Z",
    },
    {
      id: "2",
      name: "Product",
      created_at: "2026-09-28T09:30:00Z",
    },
    {
      id: "3",
      name: "Design",
      created_at: "2026-09-25T11:00:00Z",
    },
    {
      id: "4",
      name: "Quality Assurance",
      created_at: "2026-09-20T08:00:00Z",
    },
  ];

  teams.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      <h3>Admin</h3>

      <div>AdminDashboard</div>

      {teams.map((team) => (
        <div key={team.id}>{team.name}</div>
      ))}
    </div>
  );
};

export default AdminDashboard;

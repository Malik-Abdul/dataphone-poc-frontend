import { prisma } from "@/lib/prisma";

const AdminDashboard = async () => {
  const teams = await prisma.team.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

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

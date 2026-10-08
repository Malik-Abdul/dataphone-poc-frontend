export type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

const users: User[] = [
  {
    id: "1",
    email: "admin@dataphone.com",
    password: "password123",
    first_name: "John",
    last_name: "Admin",
  },
  {
    id: "2",
    email: "john.doe@dataphone.com",
    password: "password123",
    first_name: "John",
    last_name: "Doe",
  },
  {
    id: "3",
    email: "jane.smith@dataphone.com",
    password: "password123",
    first_name: "Jane",
    last_name: "Smith",
  },
];

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email) ?? null;
}

export async function createUser(data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  const user: User = {
    id: String(users.length + 1),
    ...data,
  };

  users.push(user);

  return user;
}

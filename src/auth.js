const users = {
  owner: {
    password: "owner123",
    role: "owner"
  },

  ronnie: {
    password: "agent123",
    role: "agent",
    agentName: "Ronnie Isaac"
  },

  bernard: {
    password: "agent123",
    role: "agent",
    agentName: "Bernard Mbula"
  },

  edward: {
    password: "agent123",
    role: "agent",
    agentName: "Edward Kanyi"
  }
};

export function loginUser(username, password) {
  const user = users[username];

  if (!user) return null;
  if (user.password !== password) return null;

  return {
    username,
    ...user
  };
}
import API from "@/lib/axios";

export const login = async (username: string, password: string) => {
  const { data } = await API.post('/auth/login', {
    username,
    password,
  }, {
    headers: {
      credentials: "include",
    },

  });
  return data;
};

export const logout = async () => {
  const { data } = await API.post('/auth/logout', {}, {
    headers: {
      credentials: "include",
    },
  });
  return data;
};

export const getUser = async () => {
  const { data } = await API.get('/auth/user', {
    headers: {
      credentials: "include",
    },
  });
  return data;
};

export const register = async (username: string, password: string) => {
  const { data } = await API.post('/auth/register', {
    username,
    password,
  }, {
    headers: { credentials: "include" },
  });
  return data;
};
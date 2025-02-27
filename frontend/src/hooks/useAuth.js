import { useEffect, useState } from "react";
import axios from "../axiosConfig";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/check-auth")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null); // Logout on invalid token
      });
  }, []);

  return { user };
};

export default useAuth;

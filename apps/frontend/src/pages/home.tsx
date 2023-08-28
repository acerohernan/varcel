import { useUser } from "@/hooks/query/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { data: user, isLoading, isError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      // If we cannot retrieve the user, remove user's credentials
      localStorage.removeItem("token");

      navigate("/login");
    }
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>HomePage</h1>
      <p>{JSON.stringify(user ?? {})}</p>
    </div>
  );
};

export default HomePage;

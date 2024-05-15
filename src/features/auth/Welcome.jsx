import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../utils/authUtils";
import { useRefreshMutation } from "./authApiSlice";
import { useEffect, useState } from "react";
const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const [refreshToken, setRefreshToken] = useState()
  const [accessToken, setAccessToken] = useState();
  const initialToken = useSelector(selectCurrentToken);
  useEffect(() => {
      setRefreshToken(initialToken);
      setAccessToken(getAuthToken());

  }, [initialToken]);


  const [refresh, {isLoading}] = useRefreshMutation();

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  // const tokenAbbr = token ? `${token.slice(0, 9)}...` : "belum login";

  const handleRefresh = async (e) => {
      e.preventDefault();
      const userData = await refresh({ refreshToken }).unwrap();
      setRefreshToken(userData.refresh_token)
      setAccessToken(userData.access_token)

  }

  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="welcome">
      <h1> {welcome} </h1>
      <p>access token: {accessToken}</p>
      <p>refresh token: {refreshToken}</p>
      <p>
        <Link to="/userprofile">Go to the Users Profile</Link>
        <form onSubmit={handleRefresh}>
          {/* <button onClick={handleRefresh}>Refresh token</button> */}
          <button>Refresh token</button>
        </form>
      </p>
    </section>
  );
  return content;
};
export default Welcome;

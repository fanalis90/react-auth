import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../utils/authUtils";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);
  const token = getAuthToken()

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = token ? `${token.slice(0, 9)}...` : "belum login";

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link to="/userprofile">Go to the Users List</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;

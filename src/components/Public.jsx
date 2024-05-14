import { Link } from "react-router-dom";
import { store } from "../app/store";
import { getAuthToken } from "../utils/authUtils";
const handleClick = () => {
  console.log( store.getState())
  console.log(getAuthToken())
}
const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to the apps!</h1>
      </header>
      <main>
        <p>
         loremipsum.
        </p>
        <p>&nbsp;</p>
        <button onClick={handleClick}>
          klik me
        </button>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;

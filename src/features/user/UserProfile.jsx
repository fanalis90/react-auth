import { useGetUsersQuery } from "./userApiSlice";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users Profile</h1>
        {console.log(users)}
        <main>
          <img src={users.avatar}></img>
          <p>&nbsp;</p>
          <div>
            Nama :
            <br />
            {users.name}
            <br />
            <br />
            Email :
            <br />
            {users.email}
            <br />
            <br />
            Role :
            <br />
            {users.role}
            <br />
          </div>
        </main>

        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default UserProfile;

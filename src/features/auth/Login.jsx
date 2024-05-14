import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"
import { setCredential } from "./authSlice"
import { store } from "../../app/store"

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] =useState('')
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()


    useEffect(() => {
        userRef.current.focus()
    },[]);

    useEffect(() => {
        setErrMsg("")
    }, [password,email])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({email,password}).unwrap()
            console.log(userData)
            dispatch(setCredential({...userData,email}))
            console.log(store.getState().auth)
            setEmail('')
            setPassword('')
            navigate('/welcome')
        } catch (error) {
            if (!error?.response) {
              setErrMsg("no server response");
            } else if (error?.response?.status === 400) {
              setErrMsg("missing username or password");
            } else if (error?.response?.status === 401) {
              setErrMsg("unauthorized");
            } else  {
              setErrMsg("Login failed");
            }
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const content = isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <section className="login">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1>Employee Login</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="email"
            ref={userRef}
            value={email}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button>Sign In</button>
        </form>
      </section>
    );
  return (
    content
  )
}

export default Login
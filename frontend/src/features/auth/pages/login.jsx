    import React,{useState} from 'react';
    import '../auth.route.scss'
    import { useNavigate,Link } from 'react-router';
    import { useAuth } from '../hooks/useAuth';


    const Login = () => {
        const {loading,handleLogin} = useAuth()
        const navigate = useNavigate()
        const[email,setEmail] = useState('')
        const[password,setPassword] = useState('')
        const handleSubmit = async(e) => {
        
            e.preventDefault()
            const success =await handleLogin(email,password)
            if(success){
                navigate('/')
            }
            else{
                alert("Login failed. Please check your credentials and try again.")
            }
        }
        if(loading){
            return <main><div>Loading...</div></main>
        }
        return (
            
            <main>
                <div className='form-container'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder='enter email' onChange={(e)=>{setEmail(e.target.value)}}/>

                            

                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" name="password" required placeholder='enter password' />
                            
                            

                        </div>
                        <button className='button button-primary' type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </main>
        );
    }

    export default Login;
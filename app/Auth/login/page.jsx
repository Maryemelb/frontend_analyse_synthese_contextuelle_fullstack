

'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router= useRouter()
    const submit = async (e) => {
        e.preventDefault()
        try {

            let response = await fetch(
               ` ${process.env.NEXT_PUBLIC_BACKEND_API}/Auth/login`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
                        })

            if (!response.ok) {
                console.log('error')
                router.push('/login')
                return;
            }
          
            const data = await response.json()
            console.log(data)
            router.push('/synthese')
            
        }
        catch (error) {
            console.error("Error fetching comments:", error);
        }
    }
    return (
        <div>
            {/* <h1>Login</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" /><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button onClick={submit}>submit</button> */}

            <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 shadow-3xl  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6 " onSubmit={submit} action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="username" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <button type="submit" className="w-full font-bold text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account! <a href="login" className="text-primary-600 hover:underline dark:text-primary-500">sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>)
}

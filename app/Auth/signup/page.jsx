
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function Signup(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router= useRouter()
    const submit = async (e) => {
        e.preventDefault()
        try {

            let response = await fetch(
                'http://127.0.0.1:8000/Auth/signup', {
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
                return;
            }
          
            const data = await response.json()
            console.log(data)
            router.push('/Auth/login')
            
        }
        catch (error) {
            console.error("Error fetching comments:", error);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" /><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button onClick={submit}>submit</button>
        </div>)
}
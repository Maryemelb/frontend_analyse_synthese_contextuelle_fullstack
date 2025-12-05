'use client'
import { stringify } from "querystring"
import { useState } from "react"

export default function Synthese(){
    const [article, setArticle]= useState('')
    const [categories, setCategories]= useState([])
    const Submit = async(e)=>{
        console.log(categories, article)
        e.preventDefault()
        try {
            const response=await fetch('http://127.0.0.1:8000/analyze',{
                method:'POST',
                headers:{"Content-Type": "application/json"},
                credentials: "include",
                // Converts a JavaScript object into a JSON string.
                body: JSON.stringify({
                    article: article, 
                    categories: categories.split(',').map(cat => cat.trim()) 
                })    
            }) 
            const data= await response.json()
            console.log(data)
            
        } catch (error) {
            
            console.log(error)
        }
      

    }
    return (
        <div>
            <h1>synthese</h1>
            <textarea type="text" placeholder="article" value={article} onChange={(e)=>setArticle(e.target.value)}/>
            <input type="text" placeholder="categories" value={categories} onChange={(e)=>setCategories(e.target.value)}/>
            <button onClick={Submit}>submit</button>
        </div>
    )
}
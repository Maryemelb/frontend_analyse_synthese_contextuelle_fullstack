'use client'
import { stringify } from "querystring"
import { useState } from "react"

export default function Synthese() {
    const [article, setArticle] = useState('')
    const [categories, setCategories] = useState([])
    const [detected_category, setDetectedCategory]= useState('')
    const [predicted_ton, setPredictedton]= useState('')
    const [score, setScore]= useState('')
    const [summurized_text, setSummerizedtext]= useState('')
    const Submit = async (e) => {
        console.log(categories, article)
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/analyze`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                // Converts a JavaScript object into a JSON string.
                body: JSON.stringify({
                    article: article,
                    categories: categories.split(',').map(cat => cat.trim())
                })
            })
            const data = await response.json()
            setSummerizedtext(data.summurized_text)
            setDetectedCategory(data.detected_category)
            setScore(data.score)
            setPredictedton(data.ton)
            console.log(data)

        } catch (error) {

            console.log(error)
        }


    }
    return (
        <div>
           

            <div className="min-h-screen bg-gray-10 p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">

                    <header className="text-center mb-10 p-3">
                        <h1 className="text-5xl font-bold text-gray-900">Live Article Summarizer</h1>
                        <p className="text-sm text-orange-300 font-bold mt-3">Input your content and receive an instant summary.</p>
                    </header>
                   <form action="" onSubmit={Submit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

                        <aside className="bg-white p-6 rounded-xl shadow-xl h-fit top-4">
                            <h2 className="text-sm font-semibold mb-6 text-gray-800">Summarization Controls</h2>

                            <div className="mb-6">
                                <label for="category-input" className="block text-sm font-medium text-gray-700 mb-2">
                                    Categories/Keywords (Optional)
                                </label>
                                <input type="text" id="category-input" name="categories" onChange={(e)=> setCategories(e.target.value)} placeholder="e.g., Quantum Physics, Technology"
                                    className="w-full px-4 py-2 shadow-md rounded-lg  focus:outline-orange-100 transition duration-150 border-transparent "/>
                            </div>

                            <button id="summarize-button" type="submit"
                                className="w-full py-3 bg-orange-400 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-150 shadow-lg hover:shadow-xl transform hover:scale-[1.01]">
                                Summarize Text
                            </button>
                        </aside>

                        <section className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl">
                            <h2 className="text-sm font-semibold mb-6 text-gray-800">Original Article Text</h2>

                            <textarea id="article-text-input" rows="22" name="article" onChange={(e)=>setArticle(e.target.value)} placeholder="Paste your article text here..."
                                className="w-full px-4 py-3 text-sm rounded-lg transition duration-150 resize- border border-orange-100 focus:outline-none">
                                
                            </textarea>
                        </section>

                        <section className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl">
                            <h2 className="text-sm font-semibold mb-6 text-gray-800">Summarized Content</h2>
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800">Summary Statistics:</h3>
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>predicted ton: <span id="word-count" className="font-semibold">{predicted_ton}</span></span>
                                    <span>score: <span id="compression-ratio" className="font-semibold">{score}</span></span>
                                    <span>detected category: <span id="compression-ratio" className="font-semibold">{detected_category}</span></span>
                                </div>
                            </div>
                            <div id="summary-output" className="p-4 bg-gray-50 rounded-lg h-[480px] overflow-y-auto shadow-inner text-gray-700 leading-relaxed">
                                <p className="italic text-gray-500">
                                    The summarized text will appear here after clicking Summarize Text.
                                </p>
                            </div>

                           
                        </section>
                    </div>
                    </form>

                </div>
            </div>


        </div>
    )
}
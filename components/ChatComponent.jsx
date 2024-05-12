'use client'

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import {generateChatResponse} from "../utils/actions"
import toast from "react-hot-toast"

const ChatComponent = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const { mutate, isPending } = useMutation({
        mutationFn: (messages) => generateChatResponse(messages),
        onSuccess: (data) => {
            if(!data) {
                toast.error('Something went wrong...')
                return
            }
            setMessages(prev => [...prev,data])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = { role: 'user', content: text}
        setMessages(prev => [...prev,query])
        mutate(messages);
        setText('')
    }


  return (
    <div>
        <button className="btn btn-sm btn-error btn-outline mb-4" onClick={()=>setMessages([])} disabled={messages.length === 0}>Clear Searches</button>
        <div className="min-h-[calc(100vh-8rem)] grid grid-rows-[1fr,auto]">
            <div>
                {messages.map(({role,content},index)=>{
                    const avatar = role === 'user' ? '🙍‍♀️' : '🤖';
                    const background = role === 'user' ? 'bg-base-200' : 'bg-base-100'
                    return <div key={index} className={`${background} mb-4 text-xl flex p-3`}>
                        <span className="mr-4">{avatar}</span>
                        <p>{content}</p>
                    </div>
                })}
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
                <div className="join w-full">
                    <input type="text" placeholder="Message Genius Gpt"
                    className="input input-bordered join-item w-full" value={text} required
                    onChange={(e)=> setText(e.target.value)} />
                    <button className="join-item btn btn-primary" disabled={isPending}>
                        {isPending ? 'Please wait...' : 'Ask GPT'}
                    </button>
                </div>
            </form>
        </div>
    </div>
    
  )
}

export default ChatComponent
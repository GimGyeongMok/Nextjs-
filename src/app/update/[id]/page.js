"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id)
        .then(resp=>resp.json())
        .then(result=>{
            setTitle(result.title);
            setBody(result.body);
        })
    },[])
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();// event는 온서브밋이 실행되었을 때 기본적인 동작을 막는다.(페이지 전환 등)
            const title = e.target.title.value; // tartget은 폼태그를 의미한다 title은 name이 title인 벨류값을 title변수에 넣는다
            const body = e.target.body.value;
            const options = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(`http://localhost:9999/topics/`+id, options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                router.push(`/read/${lastid}`); // 글이 생성되고 그 id값으로 페이지 이동
                router.refresh();
            })
        }}>
            <p>
                <input
                 type="text"
                 name="title"
                 placeholder="title" 
                 value={title} 
                 onChange={(e) => setTitle(e.target.value)}
                 />
            </p>
            <p>
                <textarea 
                name="body" 
                placeholder="body" 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
    )
}
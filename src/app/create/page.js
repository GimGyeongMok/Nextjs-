"use client"

import { useRouter } from "next/navigation";

export default function Create(){
    const router = useRouter();
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();// event는 온서브밋이 실행되었을 때 기본적인 동작을 막는다.(페이지 전환 등)
            const title = e.target.title.value; // tartget은 폼태그를 의미한다 title은 name이 title인 벨류값을 title변수에 넣는다
            const body = e.target.body.value;
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                router.push(`/read/${lastid}`); // 글이 생성되고 그 id값으로 페이지 이동
                router.refresh();
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title"></input>
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
    )
}
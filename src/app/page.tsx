import type {Metadata} from "next";
import Htag from "@/components/Htag/Htag";

export const metadata: Metadata = {
    title: 'Главная',
}

export default function Home() {
    return (
        <div className='cont'><Htag tag='h1'>asdfasf</Htag></div>
    )
}

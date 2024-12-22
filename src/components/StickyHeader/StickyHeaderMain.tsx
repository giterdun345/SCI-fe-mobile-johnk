import { SetStateAction, useState } from "react";
import Dropdown from "../Dropdown"
import { CardData } from "@/types/CardsTypes";

export default function StickyHeaderMain({ setCardList }: { setCardList: React.Dispatch<SetStateAction<CardData[]>> }) {
    const [selectedHP, setSelectedHP] = useState<string>("");

    return (
        <>
            <Dropdown onSelect={setSelectedHP} />
        </>
    )
}
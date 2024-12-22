import { SetStateAction, useState } from "react";

import { CardData } from "@/types/CardsTypes";

import Dropdown from "../Dropdown";

export default function StickyHeaderMain({
  setCardList,
}: {
  setCardList: React.Dispatch<SetStateAction<CardData[]>>;
}) {
  const [selectedHP, setSelectedHP] = useState<string>("");

  return (
    <>
      <Dropdown onSelect={setSelectedHP} />
    </>
  );
}

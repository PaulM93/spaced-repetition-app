import React from "react";
import { Button, Flex, HStack } from "@chakra-ui/react";

interface NavButtons {
  navVal: string;
  setNavVal: (val: string) => void;
}

export default function NavButtons({ navVal, setNavVal }: NavButtons) {
  //Structure
  /*
        Main Buttons
        1) Add Collection
                    SubButtons
                        Add Card, edit cards, delete cards
        2) Review Cards
                    SubButton
                        Collection types 
    
    */
  const navButtons = ["Add Collection", "Review Cards"];
  const buttonMarkup = navButtons.map((button) => (
    <Button
      key={button}
      variant={navVal === button ? "solid" : "outline"}
      colorScheme={navVal === button ? "blue" : "gray"}
      onClick={() => setNavVal(button)}
    >
      {button}
    </Button>
  ));

  return <HStack spacing={2}>{buttonMarkup}</HStack>;
}
{
  /* <Button onClick={() => handleSave()}>Save</Button> */
}
{
  /* Save adds reviewedCards to cards and updates the database with this  */
}

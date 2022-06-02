import React, { useState } from "react";
import { Flex, Heading, Input, VStack, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

interface CreateCard {
  setCards: any;
  cards: any;
}

export default function CreateCard({ setCards, cards }: CreateCard) {
  const [cardDetails, setCardDetails] = useState({
    front: "",
    back: "",
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    dueDate: dayjs(Date.now()).toISOString(),
    id: uuidv4(),
  });

  const handleChange = (e: any) => {
    setCardDetails({
      ...cardDetails,
      [e.target.id]: e.target.value,
    });
  };

  //Check if card already exists
  const handleSubmit = () => {
    setCardDetails({
      ...cardDetails,
      front: "",
      back: "",
      id: "",
    });
    setCards([...cards, cardDetails]);
  };

  return (
    <Flex
      flexDir={"column"}
      align="center"
      w={"40%"}
      p={10}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
      borderRadius={4}
    >
      <Heading mb={5} size="md">
        Create Card
      </Heading>
      <VStack spacing={3}>
        <Input
          value={cardDetails.front}
          onChange={handleChange}
          id="front"
          placeholder="Front of card..."
          size="md"
        />
        <Input
          value={cardDetails.back}
          onChange={handleChange}
          id="back"
          placeholder="Back of card..."
          size="md"
        />
        <Button onClick={() => handleSubmit()}>Add Card</Button>
      </VStack>
    </Flex>
  );
}

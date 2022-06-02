import React, { useState, useEffect } from "react";
import { Button, Text, Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
//Component
import CollectionCard from "./CollectionCard/CollectionCard";
import ReviewCards from "../ReviewCards";

interface ReviewCollections {
  collections: any;
  setCollections: any;
}

export default function ReviewCollections({
  collections,
  setCollections,
}: ReviewCollections) {
  //Include a timer
  const toast = useToast();

  //User selects a collection
  const [selectedCollection, setSelectedCollection] = useState("");
  //We need to set the correct cards for the collection also
  const handleCollectionSelection = (val: string) => {
    setSelectedCollection(val);
    //Find index position of collection obj and setCards state depending on this
    const index = collections.findIndex((obj) => {
      return obj.name === val;
    });
    setCards(collections[index].cards);
  };

  console.log("collection", collections);

  //Main Cards
  const [cards, setCards] = useState([]);
  const [reviewedCards, setReviewedCards] = useState([]);
  console.log("These are the cards", cards);
  console.log("These are the reviewed cards", reviewedCards);

  // //Save Cards -- We will need to update the collection
  // const handleSave = () => {
  //   setReviewedCards([]);
  //   setCards(reviewedCards);
  // };

  //Review Completed
  const handleReviewCompleted = () => {
    toast({
      title: "Progress Saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    //We must also update the collection state for this object
    //Use index and replace the whole cards arr with the reviewed cards
    //We would update the database here and then set reviewed cards to [] as well as cards []

    //Update Cards in the collection with the reviewed data
    const updatedData = collections.map((obj) => {
      if (obj.name === selectedCollection) {
        return { ...obj, cards: reviewedCards };
      } else return obj;
    });
    setCollections(updatedData);
    //Reser selected collection
    setSelectedCollection("");
    //Reset reviewed cards
    setReviewedCards([]);
  };

  //We need to store all the collections here
  const collectionCardMarkup =
    collections.length &&
    collections.map((collection) => (
      <GridItem key={collection}>
        <CollectionCard
          cards={collection.cards}
          name={collection.name}
          category={collection.category}
          handleCollectionSelection={handleCollectionSelection}
        />
      </GridItem>
    ));

  let markup;
  if (selectedCollection === "") {
    markup = collections.length ? (
      <Grid gap={4} templateColumns="repeat(3, 1fr)" minWidth="100%" h="200px">
        {collectionCardMarkup}
      </Grid>
    ) : (
      <Text fontSize="md">You have no collections...</Text>
    );
  } else {
    markup = (
      <ReviewCards
        handleReviewCompleted={handleReviewCompleted}
        cards={cards}
        setCards={setCards}
        reviewedCards={reviewedCards}
        setReviewedCards={setReviewedCards}
      />
    );
  }

  return (
    <>
      <Flex minWidth="100%" flexDir={"column"} align="center">
        {markup}
      </Flex>
    </>
  );
}

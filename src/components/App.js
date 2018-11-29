import React, { useState, useEffect } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishesBody from "../samples-fishes-body";
// import base from '../base'
import firebase from "../firebase";
// import { useList, useObject } from 'react-firebase-hooks/database';

export default function App({
  match: {
    params: { storeId }
  }
}) {
  const [fishes, setFish] = useState({});
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem(storeId)) || {}
  );

  const fishesRef = firebase.database().ref(`${storeId}/fishes/`);

  useEffect(() => {
    //Take a snapshot of the DB
    fishesRef.on("value", snapshot => {
      console.log("Snapshot of the database:");
      console.log(snapshot.val());
      // setFish(prevState => { return { ...snapshot.val(), ...prevState } })

      //populate state with db at initial render
      setFish(snapshot.val());
    });

    return () => {
      //Stop the listener
      fishesRef.off();
    };
  }, []);

  useEffect(() => {
    //pass state to db
    // fishesRef.update(fishes)
  }, []);

  const addFish = fish => {
    const newFishKey = firebase
      .database()
      .ref(storeId)
      .child("fishes")
      .push().key;
    let fishObject = {};
    fishObject[newFishKey] = fish;
		fishesRef.update(fishObject)
  };

  const loadSampleFishes = () => {
    sampleFishesBody.map(fish => addFish(fish));
  };

  const updateFish = updatedFullFish => {
    //take a copy of  the current state
    // const fishes= {...fishes}
    //update that state
    fishesRef.update(updatedFullFish);
    console.log(updatedFullFish);
    //set that to state
  };

  const addToOrder = key => {
    //copy original order so we can add/update/modify data
    const newOrder = { ...order };
    //add a fishID to order, along with quantity
    newOrder[key] = newOrder[key] + 1 || 1;
    //set it
    setOrder(newOrder);
    console.log(order);
  };

  useEffect(
    () => {
      localStorage.setItem(storeId, JSON.stringify(order));
    },
    [order]
  );

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {fishes &&
            Object.entries(fishes).map(([key, fish]) => (
              <Fish
                key={key}
                fishID={key}
                fish={fish}
                addToOrder={addToOrder}
              />
            ))}
        </ul>
      </div>
      <Order fishes={fishes} order={order} />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
      />
    </div>
  );
}

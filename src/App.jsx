import React, { useState, useEffect } from 'react';

const Counter = ({ label, counter, setCounter }) => {
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + increment);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [increment, setCounter]);

  const increaseIncrementBy20Percent = () => {
    setIncrement((prevIncrement) => prevIncrement * 1.2);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{label}</h3>
      <p style={{ fontSize: '20px' }}>{counter.toFixed(2)}</p>
      <button onClick={increaseIncrementBy20Percent} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Increase Increment by 20%
      </button>
    </div>
  );
};

const App = () => {
  const [wood, setWood] = useState(0);
  const [iron, setIron] = useState(0);
  const [food, setFood] = useState(0);
  const [mud, setMud] = useState(0);
  const [houseLevel, setHouseLevel] = useState(1);
  const [resourceCost, setResourceCost] = useState(10);

  const levelUpHouse = () => {
    if (wood >= resourceCost && iron >= resourceCost && food >= resourceCost && mud >= resourceCost) {
      // Deduct resources
      setWood((prev) => prev - resourceCost);
      setIron((prev) => prev - resourceCost);
      setFood((prev) => prev - resourceCost);
      setMud((prev) => prev - resourceCost);

      // Increase house level
      setHouseLevel((prev) => prev + 1);

      // Increase cost by 20%
      setResourceCost((prev) => prev * 1.2);
    } else {
      alert("Not enough resources to level up the house!");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Resource Management</h1>
      <div>
        <Counter label="Wood" counter={wood} setCounter={setWood} />
        <Counter label="Iron" counter={iron} setCounter={setIron} />
        <Counter label="Food" counter={food} setCounter={setFood} />
        <Counter label="Mud" counter={mud} setCounter={setMud} />
      </div>
      <div style={{ marginTop: '40px' }}>
        <h3>House Level: {houseLevel}</h3>
        <p>Cost to Level Up: {resourceCost.toFixed(2)} of each resource</p>
        <button onClick={levelUpHouse} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Level Up House
        </button>
      </div>
    </div>
  );
};

export default App;

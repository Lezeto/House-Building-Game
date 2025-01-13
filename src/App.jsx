import React, { useState, useEffect } from 'react';
import foodIcon from './food.png';
import ironIcon from './iron.png';
import mudIcon from './mud.png';
import woodIcon from './wood.png';
import casaIcon from './casa.png';

function App() {
  const [resources, setResources] = useState({
    wood: 0,
    iron: 0,
    food: 0,
    mud: 0,
  });

  const [increments, setIncrements] = useState({
    wood: 1,
    iron: 1,
    food: 1,
    mud: 1,
  });

  const [incrementCosts, setIncrementCosts] = useState({
    wood: 10,
    iron: 10,
    food: 10,
    mud: 10,
  });

  const [houseLevel, setHouseLevel] = useState(1);
  const [resourceCost, setResourceCost] = useState(10);

  const initialHouseSize = 50; 

  useEffect(() => {
    const intervals = {};
    for (const resource in resources) {
      intervals[resource] = setInterval(() => {
        setResources((prevResources) => ({
          ...prevResources,
          [resource]: prevResources[resource] + increments[resource],
        }));
      }, 1000);
    }

    return () => {
      for (const resource in intervals) {
        clearInterval(intervals[resource]);
      }
    };
  }, [increments]); 

  const increaseIncrement = (resource) => {
    if (
      resources.wood >= incrementCosts[resource] &&
      resources.iron >= incrementCosts[resource] &&
      resources.food >= incrementCosts[resource] &&
      resources.mud >= incrementCosts[resource]
    ) {
      setResources((prevResources) => ({
        ...prevResources,
        wood: Math.max(0, prevResources.wood - incrementCosts[resource]),
        iron: Math.max(0, prevResources.iron - incrementCosts[resource]),
        food: Math.max(0, prevResources.food - incrementCosts[resource]),
        mud: Math.max(0, prevResources.mud - incrementCosts[resource]),
      }));

      setIncrements((prevIncrements) => ({
        ...prevIncrements,
        [resource]: Math.max(0.01, prevIncrements[resource] * 1.2),
      }));

      setIncrementCosts((prevCosts) => ({
        ...prevCosts,
        [resource]: Math.max(0.01, prevCosts[resource] * 1.2),
      }));
    } else {
      alert(`Not enough resources to increase speed for ${resource}!`);
    }
  };

  const levelUpHouse = () => {
    if (
      resources.wood >= resourceCost &&
      resources.iron >= resourceCost &&
      resources.food >= resourceCost &&
      resources.mud >= resourceCost
    ) {
      setResources({
        wood: resources.wood - resourceCost,
        iron: resources.iron - resourceCost,
        food: resources.food - resourceCost,
        mud: resources.mud - resourceCost,
      });
      setHouseLevel(houseLevel + 1);
      setResourceCost(resourceCost * 1.2);
    } else {
      alert('Not enough resources to level up the house!');
    }
  };

  const saveGame = () => {
    const gameData = {
      resources,
      increments,
      incrementCosts,
      houseLevel,
      resourceCost,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
    alert('Game saved!');
  };

  const loadGame = () => {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      const loadedData = JSON.parse(savedData);
      setResources(loadedData.resources);
      setIncrements(loadedData.increments);
      setIncrementCosts(loadedData.incrementCosts);
      setHouseLevel(loadedData.houseLevel);
      setResourceCost(loadedData.resourceCost);
      alert('Game loaded!');
    } else {
      alert('No saved game found.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Resource Management</h1>
      <div>
        {Object.entries(resources).map(([resource, count]) => (
          <div key={resource} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img 
              src={
                resource === 'food' ? foodIcon :
                resource === 'iron' ? ironIcon :
                resource === 'mud' ? mudIcon :
                resource === 'wood' ? woodIcon : 
                null 
              } 
              alt={resource} 
              style={{ width: '30px', height: '30px', marginRight: '10px' }} 
            />
            <h3>{resource}</h3>
            <p style={{ fontSize: '20px' }}>{count.toFixed(2)}</p>
            <button 
              onClick={() => increaseIncrement(resource)} 
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              Increase Increment by 20% (Cost: {incrementCosts[resource].toFixed(2)} of each)
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '40px' }}>
        <h3>House Level: {houseLevel}</h3>
        <p>Cost to Level Up: {resourceCost.toFixed(2)} of each resource</p>
        <button onClick={levelUpHouse} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Level Up House
        </button>
        <img 
          src={casaIcon} 
          alt="House" 
          style={{ 
            width: `${initialHouseSize * Math.pow(1.2, houseLevel - 1)}px`, 
            height: `${initialHouseSize * Math.pow(1.2, houseLevel - 1)}px`, 
            marginTop: '20px' 
          }} 
        />
      </div>
      <div style={{ marginTop: '40px' }}>
        <button onClick={saveGame} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}>
          Save Game
        </button>
        <button onClick={loadGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Load Game
        </button>
      </div>
    </div>
  );
}

export default App;
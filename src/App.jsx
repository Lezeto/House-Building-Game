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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f9', fontFamily: "'Roboto', sans-serif", padding: '20px' }}>
      {/* Left Section: Resources */}
      <div style={{ width: '45%', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginRight: '20px' }}>
        <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '28px' }}>Resource Management</h1>
        <div>
          {Object.entries(resources).map(([resource, count]) => (
            <div key={resource} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#fafafa', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={ 
                    resource === 'food' ? foodIcon : 
                    resource === 'iron' ? ironIcon : 
                    resource === 'mud' ? mudIcon : 
                    resource === 'wood' ? woodIcon : null
                  } 
                  alt={resource} 
                  style={{ width: '40px', height: '40px', marginRight: '15px', borderRadius: '50%' }} 
                />
                <div>
                  <h3 style={{ fontSize: '20px', color: '#444' }}>{resource}</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#555' }}>{count.toFixed(2)}</p>
                </div>
              </div>
              <button 
                onClick={() => increaseIncrement(resource)} 
                style={{
                  padding: '12px 25px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '10px',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                Increase Increment by 20% (Cost: {incrementCosts[resource].toFixed(2)} of each)
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <button onClick={saveGame} style={{ padding: '12px 25px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#2196F3', color: '#fff', border: 'none', marginRight: '15px' }}>
            Save Game
          </button>
          <button onClick={loadGame} style={{ padding: '12px 25px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#FFC107', color: '#fff', border: 'none' }}>
            Load Game
          </button>
        </div>
      </div>

      {/* Right Section: House */}
      <div style={{ width: '45%', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h3 style={{ fontSize: '22px', color: '#333' }}>House Level: {houseLevel}</h3>
        <p style={{ fontSize: '18px', color: '#666' }}>Cost to Level Up: {resourceCost.toFixed(2)} of each resource</p>
        <button 
          onClick={levelUpHouse} 
          style={{
            padding: '12px 25px',
            fontSize: '16px',
            borderRadius: '5px',
            backgroundColor: '#FF5722',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e64a19'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#FF5722'}
        >
          Level Up House
        </button>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img 
            src={casaIcon} 
            alt="House" 
            style={{ 
              width: `${initialHouseSize * Math.pow(1.2, houseLevel - 1)}px`, 
              height: `${initialHouseSize * Math.pow(1.2, houseLevel - 1)}px`, 
              marginTop: '20px', 
              transition: 'all 0.3s ease',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;

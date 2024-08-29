import React, { useState } from 'react';
import './App.css';
import jsonData1 from './lists/tasks.json';
import jsonData2 from './lists/who.json';

function App() {
    const [selectedData, setSelectedData] = useState([]);
    const [count, setCount] = useState(1);

    const getRandomData = (jsonArray, usedTasks) => {
        let availableTasks = jsonArray.filter(item => !usedTasks.includes(item.task));
        const randomIndex = Math.floor(Math.random() * availableTasks.length);
        return availableTasks[randomIndex];
    };

    const handleGenerateButtonClick = () => {
        const data = [];
        for (let i = 0; i < count; i++) {
            const usedTasks = [];
            const group = [];
            for (let j = 0; j < 3; j++) {
                const item1 = getRandomData(jsonData1, usedTasks);
                usedTasks.push(item1.task);
                group.push({ task: item1.task, source: 'json1' });
            }
            for (let k = 0; k < 2; k++) {
                const item2 = getRandomData(jsonData2, usedTasks);
                usedTasks.push(item2.task);
                group.push({ task: item2.task, source: 'json2' });
            }
            data.push(group);
        }
        setSelectedData(data);
    };

    const handlePrintButtonClick = () => {
        window.print();
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Generátor svatebního binga</h1>
                <div>
                    <input
                        type="number"
                        min="1"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                    <button onClick={handleGenerateButtonClick}>Generovat</button>
                    <button onClick={handlePrintButtonClick}>Vytisknout</button>
                </div>
                <div className="tasks-container">
                    {selectedData.map((group, groupIndex) => (
                        <div key={groupIndex} className="task-group">
                            <h2>Svatební bingo 💍👰🏻🤵🏻🌷</h2>
                            <p>Jméno:</p>
                            {group.map((data, index) => (
                                <div key={index} className="task">
                                  <span className={"checkbox"}>  ⃣ </span>  {data.task}
                                </div>
                            ))}
                            <p className="help-text">Jakmile budeš mít vše splněno, vhoď lístek do slosovací bedny, abys mohl získat cenu.</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;

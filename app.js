const tableData = [
    [1,2,3,4,5],
    [0.2,0.3,0.4,0.5,0.6],
    [0.2,0.5,0.6,0.5,0.8]
];

function App() {
    const [runs, setRuns] = React.useState(100000);
    const [attackers, setAttackers] = React.useState(10);
    const [defenders, setDefenders] = React.useState(10);

    function onRunsChange(event) {
        setRuns(Number(event.target.value));
      }

    function onAttackersChange(event) {
        setAttackers(Number(event.target.value));
    }

    function onDefendersChange(event) {
        setDefenders(Number(event.target.value));
    }

    function handleSubmit(event) {
        document.getElementById("result").innerHTML = "Computing result...";
        event.preventDefault();

        //Wait for module to initialize,
        createModule().then(({Risk}) => {
            // Perform computation
            const risk = new Risk(runs, attackers, defenders);
            let p = risk.simulate();

            document.getElementById("result").innerHTML = attackers + " vs " + defenders + ": Win Chance for Attacker: "
            + p;
        });
      }

    return (
        <div>
            <h1>Probability of Risk Dice Throws</h1>
            <div>
                <form id="parameters" onSubmit={handleSubmit}>
                    <p className="text-center">
                    Each battle gets simulated for the selected amount of Runs with the selected amount of Attackers and Defenders.
                    <br></br><br></br>Info: In this simulation "Attackers" denote troops that can attack, the 1 troop that has to remain
                    on a territory is not considered!
                    <br></br>Info: A value of at least 10000 Runs is recommended for accurate results.
                    </p>

                    <span>Runs</span>
                    <input type="number" value={runs} onChange={onRunsChange}></input>

                    <span>Attackers</span>
                    <input type="number" value={attackers} onChange={onAttackersChange}></input>

                    <span>Defenders</span>
                    <input type="number" value={defenders} onChange={onDefendersChange}></input>

                    <p>Run simulation for {runs} runs with {attackers} attackers and {defenders} defenders?</p>
                    <input type="submit" value="Run Simulation"></input>
                </form>
            </div>

            <h2>Result</h2>
            <h3 id="result" className="text-center">No Result</h3>

            <table>
                <caption>Probabilites up to 30 vs 30:</caption>
                <thead>
                    <tr>
                        <th cope="col">-</th>
                    {tableData[0].map((val, key) => {
                        return (
                            <th scope="col" key={key}>{val}</th>
                        )
                    })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.slice(1).map((arr, arrKey) => {
                        return (
                            <tr key={arrKey}>
                                <th>{arrKey}</th>
                                {arr.map((val, key) => {
                                    return (
                                        <td key={key}>{val}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);
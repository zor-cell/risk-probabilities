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
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);
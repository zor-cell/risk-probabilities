function App() {
    const [runs, setRuns] = React.useState(100000);
    const [attackers, setAttackers] = React.useState(2);
    const [defenders, setDefenders] = React.useState(2);

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

            document.getElementById("result").innerHTML = "Win percentage for the attacker: " + attackers + " Attackers vs " + defenders + " Defenders: " + p;
        });
      }

    return (
        <div>
            <h1>Probability of Risk Dice Throws</h1>
            <form onSubmit={handleSubmit}>
                <span>Runs</span>
                <input type="number" value={runs} onChange={onRunsChange}></input>

                <span>Attackers</span>
                <input type="number" value={attackers} onChange={onAttackersChange}></input>

                <span>Defenders</span>
                <input type="number" value={defenders} onChange={onDefendersChange}></input>

                <input type="submit" value="Run Simulation"></input>
            </form>

            <p id="result">No Results</p>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);
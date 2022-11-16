//indicates how many cells are in which color range
let colorData = [0,0,0,0,0];

let tableData = [];
function readTableInput() {
    let file = "assets/table_30x30.CSV";
    let rawFile = new XMLHttpRequest();

    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                tableData = allText.split("\n").map(function(row) {
                    return row.split(",");
                })
                console.log(tableData);
            }
        }
    }
    rawFile.send(null);
}
readTableInput();

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

    function setCellColor(value, row, col) {
        let ans = "cell-0";

        if(value < 0.2) {
            ans = "cell-0";
            colorData[0]++;
        } else if(value < 0.4) {
            ans = "cell-20";
            colorData[1]++;
        }else if(value <= 0.6) {
            ans = "cell-40";
            colorData[2]++;
        } else if(value <= 0.8) {
            ans = "cell-60";
            colorData[3]++;
        } else if(value <= 1) {
            ans = "cell-80";
            colorData[4]++;
        }

        return ans;
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

            <table className="data-table">
                <caption>Probabilites up to 30 vs 30:</caption>
                <thead>
                    <tr>
                        <th cope="col">A\D</th>
                        {/* Read first row as headers */}
                        {tableData[0].map((val, key) => {
                            return (
                                <th scope="col" key={key}>{val}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* Go through all rows execpt the first */}
                    {tableData.slice(1).map((arr, arrKey) => {
                        return (
                            <tr key={arrKey}>
                                <th>{arrKey + 1}</th>
                                {arr.map((val, key) => {
                                    return (
                                        <td className={setCellColor({val}.val, arrKey, key)} key={key}>{val}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {console.log(colorData)}
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);
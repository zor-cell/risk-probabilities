#ifndef H_RISK_HPP
#define H_RISK_HPP

#include "stdafx.hpp"

class Risk {
    private:
        //amount of times the simulation runs
        int runs;

        //number of attackers
        int attackers;
        //number of defenders
        int defenders;

        std::fstream file;
        std::vector<std::vector<double>> table;

        //simulate single dice throw
        int diceThrow();
        //simulate and return N dice throws where N is given
        std::vector<int> createDiceThrows(int size);
        //calculate how many dice each player receives according to his troops
        int howManyDice(int troops, bool attacker);

        //calculate losses for each side with some given dice throws (losses directly affect troops by reference)
        void losses(int &numA, int& numD, std::vector<int> attacker, std::vector<int> defender);
        //true if attacking troops won against defending troops in simulation
        bool attackSuccess(int numA, int numD);

    public:
        Risk(int _runs, int _attackers, int _defenders);
        
        double simulate();
};
#endif
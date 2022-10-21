#include "risk.hpp"

const double RUNS = 1e5;

Risk::Risk(int _runs, int _attackers, int _defenders): runs(_runs), attackers(_attackers), defenders(_defenders) {
    srand(time(NULL));
};

int Risk::diceThrow() {
    return rand() % 6;
}

std::vector<int> Risk::createDiceThrows(int size) {
    std::vector<int> throws;

    for(int i = 0;i < size;i++) {
        throws.push_back(diceThrow());
    }

    return throws;
}

int Risk::howManyDice(int troops, bool attacker) {
    int dice = -1;

    if(attacker) {
        if(troops >= 3) dice = 3;
        else if(troops == 2) dice = 2;
        else if(troops == 1) dice = 1;
    } else {
        if(troops >= 2) dice = 2;
        else if(troops == 1) dice = 1;
    }

    return dice;
}


//calculate losses for both parties with given dice throws
void Risk::losses(int &numA, int& numD, std::vector<int> attacker, std::vector<int> defender) {
    std::sort(attacker.begin(), attacker.end(), std::greater<int>());
    std::sort(defender.begin(), defender.end(), std::greater<int>());

    for(int i = 0;i < std::min(attacker.size(), defender.size());i++) {
        if(attacker[i] > defender[i]) numD--;
        else numA--;

        if(numA <= 0 || numD <= 0) return;
    }
}

bool Risk::attackSuccess(int numA, int numD) {
    //remember pass numA - 1 in real game because one troop must remain
    int diceA = howManyDice(numA, true);
    int diceD = howManyDice(numD, false);

    losses(numA, numD, createDiceThrows(diceA), createDiceThrows(diceD));
    
    if(numA <= 0) return false;
    else if(numD <= 0) return true;

    return attackSuccess(numA, numD);
}

double Risk::simulate() {
    int successes = 0;
    for(int run = 1;run <= runs;run++) {
        successes += attackSuccess(attackers, defenders);
    }

    double p = static_cast<double>(successes) / static_cast<double>(runs);
    return p;
}

std::vector<double> splitString(std::string s, char delimiter = ',') {
    std::vector<double> res;

    std::string cur = "";
    for(int i = 0;i < s.size();i++) {
        if(s[i] == delimiter) {
            res.push_back(std::stod(cur));
            cur = "";
        } else cur += s[i];
    }

    return res;
}
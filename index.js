import chalk from "chalk"
import prompts from "prompts"
import crypto from "crypto"
import { exit } from "process";

//introduction
console.log(chalk.magenta("GUESS THE NUMBER!"));
console.log("Guess a number between 1 and 10.")
console.log(chalk.yellow("You have 3 attempts!"))

//game
let randomNum = crypto.randomInt(1,11);

(async() => {
    for(let attempts = 1; attempts <= 3; attempts +=1){
        const response = await prompts({
            type: 'text',
            name: 'question',
            message: `Attempt ${attempts}/3: Enter your guess: `,
        });

        if(response.question === randomNum){
            console.log("Correct!");
            return;
        } 
        else if(attempts <= 3){
            console.log("Wrong try again.");
        }
    }
})();

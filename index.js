import chalk from "chalk"
import prompts from "prompts"
import crypto from "crypto"
import { writeFile } from 'node:fs';

let randomNum = crypto.randomInt(1,11); //random num
let output = []; //file

//introduction
console.log(chalk.magenta.underline("GUESS THE NUMBER!"));
console.log("Guess a number between 1 and 10.")
console.log(chalk.yellow("You have 3 attempts!"))
output.push("GUESS THE NUMBER!");
output.push("Guess a number between 1 and 10.");
output.push("You have 3 attempts!");


//game
(async() => {
    for(let attempts = 1; attempts <= 3; attempts +=1){
        const response = await prompts({
            type: 'text',
            name: 'question',
            message: `Attempt ${attempts}/3: Enter your guess: `,
        });
        const guess = response.question;

        try{
            if(response.question.trim() ===""){ //empty
                throw new Error("Guess cannot be empty.");
            }
            if(Number.isInteger(Number(guess)) === false){ //non integer guess
                throw new Error("Enter a number.");
            }
            if (Number(guess) <= 0) { //negative number
                throw new Error("Your guess must be greater than 0.");
            }
            if (Number(guess) > 10) { // higher than 10
                throw new Error("Your guess cannot be greater than 10.");
            }
            if(Number(guess) === randomNum){
                console.log(chalk.greenBright("Correct!"));
                output.push("Correct!");
                break;
            }   
            else if(Number(guess) > randomNum){ //too high
                console.log(chalk.yellow("Too High!"));
                output.push("Too High!");
            }
            else if(Number(guess) < randomNum){ //too low
                console.log(chalk.yellow("Too Low!"))
                output.push("Too Low!");
            }
        } catch(error){
            console.log(chalk.redBright(error.message));
            output.push(error.message);
        }
    }

    //Lose Message
    if (!output.includes("Correct!")) {
        console.log(chalk.red("GAME OVER!"));
        console.log(chalk.cyan(`The secret number was ${randomNum}`));
        output.push("GAME OVER!");
        output.push(`The secret number was ${randomNum}`);
    }

    output.push("Game output saved to output.txt");
    output.push("Thanks for playing!");

    writeFile('output.txt', output.join('\n'),(error) =>{ //file write
            if(error){
                console.error("Error saving game output:", error);
                return;
            }
            console.log("Game output saved to output.txt");
            console.log(chalk.magentaBright("Thanks for playing!"));
        }
    );
})();




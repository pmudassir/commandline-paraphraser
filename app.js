import readline from 'readline';
import { OpenAI } from 'openai';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function paraphrase() {
    const styleOptions = ['Professional', 'Creative', 'Urgent'];

    rl.question('Enter the text to paraphrase: ', async (text) => {
        if (!text) {
            rl.close();
            return console.log("Please enter the text to paraphrase");
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'style',
                message: 'Choose paraphrasing style:',
                choices: styleOptions
            }
        ])
            .then(async answers => {
                const chosenStyle = answers.style;

                try {
                    const completion = await openai.chat.completions.create({
                        messages: [{ role: "user", content: `Paraphrase the given sentence : ${text} in a ${chosenStyle} way or tone` }],
                        max_tokens: 150,
                        model: "gpt-3.5-turbo",
                    });
                    const paraphrasedText = completion.choices[0].message.content;
                    console.log('Paraphrased text:', paraphrasedText);
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    rl.close();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                rl.close();
            });
    });
}

paraphrase();
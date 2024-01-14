const readline = require('readline');
const OpenAI = require('openai');

require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the text to paraphrase: ', async (text) => {
    rl.question('Choose option (Professional, Creative, Urgent): ', async (option) => {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: `Paraphrase the given sentence : ${text} in a ${option} way or tone` }],
            max_tokens: 150,
            model: "gpt-3.5-turbo",
        })
        const paraphrasedText = completion.choices[0].message.content;
        console.log('Paraphrased text:', paraphrasedText);
        rl.close();
    });
});
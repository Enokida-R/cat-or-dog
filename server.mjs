import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
const port = 3000;

//クリック数を記録するための変数
let catClicks = 0;
let dogClicks = 0;

try{
    const data = JSON.parse(fs.readFile('clicks.json', 'utf8'));
    catClicks = data.catClicks;
    dogClicks = data.dogClicks;
} catch (error) {
    console.log('No previous data found, starting fresh.');
}

app.use(express.static('public')); //静的ファイル

app.get('/catimages', async (req, res) => {
    const responseCat = await fetch('https://api.thecatapi.com/v1/images/search?limit=9');
    const dataC = await responseCat.json();
    res.json(dataC);
});

app.get('/dogimages', async (req, res) => {
        const responseDog = await fetch('https://dog.ceo/api/breeds/image/random/6');
        const dataD = await responseDog.json();
        res.json(dataD);
    
});

//クリック数を記録するエンドポイント
app.get('/recordClick', (req, res) => {
    const animal = req.query.animal;
    if (animal === 'cat') catClicks++;
    else if(animal === 'dog') dogClicks++;

    fs.writeFileSync('clicks.json', JSON.stringify({ dogClicks, catClicks}));

    res.send('Click recoreded');
});

//クリック数を返すエンドポイント
app.get('/clickData', (req, res) => {
    res.json( {dogClicks, catClicks});
});

app.listen(port, () => {
    console.log(`Server runnig on http://localhost:${port}`);
});
/*const button = document.getElementById('button');
button.addEventListener('click', catImage());*/


document.getElementById('save-button').addEventListener('click', function() {
    const img = document.getElementById('modal-image');
    const imageUrl = img.src;

    // ダウンロードするためのリンク要素を作成
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'downloaded-image.jpg'; // ダウンロードされるファイルの名前

    // リンクをクリックしてダウンロードを実行
    downloadLink.click();
});

async function Catbutton () {
    const res = await fetch ('/catimages');
    const dataC = await res.json();
    const containerCat = document.getElementById('containerCat') || createImageContainerCat();
    containerCat.innerHTML = '';


    dataC.slice(0,6).forEach(item => {
        const imageUrl = item.url;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.style.flexBasis = '50%';
        containerCat.appendChild(imageElement);
        
        imageElement.addEventListener('click', () => {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'block';
        document.getElementById('modal-image').src = imageUrl;
    });
    });


    


    // モーダルウィンドウを閉じる処理
    const modal = document.getElementById('photo-modal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = "none";
    }


    // クリック数を記録
    recordClick('cat');

}

async function Dogbutton() {
    const containerDog = document.getElementById('containerDog') || createImageContainerDog();
    containerDog.innerHTML = '';
    const resD = await fetch ('/dogimages');
    const dataD = await resD.json();

    for (let i = 0; i < 6; i++) {
        const dogUrl = await dataD.message[i];
        const imageElement = document.createElement('img');
        imageElement.src = dogUrl;
        imageElement.style.flexBasis = '50%';
        containerDog.appendChild(imageElement);
        
        imageElement.addEventListener('click', () => {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'block';
        document.getElementById('modal-image').src = dogUrl;
    });

    }


    

    // モーダルウィンドウを閉じる処理
    const modal = document.getElementById('photo-modal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = "none";
    }


    // クリック数を記録
    recordClick('dog');
}


// クリック数を記録する関数
function recordClick(animal) {
    fetch(`/recordClick?animal=${animal}`).then(() => {
        // クリック数のデータを取得してグラフを更新
        fetchClickDataAndUpdateChart();
    });
}


// クリック数のデータを取得してグラフを更新する関数
function fetchClickDataAndUpdateChart() {
    fetch('/clickData')
        .then(response => response.json())
        .then(data => {
            updateChart([data.catClicks, data.dogClicks]);
        });
}


function createImageContainerCat () {
    const containerCat = document.createElement('div');
    containerCat.id = 'containerCat';
    containerCat.style.display = 'flex';
    containerCat.style.flexWrap = 'wrap';
    const section = document.getElementById('section');
    section.appendChild(containerCat);
    return containerCat;
}


function createImageContainerDog () {
    const containerDog = document.createElement('div');
    containerDog.id = 'containerDog';
    containerDog.style.display = 'flex';
    containerDog.style.flexWrap = 'wrap';
    const section = document.getElementById('section');
    section.appendChild(containerDog);
    return containerDog;
}


let containerCat = document.getElementById('containerCat');
let containerDog = document.getElementById('containerDog');

function deleteButtonCat() {
    if (!containerCat) {
        containerCat = document.getElementById('containerCat');
    }
    containerCat.innerHTML = '';
}

function deleteButtonDog() {
    if (!containerDog) {
        containerDog = document.getElementById('containerDog');
    }
    containerDog.innerHTML = '';
}

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',  // 'pie' に変更してパイチャートを作成することもできます
    data: {
        labels: ['dog', 'cat'],
        datasets: [{
            label: '# of Votes',
            data: [0, 0], // ここにデータを設定
            backgroundColor: [
                'rgba(0, 0, 128, 0.6)', // ネイビーブルー
                'rgba(128, 0, 32, 0.6)'  // バーガンディ
            ],
            borderColor: [
                'rgba(0, 0, 128, 1)', // ネイビーブルー
                'rgba(128, 0, 32, 1)'  // バーガンディ
            ],
            
            borderWidth: 1
        }]
    },
    
    
    
});

function updateChart(newData) {
    myChart.data.datasets[0].data = [newData[1], newData[0]]; // 新しいデータで更新
    myChart.update(); // チャートを更新
}

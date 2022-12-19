const videoArr = ['1 videos', '2 videos'];

const newArr = [];

let total = { videos: 0 };

const countVideos = (video) => [...video.matchAll(/(\d+)/g)].reduce((acc, match) => ({ ...acc, match: match[1] }), {});

videoArr.forEach((element) => {
    newArr.push(countVideos(element));
});

for (let i = 0; i < newArr.length; i++) {
    total.videos += parseInt(newArr[i].match);
}

console.log('total videos', total);
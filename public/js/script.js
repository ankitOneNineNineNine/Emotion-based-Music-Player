// var tf = require('@tensorflow/tfjs');

const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const retweet = document.getElementById("retweet");
const random = document.getElementById("random");
const timeInstance = document.getElementById("timeInstance");
const time = document.querySelector(".time");
const capture = document.querySelector(".capture");
var index = 0;
const obj = { height: 127, width: 127, y: 121, x: 431 }
var retw = false;
const songs = [{
        name: "aakash-1",
        title: "Love song",
        artist: "Aakash",
        src: "music/aakash-2.mp3",
    },
    {
        name: "aakash-1",
        title: "Love song1",
        artist: "Aakash1",
        src: "music/aakash-1.mp3",
    },
];
var playSongs = songs;
retweet.addEventListener("click", () => {
    retw = !retw;

    playSongs = retw ? [songs[index]] : songs;

});

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
random.addEventListener("click", () => {
    playSongs = shuffle(songs);
    console.log(playSongs);
});

function init() {
    music.src = playSongs[index].src;
    title.textContent = playSongs[index].title;
    artist.textContent = playSongs[index].artist;
    // playMusic();
}
let isPlaying = false;
next.addEventListener("click", () => {
    index = index + 1 > playSongs.length - 1 ? 0 : index + 1;
    init();
    playMusic();
});
prev.addEventListener("click", () => {
    index = index - 1 < 0 ? playSongs.length - 1 : index - 1;
    init();
    playMusic();
});
next.addEventListener("click", () => {
    index += 1;
    init();
    playMusic();
});
timeInstance.setAttribute("min", 0);
var modal = document.getElementById("myModal");

var btn = document.querySelector(".fa-grin-alt");
var file = document.querySelector('.file')
var camera = document.querySelector('.camera')
file.onclick = fileChoose;
var faceInterval;
var span = document.getElementsByClassName("close")[0];
var faceX, faceY, faceWidth, faceHeight;

function fileChoose() {
    document.getElementById('fileChoose').click();
}
btn.onclick = async function() {
    modal.style.display = "block";
};
camera.onclick = openCamera;

async function openCamera() {
    document.querySelector('.choose').style.display = 'none'
    var video = document.getElementById("video");
    var stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });
    video.srcObject = stream;
    window.stream = stream;
    document.querySelector('.openCamera').style.display = 'block'
}
span.onclick = function() {

    window.stream.getTracks().forEach(function(track) {
        track.stop();
    });
    video.src = "";
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

    if (event.target == modal) {
        video.srcObject = "";
        modal.style.display = "none";
    }
};

function formatTime(seconds) {
    var days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);
    var hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return minutes + ":" + parseInt(seconds);
}
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};
music.onloadedmetadata = () => {
    time.children[1].textContent = formatTime(music.duration);
    timeInstance.setAttribute("max", music.duration);
};
var heart = document.querySelector(".fa-heart");
heart.onclick = () => {
    if (!heart.style.color || heart.style.color === "black") {
        heart.style.color = "red";
    } else {
        heart.style.color = "black";
    }
};

play.addEventListener("click", () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

function changeSlider() {
    time.children[0].textContent = formatTime(music.currentTime);
    timeInstance.value = music.currentTime;
}

timeInstance.addEventListener("change", () => {
    if (music.currentTime === timeInstance.value) {
        pauseMusic();
    }
    music.currentTime = timeInstance.value;
});
music.addEventListener("timeupdate", () => changeSlider());
// window.onload = pauseMusic();
init();
var actualImage;
var cam;
var imageUri;
document.getElementById('fileChoose').addEventListener('change', (e) => {
    actualImage = e.target.files[0];
    cam = false
})
document.getElementById('done').onclick = sendImage
capture.onclick = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 150;
    canvas.height = 150;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    imageUri = canvas.toDataURL();

    window.stream.getTracks().forEach(function(track) {
        track.stop();
    });
    video.src = "";
    document.querySelector('.choose').style.display = 'block'
    document.querySelector('.openCamera').style.display = 'none'
    cam = true;

}
async function sendImage() {
    if (cam === 'undefined') {
        return;
    }
    if (cam) {
        axios({
                url: `http://localhost:8000/emotion`,
                method: 'POST',
                data: {
                    uri: imageUri,
                }
            }).then(data => {
                console.log('Emotion', data.data)
            })
            .catch(err => {
                console.log('error occured')
            })
    } else {
        var formData = new FormData();
        formData.append('img', actualImage);
        axios({
                url: `http://localhost:8000/emotion`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then(data => {
                console.log('Emotion', data.data)
            })
            .catch(err => {
                console.log('error occured')
            })
    }
}
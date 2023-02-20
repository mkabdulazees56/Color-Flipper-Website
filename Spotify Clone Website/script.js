
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');


let songs = [
    { songName: " Warriyo - Mortals [NCS Release]", filePath: 'songs/1.mp3', coverPath: 'images/covers/1.jpg' },
    { songName: " NDEAF KEV - Invincible [NCS Release]", filePath: 'songs/2.mp3', coverPath: 'images/covers/2.jpg' },
    { songName: " Different Heaven & EH!DE - My Heart ", filePath: 'songs/3.mp3', coverPath: 'images/covers/3.jpg' },
    { songName: " Janji-Heroes-Tonight-feat-Johnning", filePath: 'songs/4.mp3', coverPath: 'images/covers/4.jpg' },
    { songName: " Rabba - Salam-e-Ishq", filePath: 'songs/5.mp3', coverPath: 'images/covers/5.jpg' },
    { songName: " Sakhiyaan - Salam-e-Ishq", filePath: 'songs/6.mp3', coverPath: 'images/covers/6.jpg' },
    { songName: " Bhula Dena - Salam-e-Ishq ", filePath: 'songs/7.mp3', coverPath: 'images/covers/7.jpg' },
    { songName: " Tumhari Kasam - Salam-e-Ishq", filePath: 'songs/8.mp3', coverPath: 'images/covers/8.jpg' },
    { songName: " Na Jaana - Salam-e-Ishq", filePath: 'songs/9.mp3', coverPath: 'images/covers/9.jpg' },
    { songName: "Cielo - Huma-Huma", filePath: 'songs/10.mp3', coverPath: 'images/covers/10.jpg' }


]

// to load song name and cover photo 

songItems.forEach((e, i) => {
    e.getElementsByTagName("img")[0].src = songs[i].coverPath;
    e.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// master play / push buttons and gif 

masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle',);
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})


audioElement.addEventListener('timeupdate', () => {
    //upadate seek bar 
    progressBar = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progressBar;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    songItemPlay.forEach(e => {
        e.classList.remove('fa-pause-circle');
        e.classList.add('fa-play-circle');
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        masterPlay.classList.remove('fa-play-circle',);
        masterPlay.classList.add('fa-pause-circle');

        masterSongName.innerText = songs[songIndex].songName;
        if (audioElement.paused || audioElement <= 0) {
            
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity = 1;

        }
        else {
            
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;

        }



    })
})

document.getElementById('next').addEventListener('click', () => {

    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

})

document.getElementById('previous').addEventListener('click', () => {


    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

})
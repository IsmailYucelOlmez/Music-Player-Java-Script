var volumeBar=document.querySelector("#volume-bar");
var musicList=document.querySelector(".music-list");
var sound=document.querySelector("#audio");
var musicInfo=document.querySelector(".music-info-text");
var musicPicture=document.querySelector("#music-pic");
var playPauseButton=document.querySelector(".pause-play-button");
var durationText= document.querySelector(".duration");
var currentTimeText=document.querySelector(".current-time");
var progressBar=document.querySelector("#time-bar");
var musicListField=document.querySelector(".music-list");




const songs=[{

    songName:"Ateşten Gömlek",
      singer:"Sagopa Kajmer",
    musicImg:"./img/ateştenGömlek.jpg",
   musicPath:"./audio/ateştenGömlek.mp3"

},{

    songName:"Efkar",
      singer:"Gazapizm",
    musicImg:"./img/efkar.jpg",
   musicPath:"./audio/efkar.mp3"

},{

    songName:"Zahidem",
      singer:"Neşet Ertaş",
    musicImg:"./img/zahidem.jpg",
   musicPath:"./audio/zahidem.mp3"

}];

var currentIndex=0;
var currentSong=songs[currentIndex];


window.addEventListener("load",function(){

  loadSong();
  showMusicList();
  durationText.classList.add("hide");
  currentTimeText.textContent=calculateTime(audio.currentTime);

  
});

const loadSong=()=>{

  musicInfo.textContent=currentSong.songName+" - "+ currentSong.singer;
  musicPicture.src=currentSong.musicImg;
  sound.src=currentSong.musicPath;
  
  
}

playPauseButton.addEventListener("click",function(){

  playSong(this);
  durationText.classList.remove("hide");
  
});

const playSong=()=>{
  if(sound.paused){
    sound.play();  
    playPauseButton.firstElementChild.classList.remove("fa-play");
    playPauseButton.firstElementChild.classList.add("fa-pause");

  }else{
    sound.pause();
    playPauseButton.firstElementChild.classList.add("fa-play");
    playPauseButton.firstElementChild.classList.remove("fa-pause");
    
  }

}


const prevSong=()=>{

  currentIndex--;
  if(currentIndex<0){
    currentIndex=songs.length-1;   
  }

  currentSong=songs[currentIndex];
  loadSong();
  audio.play();
    
}

const nextSong=()=>{
  currentIndex++;
  if(currentIndex>songs.length-1){
    currentIndex=0;
  }

  currentSong=songs[currentIndex];
  loadSong();
  audio.play();
  
}

audio.addEventListener("timeupdate",()=>{

   updateAudioValue();
   
});

const updateAudioValue= () =>{

  progressBar.value=(100/audio.duration)*audio.currentTime;
  durationText.textContent=calculateTime(audio.duration);
  currentTimeText.textContent=calculateTime(audio.currentTime);
}

const calculateTime= (time)=>{

  var dakika=Math.floor(time / 60);
  var saniye=Math.floor(time % 60);
  saniye=saniye<10 ? "0"+saniye:saniye;
  dakika=dakika<10 ? "0"+dakika:dakika;
  var sonuc=dakika+":"+saniye;

  return sonuc;
}

var clickedPosition;

volumeBar.addEventListener("mousedown",(e)=>{
  
  clickedPosition=e.clientX - e.target.offsetLeft;
  audio.volume=clickedPosition/ e.target.offsetWidth

});

var songfield;

const showMusicList=()=>{

  for( let i=0;i<songs.length;i++){

    songfield=`<div onclick='changeviaList(${i})' class='song'><p class='song-text'>${songs[i].songName} -  ${songs[i].singer}</p> </div>`
    
    musicListField.insertAdjacentHTML("beforeend",songfield);
   
  }
}

const showList=()=>{
  musicList.classList.toggle("hide");  
  
}

const changeviaList=(number)=>{
 
  currentSong=songs[number];
  loadSong();
  audio.play(); 
  
}
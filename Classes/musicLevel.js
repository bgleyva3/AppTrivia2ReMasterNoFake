/*-------------- CÓMO FUNCIONA-----------------

// para reproducir indefinidamente:
// musicLevel.play(level);

// para detenerla:
// musicLevel.stop;

 ---------------------------------------------*/



const musicLevel = {
    play: (level)=>{
        let songName;
        switch (level){
            case 1:
                songName = "easy_song.mp3";
                break;
            case 2: 
                songName = "medium_song.mp3";
                break;
            case 3: 
                songName = "hard_song.mp3";
                break;
        }
        console.log(songName)
        const audioHTML = `<div>
                        <audio id="audio">
                            <source src="../sources/${songName}" type="audio/mp3">
                        </audio>
                     </div>`
        document.body.innerHTML += audioHTML;
        document.getElementById("audio").loop = true;
        
        audio.play(); 
    },
    stop: () => {
        document.getElementById("audio").remove();
        // document.getElementById("ole").remove();
    }
}

export default musicLevel;

/* let songName = "easy_song.mp3"
const audioHTML = `<div>
                        <audio id="audio">
                            <source src="../sources/${songName}" type="audio/mp3">
                        </audio>
                     </div>`
document.body.innerHTML += audioHTML;

let playMusic = 0;

function playPause(){
    if(playMusic === 0){
        playMusic = 1;
        audio.play();
    }else{
        playMusic = 0;
        audio.pause();
    }
} */

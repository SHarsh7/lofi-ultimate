import "./App.css";
import randomGif from "./components/randomGif";
import { FiPlay } from "react-icons/fi";
import { AiOutlinePause } from "react-icons/ai";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";

//Link of youtube api
const YOUTUBE_PLAYLIST_ITEMS_API = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLrG0ChxS2fPHLgql1GirP9GLhWRo_2L7K&maxResults=50&key=${process.env.REACT_APP_API_KEY}`;

//Set of video Ids from playlist
let videoId = [];

function App() {
  //To change the bankground
  const [gif, SetGif] = useState(randomGif[0]);
  //plyaer
  const [player, setPlayer] = useState(null);
  //to check state of player
  const [ready, setReady] = useState(false);
  //change the plying song
  const [curr, setCurr] = useState(`jFFnCSUdy9Y`);
  //plying or pause
  const [isPlaying,setIsPlaying]=useState(false
);

  //hook to change the bg on song change
  useEffect(() => {
    let rand = Math.floor(Math.random() * (randomGif.length + 1));
    SetGif(randomGif[rand]);
  }, [curr]);

  //hook to fetch data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}`);
      let data = await response.json();

      var regex = /[-[/\]{}()*+?.,\\^$|#]/g;
      data.items.map((obj) => {
        videoId.push({
          title: obj.snippet.title.split(regex)[0],
          code: obj.snippet.resourceId.videoId,
        });
      });
      setCurr(videoId[5]);
    }
    fetchData();
  }, []);

  const onReady = (event) => {
    setPlayer(event.target);
    setReady(true);
  };

  const onPlayVideo = () => {
    player.playVideo();
    setIsPlaying(true);
  };

  const onPauseVideo = () => {
    player.pauseVideo();
    setIsPlaying(false);
  };

  const onChangeVideo = () => {
    const rand = Math.floor(Math.random() * (50 + 1));
    setCurr(videoId[rand]);
    player.playVideo();
    onPlayVideo();
    setIsPlaying(true);
  };
  const opts = {
    height: '390',
    width: '640',
    playerVars: {

      autoplay: 1,
    }
  };

  return (
    <>
      <YouTube className="invisible" opts={opts} videoId={curr.code} onReady={onReady} onEnd={onChangeVideo} />
      <div
        className="App"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + `./assets/${gif}`})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          backgroundPosition: `center`,
        }}
      >
        <div className="container">
          <div className="child">
            {ready ? (
              <h2 className="typewriter">{curr.title}...</h2>
            ) : (
              <h2>Buffering...</h2>
            )}

            <button className="btn" onClick={onChangeVideo}>
              <MdOutlineSkipPrevious></MdOutlineSkipPrevious>
            </button>


            {
              isPlaying?(<button className="btn" onClick={onPauseVideo} disabled={!player}>
              <AiOutlinePause></AiOutlinePause>
            </button>) :
              ( <button className="btn" onClick={onPlayVideo}>
              <FiPlay></FiPlay>
            </button>)
            }
            
           
            
            <button className="btn" onClick={onChangeVideo}>
              <MdOutlineSkipNext></MdOutlineSkipNext>
            </button>

            {/* <VolumeBar></VolumeBar> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

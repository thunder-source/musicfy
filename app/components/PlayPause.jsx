import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, handlePlay, handlePause, song }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
      size={35}
      className='text-gray-300 hover:scale-110'
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className='text-gray-300 hover:scale-110'
      onClick={handlePlay}
    />
  );

export default PlayPause;

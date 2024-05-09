import { useAppSelector } from '@/hooks/reduxHandlers';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = () => {
  const { activeSong, isActive, isPlaying } = useAppSelector(
    (state) => state.player
  );

  return isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
      size={35}
      className='text-gray-300 hover:scale-125 transform transition duration-500'
      // onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className='text-gray-300 hover:scale-125 transform transition duration-500'
      // onClick={handlePlay}
    />
  );
};
export default PlayPause;

import { useAppSelector } from '@/hooks/reduxHandlers';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = () => {
  const { activeSong, isActive, isPlaying } = useAppSelector((state) => state.player);

  return isPlaying ? (
    <FaPauseCircle
      size={35}
      className="transform text-gray-300 transition duration-500 hover:scale-125"
      // onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="transform text-gray-300 transition duration-500 hover:scale-125"
      // onClick={handlePlay}
    />
  );
};
export default PlayPause;

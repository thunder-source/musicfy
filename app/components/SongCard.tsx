import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // const stringWithText = "Your string with (From 'text1') and (From 'text2')";
  const cleanedName = song.name.replace(/\(From\s"[^"]+"\)/g, '');

  console.log(cleanedName);
  // Output: Your string with and

  return song.image[2].url === undefined ? (
    <></>
  ) : (
    <div className='flex flex-col w-[250px] p-4 bg-accent_9  animate-slideup rounded-radius_6 cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <Avatar
          className='w-full h-56 rounded-radius_6'
          src={song.image[2].url}
          fallback={song?.name}
        />
        <div className='w-full h-full absolute rounded-radius_6 left-0 top-0 backdrop:blur-3xl  group-hover:backdrop-blur-sm group-hover:bg-accent_a2 '></div>
        <p className='group-hover:block hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            // song={}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </p>
      </div>
      <div className='mt-4 flex-col'>
        <p className='font-semibold text-base text-white truncate'>
          <Link href={`/songs/${song?.key}`}> {cleanedName}</Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link
            href={
              song.artist
                ? `/artists/${song?.artist[0]?.adamid}`
                : '/top-artists'
            }>
            {song?.artists?.all[0].name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;

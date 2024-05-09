import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { RemoveLikedSong, addLikedSong } from '@/redux/features/mainSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useAppDispatch();
  const likedSongs = useAppSelector((state) => state.main.likedSongs);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  console.log(likedSongs);

  // const stringWithText = "Your string with (From 'text1') and (From 'text2')";
  const cleanedName = song.name.replace(/\(From\s"[^"]+"\)/g, '');

  return (
    <div className='flex flex-col w-[250px] p-4 bg-accent_a7 border-accent_a2 border-2 animate-slideup rounded-radius_6 group '>
      <div className='relative w-full h-56 overflow-hidden  rounded-radius_6'>
        <Avatar
          className='w-full relative h-56 rounded-radius_6 group-hover:scale-125 overflow-hidden transform transition duration-500'
          src={song.image[2].url}
          fallback={song?.name}
        />
        <div className='w-full h-full  absolute rounded-radius_6 left-0 top-0 backdrop:blur-3xl  group-hover:backdrop-blur-sm group-hover:bg-accent_a2 '></div>
        <p className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            // song={}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </p>
        {/* <Button
              className='group-hover:block hidden absolute right-4 bottom-4 px-0'
              variant='soft'
              radius='full'>
              <PiDotsThreeCircleBold className=' w-8 h-8  text-accent_8' />
              <DropdownMenu.TriggerIcon />
            </Button> */}
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className='mt-4 flex-col'>
          <p className='font-semibold text-base w-full max-w-[180px] truncate'>
            <Link href={`/songs/${song?.key}`}>{cleanedName}</Link>
          </p>
          <p className='text-sm truncate  mt-1'>
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
        <div className='relative flex items-center justify-center h-10 w-10 mt-2 '>
          <div
            onClick={() => {
              if (!likedSongs?.[song.id]) {
                return dispatch(addLikedSong(song.id));
              } else {
                return dispatch(RemoveLikedSong(song.id));
              }
            }}
            className='w-8 h-8 rounded-full cursor-pointer relative z-10'></div>
          <div
            className={`heart absolute peer-hover:scale-150  m-auto -translate-y-1/2 top-1/2  -translate-x-1/2 left-1/2 ${
              likedSongs?.[song.id] && 'is-active'
            } `}></div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;

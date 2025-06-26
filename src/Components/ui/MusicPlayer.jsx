// import React, { useRef, useState, useEffect } from 'react';

// const playlist = [
//   { src: '/audio/1.mp3', title: 'Track 1' },
//   { src: '/audio/2.mp3', title: 'Track 2' },
//   { src: '/audio/3.mp3', title: 'Track 3' },
//   { src: '/audio/4.mp3', title: 'Track4' },
// ];

// export default function MusicPlayer() {
//   const audioRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(0.5);

//   const currentTrack = playlist[currentTrackIndex];

//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     if (playing) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setPlaying(!playing);
//   };

//   const playNext = () => {
//     const nextIndex = (currentTrackIndex + 1) % playlist.length;
//     setCurrentTrackIndex(nextIndex);
//   };

//   const playPrev = () => {
//     const prevIndex =
//       (currentTrackIndex - 1 + playlist.length) % playlist.length;
//     setCurrentTrackIndex(prevIndex);
//   };

//   const handleEnded = () => {
//     playNext();
//   };

//   const handleTimeUpdate = () => {
//     if (!audioRef.current) return;
//     const percent =
//       (audioRef.current.currentTime / audioRef.current.duration) * 100;
//     setProgress(percent || 0);
//   };

//   const handleVolumeChange = (e) => {
//     const vol = parseFloat(e.target.value);
//     setVolume(vol);
//     if (audioRef.current) {
//       audioRef.current.volume = vol;
//     }
//   };

//   const handleProgressClick = (e) => {
//     if (!audioRef.current) return;
//     const rect = e.target.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickPercent = clickX / rect.width;
//     audioRef.current.currentTime = clickPercent * audioRef.current.duration;
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//       audioRef.current.addEventListener('ended', handleEnded);
//       audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
//     }
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.removeEventListener('ended', handleEnded);
//         audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
//       }
//     };
//   }, [currentTrackIndex, volume]);

//   useEffect(() => {
//     if (playing && audioRef.current) {
//       audioRef.current.play();
//     }
//   }, [currentTrackIndex]);

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         bottom: 20,
//         right: 20,
//         background: '#111',
//         color: 'white',
//         padding: '12px 16px',
//         borderRadius: 8,
//         zIndex: 9999,
//         width: 100,
//       }}
//     >
//       {/* <div style={{ marginBottom: 8 }}>{currentTrack.title}</div> */}

//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           marginBottom: 8,
//         }}
//       >
//         <button onClick={playPrev}>⏮</button>
//         <button onClick={togglePlay}>{playing ? '⏸' : '▶️'}</button>
//         <button onClick={playNext}>⏭</button>
//       </div>

//       <div
//         style={{
//           height: 6,
//           background: '#555',
//           borderRadius: 4,
//           cursor: 'pointer',
//           marginBottom: 8,
//         }}
//         onClick={handleProgressClick}
//       >
//         <div
//           style={{
//             height: '100%',
//             width: `${progress}%`,
//             background: '#0af',
//             borderRadius: 4,
//           }}
//         />
//       </div>

//       <input
//         type="range"
//         min="0"
//         max="1"
//         step="0.01"
//         value={volume}
//         onChange={handleVolumeChange}
//         style={{ width: '100%' }}
//       />

//       <audio ref={audioRef} src={currentTrack.src} />
//     </div>
//   );
// }

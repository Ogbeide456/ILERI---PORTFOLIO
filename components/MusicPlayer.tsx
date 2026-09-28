'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── Track list with direct audio preview streams & Spotify IDs ── */
interface Track {
  title: string;
  artist: string;
  spotifyId: string;
  audioUrl: string;
}

const TRACKS: Track[] = [
  {
    title: 'WORSHIP',
    artist: 'Asake & DJ Snake',
    spotifyId: '6jS3JpB381v102D7h67W9e',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/6f/08/a2/6f08a28c-34f6-dc98-8192-04f025942919/mzaf_6670976430343236694.plus.aac.p.m4a',
  },
  {
    title: 'Not Afraid',
    artist: 'Eminem',
    spotifyId: '7i75nS9R77H7B20fD24c0C',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b6/21/78/b621784d-2e8c-66a7-faa0-82ab4c710cf8/mzaf_14978944816671452874.plus.aac.p.m4a',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    spotifyId: '7gznBM4p9W1Vd3835s66Jq',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/18/d9/ab18d9e9-01f0-27ea-3a51-6e08585a0072/mzaf_14299744081264843911.plus.aac.p.m4a',
  },
  {
    title: 'Stand Strong',
    artist: 'Davido ft. Sunday Service Choir',
    spotifyId: '66H8Z654i1s9WqK79pT53G',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fb/03/fc/fb03fc6d-b1d5-31fc-7068-bf73ee0c3cd4/mzaf_9357421276349691973.plus.aac.p.m4a',
  },
  {
    title: 'Destiny',
    artist: 'Burna Boy',
    spotifyId: '6E6FNz4Z3Qk5JmS7K9n2Pz',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/01/94/bd/0194bdc6-a900-3c0c-4e40-e605cb0077d1/mzaf_11593952503487593552.plus.aac.p.m4a',
  },
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    spotifyId: '3CRdbSIZ4r5sZ0YwxS2Yp2',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a9/74/e8/a974e8f2-0693-9371-bb6c-87047a486254/mzaf_1898989387861959316.plus.aac.p.m4a',
  },
  {
    title: 'Invisible',
    artist: 'Julius Dreisig & Zeus x Crona',
    spotifyId: '2BgagqJWYfrKPhz3f5V0Sw',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/04/81/9f/04819fa3-1484-7466-fab7-c6ffdaabb16d/mzaf_14927578116186893531.plus.aac.p.m4a',
  },
  {
    title: 'Diamonds',
    artist: 'Rihanna',
    spotifyId: '11iU806M7hYn481cWkF9jS',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/26/97/fb/2697fb36-8ef2-9d18-0a2e-6545947b4445/mzaf_9032202105098805603.plus.aac.p.m4a',
  },
  {
    title: 'Children of the Internet',
    artist: 'Future Utopia & Dave',
    spotifyId: '3zts4K1p6u0460Z5sL0U55',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b4/a1/4a/b4a14a0f-0915-fc09-ea2c-6c7eabac5b67/mzaf_2455900788467596499.plus.aac.p.m4a',
  },
  {
    title: 'All Night Long',
    artist: 'Alex Moretto',
    spotifyId: '33Q2dG6o3J9d3L6z9K0U9E',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/82/8d/dd/828ddd3e-e7a4-c7b6-e13b-6083b5048c7d/mzaf_4555396280093512168.plus.aac.p.m4a',
  },
];

/* ── SVG Icons ─────────────────────────────────────────────────── */
const PrevIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="19 20 9 12 19 4 19 20" fill="currentColor" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </svg>
);

const NextIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);

const PauseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" rx="1.5" />
    <rect x="14" y="4" width="4" height="16" rx="1.5" />
  </svg>
);

const PlayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const VolumeDownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <line x1="19" y1="12" x2="23" y2="12" strokeWidth="2.5" />
  </svg>
);

const VolumeUpIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeMuteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const MusicNoteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" fill="currentColor" />
    <circle cx="18" cy="16" r="3" fill="currentColor" />
  </svg>
);

const SpotifyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

/* ── Main MusicPlayer Component ────────────────────────────────── */
export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0); // Current song index
  const [isPlaying, setIsPlaying] = useState(false); // Play/pause state
  const [volume, setVolume] = useState(0.75); // 75% default volume
  const [isMuted, setIsMuted] = useState(false); // Mute state
  const [prevVolume, setPrevVolume] = useState(0.75); // Previous volume before mute
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(30); // song duration
  const [isVisible, setIsVisible] = useState(false); // Whether the widget is visible
  const [isFaded, setIsFaded] = useState(false); // Whether the widget is faded
  const [isOnline, setIsOnline] = useState(true); // Whether the user is online
  const [needsGesture, setNeedsGesture] = useState(false); // Whether the widget needs user interaction

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const track = TRACKS[currentIndex];

  /* ── Check network status on mount ──────────────────────────── */
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /* ── Helper to schedule 6-second fade out ───────────────────── */
  const scheduleFadeOut = useCallback(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      setIsFaded(true);
    }, 6000); // Fades out after 6s of playing
  }, []);

  /* ── Attempt audio playback with Autoplay Policy handling ────── */
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsGesture(false);
      })
      .catch((err) => {
        // Autoplay policy prevented playback until first user interaction
        console.warn('Autoplay waiting for user gesture:', err.message);
        setNeedsGesture(true);
        setIsPlaying(false);
      });
  }, [volume, isMuted]);

  /* ── Initial mount: pop widget into view & start playback ─────── */
  useEffect(() => {
    if (!isOnline) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      startPlayback();
      scheduleFadeOut();
    }, 600);

    return () => clearTimeout(timer);
  }, [isOnline, startPlayback, scheduleFadeOut]);

  /* ── Listen for first interaction if autoplay was blocked ─────── */
  useEffect(() => {
    if (!needsGesture) return;

    const handleUserGesture = () => {
      if (needsGesture && audioRef.current) {
        startPlayback();
      }
    };

    window.addEventListener('click', handleUserGesture, { once: true });
    window.addEventListener('keydown', handleUserGesture, { once: true });
    window.addEventListener('touchstart', handleUserGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };
  }, [needsGesture, startPlayback]);

  /* ── Track switch effect: ONLY runs when currentIndex changes ─── */
  /* CRITICAL: Does NOT re-run on hover, so song NEVER restarts! ─── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = TRACKS[currentIndex].audioUrl;
    audio.load();
    setCurrentTime(0);

    // Pop the widget back into view on song change, then fade after 6s
    setIsFaded(false);
    scheduleFadeOut();

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsGesture(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setNeedsGesture(true);
      });
  }, [currentIndex, scheduleFadeOut]);

  /* ── Sync audio volume when state changes ─────────────────────── */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  /* ── Audio time update & auto-advance ────────────────────────── */
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleTrackEnded = () => {
    // Automatically transition to the next song when current track ends
    setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
  };

  /* ── Track Controls ──────────────────────────────────────────── */
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();//stop the event from bubbling up to the parent element. prevent the header component from handling the event.
    setCurrentIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();//stop the event from bubbling up to the parent element. prevent the header component from handling the event.
    setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
  };

  /* Toggle play/pause */
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); //stop the event from bubbling up to the parent element. prevent the header component from handling the event.
    const audio = audioRef.current;
    if (!audio) return;

    /* If the audio is playing, pause it. If it's paused, play it. */
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          setNeedsGesture(true);
        });
    }
  };

  /* ── Volume Controls ─────────────────────────────────────────── */
  const handleVolumeDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVolume((prev) => {
      const next = Math.max(0, Math.round((prev - 0.1) * 10) / 10);
      if (audioRef.current) audioRef.current.volume = next;
      if (next === 0) setIsMuted(true);
      return next;
    });
  };

  /* Volume up */
  const handleVolumeUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVolume((prev) => {
      const next = Math.min(1, Math.round((prev + 0.1) * 10) / 10); // Math.min(1, ...) ensures that the volume does not exceed 1 (100%).
      if (audioRef.current) audioRef.current.volume = next; // Update the audio element's volume to the new value.
      if (isMuted) setIsMuted(false); // If the audio was muted, unmute it.
      return next; // Return the new volume value.
    });
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      const restored = prevVolume > 0 ? prevVolume : 0.5;
      setVolume(restored);
      if (audioRef.current) audioRef.current.volume = restored;
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  /* ── Hover handlers: Show fully back, NEVER interrupt playback ── */
  const handleMouseEnter = () => {
    setIsFaded(false);
    // Cancel fade-out timer while user is hovering
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Resume 12-second fade-out after user stops hovering
    scheduleFadeOut();
  };

  /* ── Don't render if offline ─────────────────────────────────── */
  if (!isOnline) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : Math.round(volume * 100);

  return (
    <>
      {/* Hidden standard HTML5 audio element with native sound & volume control */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />

      {/* Floating music player widget (fixed in header section below navbar) */}
      <aside
        id="music-player"
        aria-label="Background Music Player"
        className={`music-player${isVisible ? ' music-player--visible' : ''}${isFaded ? ' music-player--faded' : ''
          }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header row: Spotify badge + External link + Music note icon */}
        <div className="music-player__header">
          <div className="music-player__left">
            <span className={`music-player__icon${isPlaying ? ' music-player__icon--pulsing' : ''}`}>
              <MusicNoteIcon />
            </span>
            <div className="music-player__text">
              <span className="music-player__title" title={track.title}>
                {track.title}
              </span>
              <span className="music-player__artist" title={track.artist}>
                {track.artist}
              </span>
            </div>
          </div>

          <a
            href={`https://open.spotify.com/track/${track.spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="music-player__spotify-link"
            title="Listen to full track on Spotify"
            onClick={(e) => e.stopPropagation()}
          >
            <SpotifyIcon />
            <span className="music-player__spotify-text">Spotify</span>
          </a>
        </div>

        {/* If autoplay was blocked by browser, show a prompt indicator */}
        {needsGesture && !isPlaying && (
          <div className="music-player__gesture-hint" onClick={togglePlay}>
            <span>▶ Click anywhere to play audio</span>
          </div>
        )}

        {/* Interactive Controls (Rewind, Play/Pause, Fast Forward, Volume Down, Volume Up, Mute) */}
        <div className="music-player__controls">
          <div className="music-player__playback-btns">
            <button
              type="button"
              className="music-player__btn"
              onClick={handlePrev}
              aria-label="Previous song (Rewind)"
              title="Previous song (Rewind)"
            >
              <PrevIcon />
            </button>

            <button
              type="button"
              className="music-player__btn music-player__btn--play"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause song' : 'Play song'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              type="button"
              className="music-player__btn"
              onClick={handleNext}
              aria-label="Next song (Fast forward)"
              title="Next song (Fast forward)"
            >
              <NextIcon />
            </button>
          </div>

          {/* Volume controls group: Reduce volume, Increase volume, Mute toggle & volume level */}
          <div className="music-player__volume-group">
            <button
              type="button"
              className="music-player__btn music-player__btn--volume"
              onClick={handleVolumeDown}
              aria-label="Reduce volume"
              title="Reduce volume (-10%)"
            >
              <VolumeDownIcon />
            </button>

            <button
              type="button"
              className="music-player__btn music-player__btn--volume"
              onClick={handleVolumeUp}
              aria-label="Increase volume"
              title="Increase volume (+10%)"
            >
              <VolumeUpIcon />
            </button>

            <button
              type="button"
              className={`music-player__btn music-player__btn--volume${isMuted ? ' music-player__btn--muted' : ''}`}
              onClick={handleToggleMute}
              aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeMuteIcon /> : <VolumeDownIcon />}
            </button>

            <span className="music-player__vol-label" title={`Volume: ${volumePercent}%`}>
              {volumePercent}%
            </span>
          </div>
        </div>

        {/* Progress bar matching the song playback */}
        <div className="music-player__progress" aria-hidden="true">
          <div
            className="music-player__progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </aside>
    </>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type VideoItem = {
  id: string;
  videoId?: string;
  caption: string;
  timestamp: string;
  videoUrl: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  permalink?: string;
  platform?: 'youtube' | 'file';
};

type ApiResponse = {
  videos: VideoItem[];
  error?: string;
};

const VIDEOS_PER_PAGE = 6;

function formatDate(value: string) {
  if (!value) return 'Date unavailable';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function getTitle(video?: VideoItem | null) {
  if (!video?.caption) return 'YouTube video';
  const firstLine = video.caption.split('\n').map((s) => s.trim()).find(Boolean);
  return firstLine || 'YouTube video';
}

function getDescription(video?: VideoItem | null) {
  if (!video?.caption) return '';
  const lines = video.caption.split('\n').map((s) => s.trim()).filter(Boolean);
  if (lines.length <= 1) return '';
  return lines.slice(1).join(' ');
}

function getYouTubeId(video?: VideoItem | null): string | null {
  if (!video) return null;
  if (video.videoId) return video.videoId;
  const src = video.embedUrl || video.videoUrl || '';
  const m = src.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function loadYouTubeApi(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
  const w = window as any;
  if (w.YT && w.YT.Player) return Promise.resolve(w.YT);
  if (w.__ytApiPromise) return w.__ytApiPromise;
  w.__ytApiPromise = new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve(w.YT);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  });
  return w.__ytApiPromise;
}

const IconPlay = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10-6.5-10-6.5z" /></svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z" /></svg>
);
const IconNext = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7 6l8.5 6L7 18V6zm9 0h2v12h-2V6z" /></svg>
);
const IconPrev = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M17 6v12l-8.5-6L17 6zM6 6h2v12H6V6z" /></svg>
);
const IconRewind = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 19l-8-7 8-7v14z" /><path d="M21 19l-8-7 8-7v14z" />
    <text x="7.2" y="14.2" fontSize="6" fill="currentColor" stroke="none">10</text>
  </svg>
);
const IconForward = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 5l8 7-8 7V5z" /><path d="M3 5l8 7-8 7V5z" />
    <text x="10.2" y="14.2" fontSize="6" fill="currentColor" stroke="none">10</text>
  </svg>
);
const IconVolumeUp = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7" /><path d="M18.5 5.5a9 9 0 010 13" />
  </svg>
);
const IconVolumeDown = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7" />
  </svg>
);
const IconMute = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);
const IconFullscreen = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 3H5a2 2 0 00-2 2v3" /><path d="M16 3h3a2 2 0 012 2v3" /><path d="M8 21H5a2 2 0 01-2-2v-3" /><path d="M16 21h3a2 2 0 002-2v-3" />
  </svg>
);
const IconLoop = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);
const IconQuality = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 15V9h2.5a2 2 0 010 4H7" /><path d="M14 15V9h2a3 3 0 010 6h-2z" />
  </svg>
);
const IconSpeed = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="13" r="8" /><path d="M12 13l3-3" /><path d="M12 5v2" />
  </svg>
);
const IconPlayOverlay = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10-6.5-10-6.5z" /></svg>
);

export default function InstagramVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [loop, setLoop] = useState(false);
  const [availableRates, setAvailableRates] = useState<number[]>([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
  const [availableQualities, setAvailableQualities] = useState<string[]>(['auto']);
  const [controlsVisible, setControlsVisible] = useState(true);

  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const ytHostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const pollRef = useRef<number | null>(null);
  const hideControlsTimer = useRef<number | null>(null);
  const loopRef = useRef(loop);
  const currentIndexRef = useRef(currentIndex);

  loopRef.current = loop;
  currentIndexRef.current = currentIndex;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/instagram-videos');
        const data: ApiResponse = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data.videos) ? data.videos : [];
        setVideos(list);
        setError(data.error || null);
        setCurrentIndex(0);
        setPage(1);
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load videos.');
          setVideos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const totalPages = Math.max(1, Math.ceil(videos.length / VIDEOS_PER_PAGE));
  const currentVideo = videos[currentIndex];
  const currentYouTubeId = getYouTubeId(currentVideo);
  const isYouTube = Boolean(currentYouTubeId);

  useEffect(() => {
    if (videos.length === 0) return;
    const newPage = Math.floor(currentIndex / VIDEOS_PER_PAGE) + 1;
    setPage((p) => (p === newPage ? p : newPage));
  }, [currentIndex, videos.length]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const stopPolling = () => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const destroyYouTubePlayer = () => {
    stopPolling();
    const p = ytPlayerRef.current;
    ytPlayerRef.current = null;
    if (p && typeof p.destroy === 'function') {
      try { p.destroy(); } catch {}
    }
    // React does not own children of ytHostRef; safe to clear any leftovers.
    if (ytHostRef.current) {
      try { ytHostRef.current.innerHTML = ''; } catch {}
    }
  };

  const startPolling = () => {
    stopPolling();
    pollRef.current = window.setInterval(() => {
      const p = ytPlayerRef.current;
      if (!p) return;
      try {
        if (typeof p.getCurrentTime === 'function') setCurrentTime(p.getCurrentTime() || 0);
        if (typeof p.getDuration === 'function') setDuration(p.getDuration() || 0);
        if (typeof p.getVolume === 'function') setVolume(Math.round(p.getVolume()));
        if (typeof p.isMuted === 'function') setMuted(!!p.isMuted());
        if (typeof p.getPlaybackRate === 'function') setPlaybackRate(p.getPlaybackRate());
        if (typeof p.getPlaybackQuality === 'function') setQuality(p.getPlaybackQuality() || 'auto');
      } catch {}
    }, 300);
  };

  useEffect(() => {
    if (!isYouTube || !currentYouTubeId) {
      destroyYouTubePlayer();
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const YT = await loadYouTubeApi();
        if (cancelled || !ytHostRef.current) return;

        // Recreate player cleanly to avoid React/YT DOM conflicts.
        destroyYouTubePlayer();
        const mountEl = document.createElement('div');
        mountEl.className = 'youtube-player-inner';
        ytHostRef.current.appendChild(mountEl);

        ytPlayerRef.current = new YT.Player(mountEl, {
          videoId: currentYouTubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
          },
          events: {
            onReady: (e: any) => {
              if (cancelled) return;
              try {
                const rates = e?.target?.getAvailablePlaybackRates?.();
                if (Array.isArray(rates) && rates.length) setAvailableRates(rates);
                const quals = e?.target?.getAvailableQualityLevels?.();
                if (Array.isArray(quals) && quals.length) setAvailableQualities(['auto', ...quals.filter((q: string) => q !== 'auto')]);
                setDuration(e?.target?.getDuration?.() || 0);
              } catch {}
              startPolling();
            },
            onStateChange: (e: any) => {
              const state = e?.data;
              const YTState = (window as any).YT?.PlayerState || {};
              if (state === YTState.PLAYING) setIsPlaying(true);
              else if (state === YTState.PAUSED || state === YTState.CUED) setIsPlaying(false);
              else if (state === YTState.ENDED) {
                setIsPlaying(false);
                if (loopRef.current && ytPlayerRef.current) {
                  try { ytPlayerRef.current.seekTo(0, true); ytPlayerRef.current.playVideo(); } catch {}
                }
              }
            },
          },
        });
      } catch (e) {
        // If YT API fails, keep UI usable with grid/permalink.
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYouTubeId, isYouTube]);

  useEffect(() => {
    return () => {
      destroyYouTubePlayer();
      if (hideControlsTimer.current) window.clearTimeout(hideControlsTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // native video sync
  useEffect(() => {
    const v = videoRef.current;
    if (!v || isYouTube) return;
    v.volume = volume / 100;
    v.muted = muted;
    v.playbackRate = playbackRate;
    v.loop = loop;
  }, [volume, muted, playbackRate, loop, isYouTube, currentIndex]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setControlsVisible(true);
  }, [currentIndex]);

  const pokeControls = () => {
    setControlsVisible(true);
    if (hideControlsTimer.current) window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = window.setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 2500);
  };

  useEffect(() => {
    if (!isPlaying) setControlsVisible(true);
  }, [isPlaying]);

  const goNext = () => { if (videos.length) setCurrentIndex((i) => (i + 1) % videos.length); };
  const goPrev = () => { if (videos.length) setCurrentIndex((i) => (i - 1 + videos.length) % videos.length); };
  const selectVideo = (idx: number) => {
    setCurrentIndex(idx);
    requestAnimationFrame(() => playerContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const togglePlay = async () => {
    if (isYouTube) {
      const p = ytPlayerRef.current;
      if (!p) return;
      try {
        const state = p.getPlayerState?.();
        const YTState = (window as any).YT?.PlayerState || {};
        if (state === YTState.PLAYING) p.pauseVideo();
        else p.playVideo();
      } catch {}
      pokeControls();
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { try { await v.play(); } catch {} } else { v.pause(); }
    pokeControls();
  };

  const seekBy = (delta: number) => {
    if (isYouTube) {
      const p = ytPlayerRef.current;
      if (!p) return;
      try {
        const cur = p.getCurrentTime?.() || 0;
        const dur = p.getDuration?.() || 0;
        const next = Math.min(Math.max(0, cur + delta), dur || cur + delta);
        p.seekTo(next, true);
        setCurrentTime(next);
      } catch {}
      pokeControls();
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    const next = Math.min(Math.max(0, v.currentTime + delta), Number.isFinite(v.duration) ? v.duration : v.currentTime + delta);
    v.currentTime = next;
    setCurrentTime(next);
    pokeControls();
  };

  const onSeek = (value: number) => {
    if (isYouTube) {
      const p = ytPlayerRef.current;
      if (!p) return;
      try { p.seekTo(value, true); setCurrentTime(value); } catch {}
      pokeControls();
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = value;
    setCurrentTime(value);
    pokeControls();
  };

  const changeVolume = (delta: number) => {
    const next = Math.min(100, Math.max(0, volume + delta));
    setVolume(next);
    setMuted(next === 0);
    if (isYouTube) {
      const p = ytPlayerRef.current;
      try {
        if (next === 0) p?.mute?.();
        else { p?.unMute?.(); p?.setVolume?.(next); }
      } catch {}
    } else if (videoRef.current) {
      videoRef.current.volume = next / 100;
      videoRef.current.muted = next === 0;
    }
    pokeControls();
  };

  const toggleMute = () => {
    if (isYouTube) {
      const p = ytPlayerRef.current;
      if (!p) return;
      try {
        if (p.isMuted?.()) { p.unMute(); setMuted(false); }
        else { p.mute(); setMuted(true); }
      } catch {}
      pokeControls();
      return;
    }
    setMuted((m) => !m);
    pokeControls();
  };

  const onPlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (isYouTube) { try { ytPlayerRef.current?.setPlaybackRate?.(rate); } catch {} }
    else if (videoRef.current) { videoRef.current.playbackRate = rate; }
    pokeControls();
  };

  const onQualityChange = (q: string) => {
    setQuality(q);
    if (isYouTube) { try { ytPlayerRef.current?.setPlaybackQuality?.(q); } catch {} }
    pokeControls();
  };

  const toggleFullscreen = async () => {
    const container = playerContainerRef.current;
    if (!container) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await container.requestFullscreen?.();
    } catch {}
    pokeControls();
  };

  const formatTime = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const pageStart = (page - 1) * VIDEOS_PER_PAGE;
  const pageVideos = videos.slice(pageStart, pageStart + VIDEOS_PER_PAGE);
  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  if (loading) return <div className="videos-status">Loading videos...</div>;

  if (!currentVideo) {
    return (
      <div className="videos-status videos-status-error">
        <p>No videos are available to display right now.</p>
        {error ? <p className="videos-status-detail">{error}</p> : null}
      </div>
    );
  }

  const currentTitle = getTitle(currentVideo);
  const currentDescription = getDescription(currentVideo);
  const qualities = availableQualities.length ? availableQualities : ['auto'];
  const rates = availableRates.length ? availableRates : [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="youtube-videos-section">
      <div className="video-player-shell video-watch-shell" ref={playerContainerRef}>
        <div
          className={`video-stage video-stage-interactive ${controlsVisible ? 'controls-visible' : 'controls-hidden'}`}
          onMouseMove={pokeControls}
          onMouseLeave={() => { if (isPlaying) setControlsVisible(false); }}
          onTouchStart={pokeControls}
        >
          {isYouTube ? (
            <div ref={ytHostRef} className="youtube-player-mount" />
          ) : (
            <video
              key={currentVideo.id || currentIndex}
              ref={videoRef}
              className="instagram-video-el"
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnailUrl}
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onTimeUpdate={() => {
                const v = videoRef.current; if (!v) return;
                setCurrentTime(v.currentTime || 0); setDuration(v.duration || 0);
              }}
              onLoadedMetadata={() => {
                const v = videoRef.current; if (!v) return;
                setDuration(v.duration || 0);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                if (loop) { try { videoRef.current?.play(); } catch {} }
              }}
            />
          )}

          {!isPlaying ? (
            <button type="button" className="video-center-play" onClick={togglePlay} aria-label="Play video">
              <IconPlay />
            </button>
          ) : null}

          <div className="video-controls-overlay">
            <div className="video-progress-row">
              <span className="video-time">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="video-seek"
                aria-label="Seek video"
              />
              <span className="video-time">{formatTime(duration)}</span>
            </div>

            <div className="video-controls" aria-label="Video controls">
              <div className="video-controls-group">
                <button type="button" className="video-control-btn" onClick={goPrev} title="Previous video" aria-label="Previous video"><IconPrev /></button>
                <button type="button" className="video-control-btn" onClick={() => seekBy(-10)} title="Rewind 10 seconds" aria-label="Rewind 10 seconds"><IconRewind /></button>
                <button type="button" className={`video-control-btn video-control-btn-play ${isPlaying ? 'is-pause' : 'is-play'}`} onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'} aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <IconPause /> : <IconPlay />}
                </button>
                <button type="button" className="video-control-btn" onClick={() => seekBy(10)} title="Fast forward 10 seconds" aria-label="Fast forward 10 seconds"><IconForward /></button>
                <button type="button" className="video-control-btn" onClick={goNext} title="Next video" aria-label="Next video"><IconNext /></button>
              </div>

              <div className="video-controls-group">
                <button type="button" className="video-control-btn" onClick={() => changeVolume(-10)} title="Decrease volume" aria-label="Decrease volume"><IconVolumeDown /></button>
                <button type="button" className="video-control-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'} aria-label={muted ? 'Unmute' : 'Mute'}>
                  {muted || volume === 0 ? <IconMute /> : volume < 50 ? <IconVolumeDown /> : <IconVolumeUp />}
                </button>
                <button type="button" className="video-control-btn" onClick={() => changeVolume(10)} title="Increase volume" aria-label="Increase volume"><IconVolumeUp /></button>
                <span className="video-volume-label" aria-label="Volume level">{muted ? 'Muted' : `${volume}%`}</span>
              </div>

              <div className="video-controls-group">
                <label className="video-select-control" title="Playback speed">
                  <span className="video-select-icon"><IconSpeed /></span>
                  <select aria-label="Playback speed" value={playbackRate} onChange={(e) => onPlaybackRateChange(Number(e.target.value))}>
                    {rates.map((s) => (<option key={s} value={s}>{s}x</option>))}
                  </select>
                </label>
                <label className="video-select-control" title="Quality">
                  <span className="video-select-icon"><IconQuality /></span>
                  <select aria-label="Quality" value={quality} onChange={(e) => onQualityChange(e.target.value)}>
                    {qualities.map((q) => (<option key={q} value={q}>{q === 'auto' ? 'Auto' : q}</option>))}
                  </select>
                </label>
                <button type="button" className={`video-control-btn ${loop ? 'is-active' : ''}`} onClick={() => setLoop((v) => !v)} title={loop ? 'Loop on' : 'Loop off'} aria-label={loop ? 'Disable loop' : 'Enable loop'} aria-pressed={loop}><IconLoop /></button>
                <button type="button" className="video-control-btn" onClick={toggleFullscreen} title="Fullscreen" aria-label="Fullscreen"><IconFullscreen /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="video-watch-meta">
          <div className="video-watch-meta-top">
            <h3 className="video-watch-title">{currentTitle}</h3>
          </div>
          <div className="video-watch-submeta">
            <span className="timeline-date">{formatDate(currentVideo.timestamp)}</span>
            <span className="video-watch-sep">•</span>
            <span className="video-count">{currentIndex + 1} of {videos.length}</span>
            {currentVideo.permalink ? (
              <>
                <span className="video-watch-sep">•</span>
                <a href={currentVideo.permalink} target="_blank" rel="noopener noreferrer" className="video-permalink">View on YouTube</a>
              </>
            ) : null}
          </div>
          {currentDescription ? <p className="video-watch-description">{currentDescription}</p> : null}
        </div>
      </div>

      <div className="video-grid-header">
        <div>
          <h4 className="video-playlist-heading">Latest Videos</h4>
          <p className="videos-status-detail">Browse all videos from latest to oldest.</p>
        </div>
        <span className="video-count">Page {page} of {totalPages}</span>
      </div>

      <div className="portfolio-grid video-cards-grid" aria-label="Videos">
        {pageVideos.map((video, idxOnPage) => {
          const idx = pageStart + idxOnPage;
          const title = getTitle(video);
          const desc = getDescription(video);
          const active = idx === currentIndex;
          return (
            <article key={video.id || `${video.timestamp}-${idx}`} className={`portfolio-card video-card ${active ? 'active' : ''}`}>
              <button type="button" className="video-card-media-btn" onClick={() => selectVideo(idx)} aria-label={`Watch ${title}`}>
                <div className="portfolio-media video-card-media">
                  {video.thumbnailUrl ? <img src={video.thumbnailUrl} alt="" loading="lazy" /> : <div className="video-card-thumb-fallback" aria-hidden="true">▶</div>}
                  <div className="video-card-play-overlay" aria-hidden="true"><IconPlayOverlay /></div>
                </div>
              </button>
              <div className="portfolio-card-body video-card-body">
                <div className="video-card-meta-row">
                  <span className="timeline-date">{formatDate(video.timestamp)}</span>
                  {active ? <span className="timeline-pill">NOW PLAYING</span> : null}
                </div>
                <h3 className="portfolio-card-title video-card-title">{title}</h3>
                {desc ? <p className="portfolio-card-description video-card-description">{desc}</p> : null}
                <button type="button" className="portfolio-view-more video-watch-more" onClick={() => selectVideo(idx)}>
                  Watch <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="video-pagination" aria-label="Video pagination">
        <button type="button" className="video-control-btn video-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} aria-label="Previous page">Prev</button>
        <div className="video-page-numbers">
          {pageNumbers.map((p) => (
            <button key={p} type="button" className={`video-page-number ${p === page ? 'active' : ''}`} onClick={() => setPage(p)} aria-label={`Go to page ${p}`} aria-current={p === page ? 'page' : undefined}>
              {p}
            </button>
          ))}
        </div>
        <button type="button" className="video-control-btn video-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} aria-label="Next page">Next</button>
      </div>

      {error ? <p className="videos-status-detail videos-inline-error">{error}</p> : null}
    </div>
  );
}

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export type VideoItem = {
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

async function fetchJson(url: string) {
  const res = await fetch(url);
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json, text };
}

function readFallback(): VideoItem[] {
  try {
    const p = path.join(process.cwd(), 'public', 'youtube-videos.json');
    if (!fs.existsSync(p)) return [];
    const raw = fs.readFileSync(p, 'utf8');
    const parsed = JSON.parse(raw);
    const videos = Array.isArray(parsed?.videos) ? parsed.videos : [];
    return videos
      .map((v: any) => ({
        id: String(v?.id || v?.videoId || ''),
        videoId: v?.videoId ? String(v.videoId) : undefined,
        caption: typeof v?.caption === 'string' ? v.caption : (typeof v?.title === 'string' ? v.title : ''),
        timestamp: typeof v?.timestamp === 'string' ? v.timestamp : '',
        videoUrl: typeof v?.videoUrl === 'string' ? v.videoUrl : (v?.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : ''),
        embedUrl: typeof v?.embedUrl === 'string' ? v.embedUrl : (v?.videoId ? `https://www.youtube.com/embed/${v.videoId}` : undefined),
        thumbnailUrl: typeof v?.thumbnailUrl === 'string' ? v.thumbnailUrl : undefined,
        permalink: typeof v?.permalink === 'string' ? v.permalink : (v?.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : undefined),
        platform: 'youtube' as const,
      }))
      .filter((v: VideoItem) => v.id && v.videoUrl);
  } catch {
    return [];
  }
}

async function resolveUploadsPlaylistId(apiKey: string): Promise<string | null> {
  const envUploads = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID;
  if (envUploads) return envUploads;

  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (channelId) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey)}`;
    const res = await fetchJson(url);
    const uploads = res.json?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (res.ok && uploads) return String(uploads);
  }

  const handleRaw = process.env.YOUTUBE_CHANNEL_HANDLE || '@ilmoney_tech';
  const handle = handleRaw.startsWith('@') ? handleRaw : `@${handleRaw}`;
  const attempts = [
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(handle)}&key=${encodeURIComponent(apiKey)}`,
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(handle.replace(/^@/, ''))}&key=${encodeURIComponent(apiKey)}`,
  ];
  for (const url of attempts) {
    const res = await fetchJson(url);
    const uploads = res.json?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (res.ok && uploads) return String(uploads);
  }
  return null;
}

async function fetchAllYouTubeVideos(apiKey: string): Promise<VideoItem[]> {
  const uploadsPlaylistId = await resolveUploadsPlaylistId(apiKey);
  if (!uploadsPlaylistId) return [];

  const videos: VideoItem[] = [];
  let pageToken = '';
  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet,contentDetails');
    url.searchParams.set('playlistId', uploadsPlaylistId);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('key', apiKey);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetchJson(url.toString());
    if (!res.ok) {
      throw new Error(res.json?.error?.message || `YouTube API request failed (${res.status})`);
    }
    const items = Array.isArray(res.json?.items) ? res.json.items : [];
    for (const item of items) {
      const videoId = item?.contentDetails?.videoId || item?.snippet?.resourceId?.videoId;
      if (!videoId) continue;
      const title = typeof item?.snippet?.title === 'string' ? item.snippet.title : 'YouTube video';
      const description = typeof item?.snippet?.description === 'string' ? item.snippet.description : '';
      const caption = description.trim() ? `${title}\n\n${description}` : title;
      const timestamp = item?.contentDetails?.videoPublishedAt || item?.snippet?.publishedAt || '';
      const thumbs = item?.snippet?.thumbnails || {};
      const thumbnailUrl = thumbs.maxres?.url || thumbs.standard?.url || thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || undefined;
      videos.push({
        id: String(videoId),
        videoId: String(videoId),
        caption,
        timestamp: String(timestamp),
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
        platform: 'youtube',
      });
    }
    pageToken = typeof res.json?.nextPageToken === 'string' ? res.json.nextPageToken : '';
  } while (pageToken);

  return videos;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ videos: [], error: 'Method not allowed' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (apiKey) {
    try {
      const videos = await fetchAllYouTubeVideos(apiKey);
      if (videos.length > 0) {
        return res.status(200).json({ videos });
      }
    } catch (err: any) {
      const fallback = readFallback();
      if (fallback.length > 0) {
        return res.status(200).json({ videos: fallback, error: err?.message || 'Using cached YouTube videos.' });
      }
      return res.status(200).json({ videos: [], error: err?.message || 'Failed to fetch YouTube videos.' });
    }
  }

  const fallback = readFallback();
  if (fallback.length > 0) {
    return res.status(200).json({ videos: fallback, error: apiKey ? undefined : 'YouTube API key not configured; showing cached videos.' });
  }

  return res.status(200).json({ videos: [], error: 'YouTube API key is not configured and no cached videos are available.' });
}

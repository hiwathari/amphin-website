import type { Video } from "@/lib/content";

// YouTube (privacy-enhanced domain) and Instagram posts/reels play inline; anything else is a link.
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}
function instagramPath(url: string): string | null {
  const m = url.match(/instagram\.com\/(p|reel|reels|tv)\/([\w-]+)/);
  return m ? `${m[1] === "reels" ? "reel" : m[1]}/${m[2]}` : null;
}

export default function VideoEmbed({ video, title }: { video: Video; title: string }) {
  const yt = youtubeId(video.url);
  if (yt) {
    return (
      <div className="video-embed">
        <iframe src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0`} title={title} loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    );
  }
  const ig = instagramPath(video.url);
  if (ig) {
    return (
      <div className="video-embed vertical">
        <iframe src={`https://www.instagram.com/${ig}/embed`} title={title} loading="lazy" allowFullScreen />
      </div>
    );
  }
  return <a className="link-arrow" href={video.url} target="_blank" rel="noopener noreferrer">Watch the video</a>;
}

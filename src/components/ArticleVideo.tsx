'use client';

interface ArticleVideoProps {
  src: string;
}

export default function ArticleVideo({ src }: ArticleVideoProps) {
  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{ width: '100%', maxWidth: '480px' }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

import { useState } from 'react';

// Tries a real photo first (/public/images/<name>), then the bundled illustration (.svg),
// then a labelled placeholder. Drop a licensed .jpg with the same name to replace an illustration.
export default function Photo({ name, alt, className = '', ratio = '4 / 3' }) {
  const base = name.replace(/\.[^.]+$/, '');
  const sources = [`/images/${name}`, `/images/${base}.svg`];
  const [i, setI] = useState(0);
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: ratio }}>
      {i >= sources.length ? (
        <div className="photo-fallback"><span>Add photo: public/images/{name}</span></div>
      ) : (
        <img key={i} src={sources[i]} alt={alt} loading="lazy" onError={() => setI(i + 1)} />
      )}
    </div>
  );
}

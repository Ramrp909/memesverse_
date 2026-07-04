"use client";

import { useFeed } from "../hooks/useFeed";

export default function FeedTest() {
  const { items, loading, error } = useFeed();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{items.length} Posts</h1>

      {items.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>

          <p>{item.mediaType}</p>

          <img
            src={item.thumbnailUrl}
            width={200}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
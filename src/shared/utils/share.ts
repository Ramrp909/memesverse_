export async function handleShare(post: {
  id: number;
  title: string;
}) {
  const url = `${window.location.origin}/post/${post.id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "MemeVerse",
        text: post.title,
        url,
      });

      return true;
    } catch {
      return false;
    }
  }

  await navigator.clipboard.writeText(url);

  return false;
}
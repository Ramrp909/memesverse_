export async function handleShare(caption: string) {
  const url = window.location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: "MemeVerse", text: caption, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  } catch { /* user cancelled */ }
}
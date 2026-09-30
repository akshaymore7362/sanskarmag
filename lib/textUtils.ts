export function cleanStarPrimeText(text: string): string {
  if (!text || typeof text !== "string") return text || "";
  return text
    .replace(/Cover\s+Story\s*[–\-—:]?\s*(The\s+)?Star\s*[-_]?\s*Prime/gi, "Cover Story – Executive Web Profile")
    .replace(/(The\s+)?Star\s*[-_]?\s*Prime\s*[-_]?\s*Web\s*profile/gi, "Executive Web Profile")
    .replace(/Web\s*profile\s*[-_]?\s*(The\s+)?Star\s*[-_]?\s*Prime/gi, "Executive Web Profile")
    .replace(/(The\s+)?Star\s*[-_]?\s*Prime\s*[-_]?\s*Magazine/gi, "The Success World Magazine")
    .replace(/Magazine\s*[-_]?\s*(The\s+)?Star\s*[-_]?\s*Prime/gi, "The Success World Magazine")
    .replace(/The\s+Star\s*[-_]?\s*Prime/gi, "The Success World")
    .replace(/Star\s*[-_]?\s*Prime/gi, "The Success World")
    .replace(/starprime/gi, "thesuccessworld")
    .replace(/star-prime/gi, "the-success-world")
    .replace(/star_prime/gi, "the_success_world");
}

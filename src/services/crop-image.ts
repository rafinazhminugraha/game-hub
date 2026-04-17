export default function cropImage(url: string) {
  const cropUrl: string = "/crop/600/400";
  const sliceIndex: number = 27;

  const baseUrl: string = url.slice(0, 27);
  const gameUrl: string = url.slice(sliceIndex);

  return baseUrl + cropUrl + gameUrl;
}

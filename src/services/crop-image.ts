export default function cropImage(url: string) {
  const cropUrl: string = "crop/600/400/";

  const target: string = "media/";
  const index: number = url.indexOf(target) + target.length;
  const croppedImageUrl = url.slice(0, index) + cropUrl + url.slice(index);

  return croppedImageUrl;

  // const sliceIndex: number = 27;
  // const baseUrl: string = url.slice(0, 27);
  // const gameUrl: string = url.slice(sliceIndex);

  // return baseUrl + cropUrl + gameUrl;
}

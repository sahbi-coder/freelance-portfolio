import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

const storage = getStorage(app);

export default async function downloadImages(path) {
  const starsRef = ref(storage, path);

    return await getDownloadURL(starsRef);

}

import { getStorage, ref, deleteObject } from "firebase/storage";
import app from "../../firebase";

const storage = getStorage(app);

export default async function deleteFromFirebase(path) {
  const desertRef = ref(storage, path);
  return await deleteObject(desertRef);
}
export async function deleteAllImage(list) {
  try {
    for (let path of list) {
      const desertRef = ref(storage, path);
      await deleteObject(desertRef);
    }
    return true;
  } catch {
    return false
  }
}

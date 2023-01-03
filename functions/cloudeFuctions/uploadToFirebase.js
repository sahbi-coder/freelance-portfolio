import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase";

const storage = getStorage(app);

export default async function uploadFile(file, path) {
  const storageRef = ref(storage, path);
 
    return await uploadBytes(storageRef, file);

}

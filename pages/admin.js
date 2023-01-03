import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../functions/uploadTofirebase";
import downloadImages from "../functions/downloadImagesFromFirebase";
import deleteFromFirebase from "../functions/deleteFromFirebase";
import Router from "next/router";
import styles from "../styles/Admin.module.css";
import Image from "next/image";
import { deleteAllImage } from "../functions/deleteFromFirebase";
import { TailSpin } from "react-loader-spinner";

function Admin({ authenticated }) {
  const [imageToAppload, setImageToAppload] = useState(null);
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!authenticated) Router.push("/login");
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) getImages();
  }, [authenticated]);

  async function getImages() {
    try {
      let res = [];
      let result = (
        await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/images")
      ).data;
      for (let i = 0; i < result.length; i++) {
        let src = await downloadImages(result[i].img);
        let image = { id: result[i].id, src };
        res.push(image);
      }
      setImages(res);
    } catch {
      alert("error");
    }
  }
  async function deleteAll() {
    try {
      setIsFetching(true);
      const list = images.reduce((pre, acc) => {
        pre.push(acc.src);
        return pre;
      }, []);

      await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + "/api/images");
      const imageDeleted = await deleteAllImage(list);
      setImages([]);
      setIsFetching(false);
      if (!imageDeleted) alert("images deleted with bugs");
    } catch (e) {
      alert("error");
      setIsFetching(false);
    }
  }
  async function deleteImage(id) {
    try {
      setIsFetching(true);
      const res = await axios.delete(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/images/${id}`
      );

      await deleteFromFirebase(res.data.img);
      await getImages();
      setIsFetching(false);
    } catch {
      alert("error");
      setIsFetching(false);
    }
  }
  async function addImage() {
    let path = "images/demo" + new Date().getTime();
    try {
      if (!imageToAppload) {
        alert("provide an image first");
        return;
      }
      setIsFetching(true);
      await axios.post(process.env.NEXT_PUBLIC_BASE_URL + `/api/images`, {
        path,
      });
      await uploadFile(imageToAppload, path);
      await getImages();
      setIsFetching(false);
    } catch {
      alert("something went wrog!!");
      setIsFetching(false);
    }
  }
  async function logout() {
    try {
      await axios.get(process.env.NEXT_PUBLIC_BASE_URL + `/api/logout`);
      Router.push("/login");
    } catch {
      alert("something went wrog!!");
    }
  }
  function deleteImageAlert(id) {
    const deleted = prompt("are you sure about deleting?", "yes");

    if (deleted === "yes") {
      deleteImage(id);
    }
  }
  function deleteAllImagesAlert() {
    const deleted = prompt("are you sure about deleting?", "yes");

    if (deleted === "yes") {
      deleteAll();
    }
  }
  return (
    <div>
      <div className={styles.title}>Hello Oussama</div>
      <div className={styles.dashboard}>
        <div className={styles.tools}>
          <div>
            <button
              onClick={() => {
                addImage();
              }}
              className={styles.button}
            >
              add
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                deleteAllImagesAlert();
              }}
              className={styles.button}
            >
              delete all
            </button>
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setImageToAppload(e.target.files[0])}
            />
          </div>
          <div>
            <button
              onClick={() => {
                logout();
              }}
              className={styles.button}
            >
              logout
            </button>
          </div>
        </div>
        {isFetching && (
          <TailSpin
            height="80"
            width="80"
            color="#08fdd8"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        <div className={styles.container}>
          <div className={styles.grid}>
            {images.map((item, index) => {
              return (
                <div
                  key={100 + index}
                  className={styles.gridItem}
                  onClick={() => {
                    deleteImageAlert(item.id);
                  }}
                >
                  <Image src={item.src} layout="fill" objectFit="cover" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

export async function getServerSideProps(ctx) {
  const authtoken = ctx.req.cookies.authtoken;
  let authenticated = false;

  try {
    await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/admin", {
      authtoken,
    });
    authenticated = true;
  } catch {
    authenticated = false;
  }

  return {
    props: {
      authenticated,
    },
  };
}

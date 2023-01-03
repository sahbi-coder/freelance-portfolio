import { useEffect, useState } from "react";
import * as THREE from "three";
import useMobile from "../hooks/useMobile";
import {useRouter} from 'next/router'

function ServicesEffects() {
  const isMobile = useMobile();
  const {locale} = useRouter()
  
  useEffect(() => {
    let canvas = document.getElementById("bg");
    let req, loopReq;
    if (canvas) {
      if (isMobile !== null) {
        let height = window.innerHeight;
        let width = isMobile ? window.innerWidth : window.innerWidth / 2;
        let aspectRatio = width / height;

        const renderer = new THREE.WebGL1Renderer({
          canvas,
        });

        renderer.setSize(width, height);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        camera.position.z = 15;
        camera.position.y = 0;

        function makePlate(posX, posY, name) {
          const circleOneObj = new THREE.Object3D();
          const cirlceGeo = new THREE.CircleGeometry(2, 32);
          const circleMat = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(name),
          });

          const circle = new THREE.Mesh(cirlceGeo, circleMat);

          circleOneObj.add(circle);
          circle.position.x = posX;
          circle.position.y = posY;
          scene.add(circleOneObj);
          return {
            circle,
            circleOneObj,
          };
        }

        const circleOne = makePlate(5, 0, `/${locale}/Frame 1.svg`);
        const circleTwo = makePlate(0, 5, `/${locale}/Frame 2.svg`);
        const circleThree = makePlate(-5, 0, `/${locale}/Frame 3.svg`);
        const circleFour = makePlate(0, -5, `/${locale}/Frame 4.svg`);

        function loop() {
          try {
            circleOne.circleOneObj.rotation.y += -0.017;
            circleOne.circle.rotation.y += 0.017;
            circleTwo.circleOneObj.rotation.x += -0.015;
            circleTwo.circle.rotation.x += 0.015;

            circleThree.circleOneObj.rotation.y += -0.017;
            circleThree.circle.rotation.y += 0.017;
            circleFour.circleOneObj.rotation.x += -0.015;
            circleFour.circle.rotation.x += 0.015;

            renderer.render(scene, camera);
            req = requestAnimationFrame(loop);
          } catch (e) {
          
          }
        }
        loop();
      }
    }
    window.onresize = () => {
      if (canvas) {
        let height = window.innerHeight;
        let width = isMobile ? window.innerWidth : window.innerWidth / 2;
        let aspectRatio = width / height;

        const renderer = new THREE.WebGL1Renderer({
          canvas: document.getElementById("bg"),
        });

        renderer.setSize(width, height);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        camera.position.z = 15;
        camera.position.y = 0;

        function makePlate(posX, posY, name) {
          const circleOneObj = new THREE.Object3D();
          const cirlceGeo = new THREE.CircleGeometry(2, 32);
          const circleMat = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(name),
          });

          const circle = new THREE.Mesh(cirlceGeo, circleMat);

          circleOneObj.add(circle);
          circle.position.x = posX;
          circle.position.y = posY;
          scene.add(circleOneObj);
          return {
            circle,
            circleOneObj,
          };
        }

        const circleOne = makePlate(5, 0, "Frame 1.svg");
        const circleTwo = makePlate(0, 5, "Frame 2.svg");
        const circleThree = makePlate(-5, 0, "Frame 3.svg");
        const circleFour = makePlate(0, -5, "Frame 4.svg");

        function loop() {
          try {
            circleOne.circleOneObj.rotation.y += -0.017;
            circleOne.circle.rotation.y += 0.017;
            circleTwo.circleOneObj.rotation.x += -0.015;
            circleTwo.circle.rotation.x += 0.015;

            circleThree.circleOneObj.rotation.y += -0.017;
            circleThree.circle.rotation.y += 0.017;
            circleFour.circleOneObj.rotation.x += -0.015;
            circleFour.circle.rotation.x += 0.015;

            renderer.render(scene, camera);
            loopReq = requestAnimationFrame(loop);
          } catch (e) {
       
          }
        }
        loop();
      }
    };

    return () => {
      req && window.cancelAnimationFrame(req);
      loopReq && window.cancelAnimationFrame(loopReq);
    };
  }, [isMobile]);

  return <canvas id="bg" height="100%" width="100%"></canvas>;
}

export default ServicesEffects;

import { useEffect, useRef,useId } from "react";
import styles from "../styles/Canvas.module.css";
import useMobile from "../hooks/useMobile";
import { gsap } from "gsap";
import uniqid from 'uniqid';




export default function Canvas({t}) {
  const isMobile = useMobile();
  const lettersRef = useRef([]);

  lettersRef.current = [];
  const setRefts = (el) => {
    if (el) {
      lettersRef.current.push(el);
    }
  };

  useEffect(() => {
    let canvas, ctx, w, h, thunder, text, particles, req;

    function Thunder(options) {
      options = options || {};
      this.lifespan = options.lifespan || Math.round(Math.random() * 10 + 10);
      this.maxlife = this.lifespan;
      this.color = options.color || "#fefefe";
      this.glow = options.glow || "#2323fe";
      this.x = options.x || Math.random() * w;
      this.y = options.y || Math.random() * h;
      this.width = options.width || 2;
      this.direct = options.direct || Math.random() * Math.PI * 2;
      this.max = options.max || Math.round(Math.random() * 10 + 20);
      this.segments = [...new Array(this.max)].map(() => {
        return {
          direct: this.direct + (Math.PI * Math.random() * 0.3 - 0.1),
          length: Math.random() * 20 + 20,
          change: Math.random() * 0.04 - 0.02,
        };
      });

      this.update = function (index, array) {
        this.segments.forEach((s) => {
          (s.direct += s.change) && Math.random() > 0.96 && (s.change *= -1);
        });
        (this.lifespan > 0 && this.lifespan--) || this.remove(index, array);
      };

      this.render = function (ctx) {
        if (this.lifespan <= 0) return;
        ctx.beginPath();
        ctx.globalAlpha = this.lifespan / this.maxlife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.shadowBlur = 32;
        ctx.shadowColor = this.glow;
        ctx.moveTo(this.x, this.y);
        let prev = { x: this.x, y: this.y };
        this.segments.forEach((s) => {
          const x = prev.x + Math.cos(s.direct) * s.length;
          const y = prev.y + Math.sin(s.direct) * s.length;
          prev = { x: x, y: y };
          ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.closePath();
        ctx.shadowBlur = 0;
        const strength = Math.random() * 400 + 20;
        const light = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          strength
        );
        light.addColorStop(0, "rgba(250, 200, 50, 0.6)");
        light.addColorStop(0.1, "rgba(250, 200, 50, 0.2)");
        light.addColorStop(0.4, "rgba(250, 200, 50, 0.06)");
        light.addColorStop(0.65, "rgba(250, 200, 50, 0.01)");
        light.addColorStop(0.8, "rgba(250, 200, 50, 0)");
        ctx.beginPath();
        ctx.fillStyle = light;
        ctx.arc(this.x, this.y, strength, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      };

      this.remove = function (index, array) {
        array.splice(index, 1);
      };
    }

    function Spark(options) {
      options = options || {};
      this.x = options.x || w * 0.5;
      this.y = options.y || h * 0.5;
      this.v = options.v || {
        direct: Math.random() * Math.PI * 2,
        weight: Math.random() * 14 + 2,
        friction: 0.88,
      };
      this.a = options.a || {
        change: Math.random() * 0.4 - 0.2,
        min: this.v.direct - Math.PI * 0.4,
        max: this.v.direct + Math.PI * 0.4,
      };
      this.g = options.g || {
        direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2),
        weight: Math.random() * 0.25 + 0.25,
      };
      this.width = options.width || Math.random() * 3;
      this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 40);
      this.maxlife = this.lifespan;
      this.color = options.color || "#feca32";
      this.prev = { x: this.x, y: this.y };

      this.update = function (index, array) {
        this.prev = { x: this.x, y: this.y };
        this.x += Math.cos(this.v.direct) * this.v.weight;
        this.x += Math.cos(this.g.direct) * this.g.weight;
        this.y += Math.sin(this.v.direct) * this.v.weight;
        this.y += Math.sin(this.g.direct) * this.g.weight;
        this.v.weight > 0.2 && (this.v.weight *= this.v.friction);
        this.v.direct += this.a.change;
        (this.v.direct > this.a.max || this.v.direct < this.a.min) &&
          (this.a.change *= -1);
        this.lifespan > 0 && this.lifespan--;
        this.lifespan <= 0 && this.remove(index, array);
      };

      this.render = function (ctx) {
        if (this.lifespan <= 0) return;
        ctx.beginPath();
        ctx.globalAlpha = this.lifespan / this.maxlife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.prev.x, this.prev.y);
        ctx.stroke();
        ctx.closePath();
      };

      this.remove = function (index, array) {
        array.splice(index, 1);
      };
    }

    function Particles(options) {
      options = options || {};
      this.max = options.max || Math.round(Math.random() * 10 + 10);
      this.sparks = [...new Array(this.max)].map(() => new Spark(options));

      this.update = function () {
        this.sparks.forEach((s, i) => s.update(i, this.sparks));
      };

      this.render = function (ctx) {
        this.sparks.forEach((s) => s.render(ctx));
      };
    }

    function Text(options) {
      const pool = document.createElement("canvas");
      const buffer = pool.getContext("2d");
      options = options || {};
      pool.width = w;
      buffer.fillStyle = "#000000";
      buffer.fillRect(0, 0, pool.width, pool.height);

      this.size = options.size || 100;
      this.copy = (options.copy || `Hello!`) + " ";
      this.color = options.color || "#cd96fe";
      this.delay = options.delay || 1;
      this.basedelay = this.delay;
      buffer.font = `${this.size}px Comic Sans MS`;
      this.bound = buffer.measureText(this.copy);
      this.bound.height = this.size * 1.5;
      this.x = options.x || w * 0.65 - this.bound.width * 0.5;
      this.y = options.y || h * 0.75 - this.size * 0.5;

      buffer.strokeStyle = this.color;
      buffer.strokeText(this.copy, 0, this.bound.height * 0.8);
      this.data = buffer.getImageData(
        0,
        0,
        this.bound.width,
        this.bound.height
      );
      this.index = 0;

      this.update = function () {
        if (this.index >= this.bound.width) {
          this.index = 0;
        }
        pool.width = w;
        pool.height = h;
        this.x = options.x || w * 0.65 - this.bound.width * 0.5;
        this.y = options.y || h * 0.75 - this.size * 0.5;
        const data = this.data.data;

        for (
          let i = this.index * 4;
          i < data.length;
          i += 4 * this.data.width
        ) {
          const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
          if (bitmap > 255 && Math.random() > 0.96) {
            const x = this.x + this.index;
            const y = this.y + i / this.bound.width / 4;
            thunder.push(
              new Thunder({
                x: x,
                y: y,
              })
            );
            Math.random() > 0.5 &&
              particles.push(
                new Particles({
                  x: x,
                  y: y,
                })
              );
          }
        }

        if (this.delay-- < 0) {
          this.index++;
          this.delay += this.basedelay;
        }
      };

      this.render = function (ctx) {
        ctx.putImageData(
          this.data,
          this.x,
          this.y,
          0,
          0,
          this.index,
          this.bound.height
        );
      };
    }

    function loop() {
      update();
      render();
      req = requestAnimationFrame(loop);
    }

    function update() {
      let stop = text.update();
      thunder.forEach((l, i) => l.update(i, thunder));
      particles.forEach((p) => p.update());
      return stop;
    }

    function render() {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";
      text.render(ctx);
      thunder.forEach((l) => l.render(ctx));
      particles.forEach((p) => p.render(ctx));
    }

    canvas = document.getElementById("canvas");

    ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    w = canvas.width;
    h = canvas.height;
    thunder = [];
    particles = [];
    text = new Text({
      copy: "Jedda",
      size: isMobile ? 70 : 100,
    });

    function resize() {
      canvas.height = this.window.innerHeight;
      canvas.width = this.window.innerWidth;
      w = canvas.width;
      h = canvas.height;
    }
    window.addEventListener("resize", resize);
    loop();
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(req);
    };
  }, []);

  useEffect(() => {
    lettersRef.current.forEach((ref, index) => {
      gsap.fromTo(ref, { opacity: 0 }, { opacity: 1, duration: index * 0.1 });
    });
  }, []);
  return (
    <>
      <div className={styles.canvasWrapper}>
        <canvas
          id="canvas"
          style={{ height: "100vh", width: "100vw" }}
        ></canvas>

        <div className={styles.textArea}>
          <div>
            {t("canvas:canvas").split("").map((c, index) => {
         
              return c === "," ? (
                <>
                  <span className={styles.char} ref={setRefts} key={uniqid()}>
                    {c}
                  </span>
                  <br />
                </>
              ) : (
                <span className={styles.char} ref={setRefts} key={index}>
                  {c}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

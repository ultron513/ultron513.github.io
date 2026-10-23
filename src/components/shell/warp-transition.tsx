"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";
import { resolveColor } from "@/lib/resolve-color";

const SPACE_ROUTE = /^\/experience\/[^/]+\/?$/;
const DURATION = 450;

const VERTEX = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAGMENT = `precision mediump float;
uniform vec2 u_res;uniform float u_t;uniform vec3 u_star;uniform vec3 u_bg;
float hash(float n){return fract(sin(n)*43758.5453123);}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*u_res)/min(u_res.x,u_res.y);
  float r=length(p);float a=atan(p.y,p.x)/6.2831853+.5;
  float lanes=220.;float lane=a*lanes;float id=floor(lane);
  float speed=.6+hash(id)*1.8;float offset=hash(id+31.7);
  float head=fract(offset+u_t*speed)*1.6;
  float len=.04+u_t*.55*(.3+hash(id+7.1));
  float along=smoothstep(head-len,head,r)*(1.-step(head,r));
  float across=1.-smoothstep(.08,.5,abs(fract(lane)-.5));
  float visible=step(.55,hash(id+3.3));
  float env=sin(3.14159*u_t);
  float s=along*across*visible*env*smoothstep(.02,.2,r);
  float veil=pow(1.-u_t,2.)*.85;
  vec3 col=mix(u_bg,u_star,s);
  gl_FragColor=vec4(col,max(veil,s));
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** Plays a star-streak arrival when entering or leaving a job space (spec §7). */
export function WarpTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    if (from === pathname) return;
    if (SPACE_ROUTE.test(from) || SPACE_ROUTE.test(pathname)) setRun((n) => n + 1);
  }, [pathname]);

  useEffect(() => {
    if (!run) return;

    if (reduced) {
      const fade = fadeRef.current;
      if (!fade) return;
      fade.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: "ease-out" });
      return;
    }

    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!canvas || !gl) return;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const star = resolveColor("--scene-star");
    const bg = resolveColor("--bg");
    gl.uniform2f(gl.getUniformLocation(program, "u_res"), canvas.width, canvas.height);
    gl.uniform3f(gl.getUniformLocation(program, "u_star"), star[0], star[1], star[2]);
    gl.uniform3f(gl.getUniformLocation(program, "u_bg"), bg[0], bg[1], bg[2]);
    const uT = gl.getUniformLocation(program, "u_t");

    canvas.style.opacity = "1";
    const start = performance.now();
    let frame = 0;
    const draw = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (t < 1) frame = requestAnimationFrame(draw);
      else canvas.style.opacity = "0";
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      canvas.style.opacity = "0";
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [run, reduced]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] size-full opacity-0"
      />
      <div
        ref={fadeRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] bg-bg opacity-0"
      />
    </>
  );
}

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const vertex = `
attribute vec3 aPosition;
attribute float aSize;
attribute vec3 aColor;
uniform vec2 uResolution;
uniform vec3 uCamera;
uniform vec2 uRotation;
uniform float uWarp;
uniform float uTime;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec3 p = aPosition - uCamera;
  float cy=cos(uRotation.x), sy=sin(uRotation.x);
  float cp=cos(uRotation.y), sp=sin(uRotation.y);
  p = vec3(cy*p.x-sy*p.z, p.y, sy*p.x+cy*p.z);
  p = vec3(p.x, cp*p.y-sp*p.z, sp*p.y+cp*p.z);
  if (p.z > -1.0) {
    gl_Position = vec4(3.0, 3.0, 0.0, 1.0);
    gl_PointSize = 0.0;
    vColor = aColor;
    vAlpha = 0.0;
    return;
  }
  float depth = max(1.0, -p.z);
  vec2 projected = p.xy / depth;
  projected.x *= uResolution.y/uResolution.x;
  gl_Position = vec4(projected*1.7, 0.0, 1.0);
  float pulse = .88 + .12*sin(uTime*.0007 + aPosition.x*2.3);
  gl_PointSize = min(12.0, aSize * pulse * (135.0/depth) * (1.0+uWarp*2.35));
  vColor = aColor;
  vAlpha = (1.0-smoothstep(135.0,190.0,depth)) * smoothstep(.2,2.0,gl_PointSize);
}`;
const fragment = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 q=gl_PointCoord-.5;
  float d=length(q);
  float core=smoothstep(.24,0.0,d);
  float halo=smoothstep(.5,.06,d)*.62;
  gl_FragColor=vec4(vColor*(core*1.65+halo),vAlpha*(core+halo));
}`;

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const value = gl.createShader(type)!;
  gl.shaderSource(value, source);
  gl.compileShader(value);
  return value;
}

function createStars(count: number) {
  const data = new Float32Array(count * 7);
  let seed = 9147;
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < count; i++) {
    const j = i * 7;
    if (i < count * .72) {
      const arm = (i % 5) * Math.PI * .4;
      const radius = 1.5 + Math.pow(random(), .62) * 62;
      const swirl = arm + radius * .11 + (random() - .5) * .7;
      data[j] = Math.cos(swirl) * radius + (random() - .5) * 5;
      data[j+1] = (random() - .5) * (3.5 + radius * .1);
      data[j+2] = -random() * 190 + Math.sin(swirl) * radius * .32;
    } else {
      data[j] = (random() - .5) * 125;
      data[j+1] = (random() - .5) * 82;
      data[j+2] = -random() * 195;
    }
    data[j+3] = i % 127 === 0 ? 5.4 : .8 + Math.pow(random(), 2) * 3.4;
    const cool = random();
    data[j+4] = cool > .78 ? .55 : .78 + random() * .22;
    data[j+5] = cool > .78 ? .72 : .8 + random() * .2;
    data[j+6] = cool > .78 ? 1 : .9 + random() * .1;
  }
  return data;
}

export function GalaxyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const velocity = useRef(0);
  const tier = usePerformanceTier();
  const mouse = useMouseParallax(tier === 'desktop');
  const trackScroll = useCallback((p: number, v: number) => { progress.current = p; velocity.current = v; }, []);
  useScrollProgress(trackScroll);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'high-performance' });
    if (!gl) { canvas.classList.add('no-webgl'); return; }
    const program = gl.createProgram()!;
    gl.attachShader(program, shader(gl, gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    const activate = gl.useProgram.bind(gl);
    activate(program);
    const count = tier === 'desktop' ? 9200 : tier === 'mobile' ? 4300 : 2200;
    const data = createStars(count);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const stride = 7 * 4;
    const bind = (name: string, size: number, offset: number) => { const loc=gl.getAttribLocation(program,name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,size,gl.FLOAT,false,stride,offset); };
    bind('aPosition',3,0); bind('aSize',1,12); bind('aColor',3,16);
    const resolution=gl.getUniformLocation(program,'uResolution'), camera=gl.getUniformLocation(program,'uCamera'), rotation=gl.getUniformLocation(program,'uRotation'), warp=gl.getUniformLocation(program,'uWarp'), time=gl.getUniformLocation(program,'uTime');
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE); gl.disable(gl.DEPTH_TEST);
    let raf=0, mx=0, my=0, smoothP=progress.current, smoothWarp=0;
    const resize=()=>{const dpr=Math.min(window.devicePixelRatio,tier==='desktop'?1.5:1);canvas.width=Math.round(innerWidth*dpr);canvas.height=Math.round(innerHeight*dpr);gl.viewport(0,0,canvas.width,canvas.height)};
    const draw=(now:number)=>{
      smoothP += (progress.current-smoothP)*(tier==='reduced'?1:.045);
      smoothWarp += ((tier==='reduced'?0:velocity.current)-smoothWarp)*.07;
      mx += (mouse.current.x-mx)*.025; my += (mouse.current.y-my)*.025;
      const journey=tier==='reduced'?.08:smoothP;
      const x=Math.sin(journey*Math.PI*2.1)*3.2+mx*1.2;
      const y=Math.sin(journey*Math.PI*1.35)*2.4-my*.8;
      const z=8-journey*150;
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform3f(camera,x,y,z);
      gl.uniform2f(rotation,Math.sin(journey*5.4)*.055+mx*.018,Math.cos(journey*3.7)*.035+my*.012);
      gl.uniform1f(warp,smoothWarp);gl.uniform1f(time,now);gl.drawArrays(gl.POINTS,0,count);
      raf=requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize',resize,{passive:true}); raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);gl.deleteBuffer(buffer);gl.deleteProgram(program)};
  }, [tier, mouse]);

  return <div className="cosmos" aria-hidden="true"><canvas ref={canvasRef}/><div className="nebula nebula-a"/><div className="nebula nebula-b"/><div className="nebula nebula-c"/><div className="cosmic-horizon"/></div>;
}

"use client";


import { Shader, Swirl, ChromaFlow, FlutedGlass } from "shaders/react";

// Suppress a known cosmetic warning from the shaders/typegpu library:
// "[external-omitted] During resolution, the external 'in.uv' has been omitted."
// This fires because tgpu's JS resolver encounters the WGSL built-in `in.uv`
// which only has meaning on the GPU. It has zero functional impact.
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const msg = typeof args[0] === "string" ? args[0] : "";
    if (msg.includes("external-omitted") && msg.includes("in.uv")) return;
    _warn(...args);
  };
}

export default function BentoShaderBackground() {
  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      {/* High-performance CSS base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f9fe] to-[#faf5ff] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-100/40 blur-[100px] pointer-events-none" />

      {/* Lightweight, optimized WebGPU liquid shader */}
      <Shader
        className="w-full h-full relative z-10 opacity-80"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Swirl
          colorA="#ffffff"
          colorB="#f4f6fb"
          detail={1.2}
        />
        <ChromaFlow
          baseColor="#ffffff"
          downColor="#4642ff"
          leftColor="#56c2fc"
          rightColor="#5b4fff"
          upColor="#7f66ff"
          momentum={8}
          radius={3.0}
        />
        <FlutedGlass
          aberration={0.15}
          angle={31}
          frequency={5}
          highlight={0.1}
          highlightSoftness={0.2}
          lightAngle={-90}
          refraction={1.2}
          shape="rounded"
          softness={1}
          speed={0.08}
        />
      </Shader>
    </div>
  );
}

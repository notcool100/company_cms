"use client"

import { useEffect, useRef } from "react"
import { useThree, Canvas, useFrame } from "@react-three/fiber"
import { Plane, PerspectiveCamera } from "@react-three/drei"
import { Vector2 } from "three"

// Water shader component with enhanced effects
function WaterShader() {
  const { viewport } = useThree()
  const ref = useRef<any>()
  const mousePosition = useRef(new Vector2(0, 0))

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Normalize mouse position to [-1, 1]
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  // Shader uniforms
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new Vector2(viewport.width, viewport.height) },
    uMouse: { value: new Vector2(0, 0) },
    uMouseVelocity: { value: new Vector2(0, 0) },
  }

  useFrame((state) => {
    if (ref.current) {
      // Update time
      ref.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

      // Smooth mouse following
      ref.current.material.uniforms.uMouse.value.lerp(mousePosition.current, 0.05)

      // Calculate mouse velocity for ripple effect
      const currentMouse = ref.current.material.uniforms.uMouse.value.clone()
      const lastMouse = new Vector2().copy(currentMouse)
      const mouseVelocity = new Vector2().subVectors(currentMouse, lastMouse).multiplyScalar(10)
      ref.current.material.uniforms.uMouseVelocity.value.lerp(mouseVelocity, 0.2)
    }
  })

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Fragment shader for enhanced water effect
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform vec2 uMouseVelocity;
    varying vec2 vUv;
    
    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
        dot(x12.zw, x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    // Fractal Brownian Motion
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 3.0;
      // Domain warping - makes the noise more interesting
      vec2 warp = vec2(snoise(p * 0.5), snoise(p * 0.5 + vec2(1.7, 3.2)));
      
      for (int i = 0; i < 5; i++) {
        value += amplitude * snoise(p * frequency + warp);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }
    
    // Ripple effect
    float ripple(vec2 uv, vec2 center, float time, float frequency, float amplitude) {
      float dist = distance(uv, center);
      return sin(dist * frequency - time) * amplitude / (dist + 0.1);
    }
    
    void main() {
      // Create enhanced water effect with multiple layers
      vec2 uv = vUv;
      
      // Adjust aspect ratio
      float aspect = uResolution.x / uResolution.y;
      vec2 scaledUv = vec2(uv.x * aspect, uv.y);
      
      // Time variables for different speeds
      float t1 = uTime * 0.15;
      float t2 = uTime * 0.08;
      
      // Mouse interaction
      float mouseStrength = length(uMouseVelocity) * 0.01;
      float mouseRipple = ripple(scaledUv, uMouse, uTime * 5.0, 40.0, mouseStrength);
      
      // Create multiple layers of waves with domain warping
      vec2 warpedUv1 = scaledUv + vec2(
        fbm(scaledUv * 0.8 + vec2(t1 * 0.7, t1 * 0.4)) * 0.05,
        fbm(scaledUv * 0.8 + vec2(-t1 * 0.6, t1 * 0.3)) * 0.05
      );
      
      vec2 warpedUv2 = scaledUv + vec2(
        fbm(scaledUv * 1.2 + vec2(-t2 * 0.5, t2 * 0.6)) * 0.1,
        fbm(scaledUv * 1.2 + vec2(t2 * 0.4, -t2 * 0.5)) * 0.1
      );
      
      // Generate noise layers
      float noise1 = fbm(warpedUv1 * 3.0) * 0.5 + 0.5;
      float noise2 = fbm(warpedUv2 * 5.0) * 0.5 + 0.5;
      float noise3 = fbm(scaledUv * 8.0 + vec2(t1, -t2)) * 0.5 + 0.5;
      
      // Add mouse interaction
      noise1 += mouseRipple * 0.3;
      noise2 += mouseRipple * 0.2;
      
      // Combine noise layers
      float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Create vibrant color gradient for water
      vec3 deepColor = vec3(0.0, 0.05, 0.2);
      vec3 midColor = vec3(0.0, 0.3, 0.6);
      vec3 shallowColor = vec3(0.1, 0.6, 0.9);
      vec3 highlightColor = vec3(0.6, 0.8, 1.0);
      
      // Create more complex color mixing
      vec3 waterColor;
      if (finalNoise < 0.3) {
        waterColor = mix(deepColor, midColor, finalNoise / 0.3);
      } else if (finalNoise < 0.7) {
        waterColor = mix(midColor, shallowColor, (finalNoise - 0.3) / 0.4);
      } else {
        waterColor = mix(shallowColor, highlightColor, (finalNoise - 0.7) / 0.3);
      }
      
      // Add dynamic highlights based on noise patterns
      float highlight = pow(noise2, 12.0) * 0.8;
      waterColor += vec3(highlight);
      
      // Add subtle caustics effect
      float caustics = pow(noise3, 3.0) * pow(noise1, 2.0) * 0.3;
      waterColor += vec3(0.2, 0.4, 0.6) * caustics;
      
      // Add subtle dark areas
      float darkSpots = pow(1.0 - noise3, 6.0) * 0.2;
      waterColor -= vec3(darkSpots);
      
      // Add gradient from top to bottom for depth
      waterColor = mix(waterColor, deepColor, 1.0 - uv.y * 0.7);
      
      // Add subtle vignette effect
      float vignette = 1.0 - smoothstep(0.5, 1.5, length((uv - 0.5) * 2.0));
      waterColor *= vignette * 1.1;
      
      gl_FragColor = vec4(waterColor, 0.9);
    }
  `

  return (
    <Plane ref={ref} args={[viewport.width, viewport.height]} position={[0, 0, 0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </Plane>
  )
}

export default function WaterEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="absolute inset-0 bg-gradient-to-b from-cyan-900 to-blue-950">
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <WaterShader />
      </Canvas>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}

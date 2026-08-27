"use client";

import * as React from "react";
import * as THREE from "three";

/**
 * 离线环境光照。
 *
 * 金属只有在有东西可反射时才像金属。这里不加载任何外部 HDRI，
 * 而是用几块自发光面片 + 一个渐变天球实时烘一张环境贴图：
 * 上方一块大面光（天空）、侧前方一块主光、下方暗地面，
 * 足以让不锈钢、裸铝和白漆在同一画面里被区分开。
 */
export function StudioEnvironment() {
  const sky = React.useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 8;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "#a8bcda");
    g.addColorStop(0.44, "#6d7789");
    g.addColorStop(0.52, "#8d939c");
    // 下半球是地面：发射场是大片混凝土，不是黑的。
    // 抛光不锈钢（半人马座、星舰）几乎只反射下半球，天球底部涂黑会让它整段发暗发蓝。
    g.addColorStop(0.7, "#9a968f");
    g.addColorStop(1, "#6f7178");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <group>
      <mesh scale={60}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial map={sky} side={THREE.BackSide} />
      </mesh>
      {/* 主光：右上前方的大面光 */}
      <mesh position={[9, 12, 8]} rotation={[-0.6, 0.7, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* 冷调补光：左后方 */}
      <mesh position={[-12, 4, -9]} rotation={[0, -2.4, 0]}>
        <planeGeometry args={[18, 26]} />
        <meshBasicMaterial color="#5f7ea8" />
      </mesh>
      {/* 顶光条：给圆柱面一条高光棱线 */}
      <mesh position={[0, 18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 40]} />
        <meshBasicMaterial color="#dce6f5" />
      </mesh>
      {/* 地面反光板：混凝土把阳光弹回箭体下腹，抛光金属尤其吃这一口光 */}
      <mesh position={[0, -14, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[46, 46]} />
        <meshBasicMaterial color="#b9b3a8" />
      </mesh>
    </group>
  );
}

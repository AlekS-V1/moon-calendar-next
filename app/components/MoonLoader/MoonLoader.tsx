// "use client";

// export default function MoonLoader() {
//   return (
//     <div style={{ width: 120, height: 120 }}>
//       <svg width="100%" height="100%" viewBox="0 0 100 100">
//         <defs>
//           {/* NASA-текстура поверхні */}
//           <pattern
//             id="moonTexture"
//             patternUnits="objectBoundingBox"
//             width="1"
//             height="1"
//           >
//             <image
//               href="/image/moon100.png"
//               width="100"
//               height="100"
//               preserveAspectRatio="xMidYMid slice"
//             />
//           </pattern>

//           {/* Світло */}
//           <radialGradient id="moonLight" cx="30%" cy="30%" r="70%">
//             <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
//             <stop offset="60%" stopColor="rgba(255,255,255,0.4)" />
//             <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
//           </radialGradient>

//           {/* Маска з реальним термінатором */}
//           <mask id="moonMask">
//             <rect width="100" height="100" fill="white" />

//             <path id="shadow" fill="black" d="M0,0 L0,100 Q50,50 0,0 Z">
//               <animate
//                 attributeName="d"
//                 dur="6s"
//                 repeatCount="indefinite"
//                 values="
//                   M0,0 L0,100 Q50,50 0,0 Z;
//                   M0,0 L0,100 Q100,50 0,0 Z;
//                   M100,0 L100,100 Q50,50 100,0 Z;
//                   M0,0 L0,100 Q50,50 0,0 Z
//                 "
//                 keyTimes="0; 0.33; 0.66; 1"
//                 calcMode="spline"
//                 keySplines="
//                   .4 0 .2 1;
//                   .4 0 .2 1;
//                   .4 0 .2 1
//                 "
//               />
//             </path>
//           </mask>
//         </defs>

//         {/* Місяць */}
//         <circle
//           cx="50"
//           cy="50"
//           r="50"
//           fill="url(#moonTexture)"
//           mask="url(#moonMask)"
//         />

//         {/* Світіння */}
//         <circle
//           cx="50"
//           cy="50"
//           r="50"
//           fill="url(#moonLight)"
//           style={{ mixBlendMode: "screen" }}
//         />
//       </svg>
//     </div>
//   );
// }

// 🔧 Що легко налаштувати

// Розмір — змінити width: 120, height: 120 у контейнері.

// Швидкість фаз — змінити dur="6s" у <animate>.

// Глибину вигину термінатора — редагувати контрольні точки Q50,50, Q100,50.

// Текстуру — замінити href на іншу NASA‑карту.

"use client";

export default function MoonLoader() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: 32, height: 32 }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Текстура Місяця */}
          <pattern
            id="moonTex32"
            width="1"
            height="1"
            patternUnits="objectBoundingBox"
          >
            <image href="/image/moon100.png" width="100" height="100" />
          </pattern>

          {/* М'яка межа тіні — робимо її трохи менш розмитою для чіткості об'єму */}
          <filter id="moonBlur32">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <mask id="phaseMask32">
            {/* Основа Місяця */}
            <circle cx="50" cy="50" r="50" fill="white" />

            {/* ВЕЛИЧЕЗНА тінь (r=140). Вона створює плавний вигин фази без ефекту "ока" */}
            <circle
              cx="-160"
              cy="50"
              r="140"
              fill="black"
              filter="url(#moonBlur32)"
            >
              <animate
                attributeName="cx"
                values="-160; 50; 260; 50; -160"
                dur="16s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
              />
            </circle>
          </mask>
        </defs>

        {/* 1. Попелясте світло (контур темної сторони) */}
        <circle cx="50" cy="50" r="50" fill="#181818" />

        {/* 2. Текстурований Місяць з маскою плавної фази */}
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="url(#moonTex32)"
          mask="url(#phaseMask32)"
        />

        {/* 3. Легкий зовнішній "атмосферний" відблиск для 3D-ефекту */}
        <circle
          cx="50"
          cy="50"
          r="49.5"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.1"
        />
      </svg>
    </div>
  );
}

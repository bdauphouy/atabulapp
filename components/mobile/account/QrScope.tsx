const QrScope = () => {
  return (
    <div className="absolute left-1/2 top-1/2 w-1/2 min-w-[250px] max-w-lg -translate-x-1/2 -translate-y-1/2">
      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_137_3318)">
          <path
            d="M77.1351 14H38C24.7452 14 14 24.7452 14 38V77.1351M142.865 14H182C195.255 14 206 24.7452 206 38V77.1351M206 142.865V182C206 195.255 195.255 206 182 206H142.865M77.1351 206H38C24.7452 206 14 195.255 14 182V142.865"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_137_3318"
            x="0"
            y="0"
            width="220"
            height="220"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="5.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_137_3318"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_137_3318"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default QrScope

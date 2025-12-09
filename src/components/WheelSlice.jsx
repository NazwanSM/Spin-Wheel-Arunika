import React from 'react';

// Utilitas Geometri untuk SVG Wheel
const getCoordinatesForPercent = (percent) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
};

// Mapping type ke emoji
const TYPE_EMOJI = {
  A: '🎁',      // Candy untuk Freebies
  B: '💵',      // Money untuk Cashback 2k
  C: '💰',      // Money bag untuk Cashback 5k
  ZONK: '💣',   // Bomb untuk ZONK
};

const WheelSlice = ({ index, total, type, color }) => {
  const percent = 1 / total;
  const startAngle = index * percent;
  const endAngle = (index + 1) * percent;

  const [startX, startY] = getCoordinatesForPercent(startAngle);
  const [endX, endY] = getCoordinatesForPercent(endAngle);

  // Jika item hanya 1, buat lingkaran penuh
  if (total === 1) {
    const emoji = TYPE_EMOJI[type] || '🎁';
    return (
      <g>
        <circle cx="0" cy="0" r="1" fill={color} />
        <text 
          x="0" 
          y="0" 
          textAnchor="middle" 
          dominantBaseline="central"
          fontSize="0.3"
        >
          {emoji}
        </text>
      </g>
    );
  }

  const largeArcFlag = percent > 0.5 ? 1 : 0;

  const pathData = [
    `M 0 0`,
    `L ${startX} ${startY}`,
    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    `L 0 0`,
  ].join(' ');

  // Hitung sudut tengah slice
  const midAngle = (startAngle + endAngle) / 2;
  
  // Posisi icon - 65% dari pusat ke tepi
  const iconRadius = 0.7;
  const iconX = Math.cos(2 * Math.PI * midAngle) * iconRadius;
  const iconY = Math.sin(2 * Math.PI * midAngle) * iconRadius;
  
  // Rotasi text (dalam derajat)
  const rotationDeg = midAngle * 360 + 90;

  // Ukuran emoji berdasarkan jumlah items
  const fontSize = total > 25 ? 0.08 : total > 20 ? 0.1 : total > 15 ? 0.12 : total > 10 ? 0.14 : 0.16;
  
  const emoji = TYPE_EMOJI[type] || '🎁';

  return (
    <g>
      <path d={pathData} fill={color} stroke="#877252" strokeWidth="0.005" />
      <text 
        x={iconX} 
        y={iconY} 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={fontSize}
        transform={`rotate(${rotationDeg}, ${iconX}, ${iconY})`}
      >
        {emoji}
      </text>
    </g>
  );
};

export default WheelSlice;

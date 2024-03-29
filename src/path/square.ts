interface GenerateItemPathProps {
    i: number;
    j: number;
    cellSize: number;
    height?: number;
    width?: number;
}

export const generateSquarePath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    path += `M${x},${y}`;
    path += `h${width} v${height} h-${width} v-${height} `;

    return path;
};

export const generateDiamondPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    const midX = x + width / 2;
    const midY = y + height / 2;

    path += `M${midX},${y}`;
    path += `L${x + width},${midY} `;
    path += `L${midX},${y + height} `;
    path += `L${x},${midY} `;
    path += `L${midX},${y} `;

    return path;
};

export const generateStarPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
    points = 5,
}: GenerateItemPathProps & { points?: number }) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cx = cellSize * j + halfWidth;
    const cy = cellSize * i + halfHeight;
    const outerRadius = Math.min(halfWidth, halfHeight);
    const innerRadius = outerRadius / 2;

    let path = '';

    for (let i = 0; i < points; i++) {
        const outerX = cx + outerRadius * Math.cos((Math.PI * 2 * i) / points - Math.PI / 2);
        const outerY = cy + outerRadius * Math.sin((Math.PI * 2 * i) / points - Math.PI / 2);
        const innerX =
            cx + innerRadius * Math.cos((Math.PI * 2 * (i + 0.5)) / points - Math.PI / 2);
        const innerY =
            cy + innerRadius * Math.sin((Math.PI * 2 * (i + 0.5)) / points - Math.PI / 2);

        if (i === 0) {
            path += `M${outerX},${outerY} `;
        } else {
            path += `L${outerX},${outerY} `;
        }
        path += `${innerX},${innerY} `;
    }

    path += 'Z';

    return path;
};

export const generateOutlineSquarePath = ({
    x,
    y,
    length,
    cellSize,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
}) => {
    let path = '';

    path += `M${x + length},${y + length}`;
    path += `H${x}V${y}`;
    path += `H${x + length}Z`;

    path += `M${x + cellSize},${y + length - cellSize}`;
    path += `H${x + length - cellSize}V${y + cellSize}`;
    path += `H${x + cellSize}Z`;

    return path;
};

export const generateOutlineRoundedSquarePath = ({
    x,
    y,
    length,
    cellSize,
    roundedCorners,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
    roundedCorners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
}) => {
    const dynamic1 = length * 0.267;
    const dynamic2 = length - dynamic1;
    const dynamic3 = dynamic1 - cellSize;

    let path = '';

    // Outer path
    path += `M${x},${y + length}`;

    // Draw top-left corner
    if (roundedCorners.includes('bottom-left')) {
        path += `H${x + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x},${y + dynamic2}`;
    } else {
        path += `H${x}`;
    }

    // Draw top-right corner
    if (roundedCorners.includes('top-left')) {
        path += `V${y + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic1},${y}`;
    } else {
        path += `V${y}`;
    }

    // Draw bottom-right corner
    if (roundedCorners.includes('top-right')) {
        path += `H${x + dynamic2}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + length},${y + dynamic1}`;
    } else {
        path += `H${x + length}`;
    }

    // Draw bottom-left corner
    if (roundedCorners.includes('bottom-right')) {
        path += `V${y + dynamic2}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic2},${y + length}`;
    } else {
        path += `V${y + length}`;
    }

    // Close outer path
    path += `Z`;

    // Inner path

    let pathFixMX = x + dynamic1;
    const pathFixMY = y + cellSize;
    let hDynamic2 = dynamic2;
    let vDynamic2 = dynamic2;

    const hDynamic3 = dynamic3;
    const vDynamic3 = dynamic3;

    if (!roundedCorners.includes('top-left')) {
        pathFixMX = x + cellSize;
    }

    if (!roundedCorners.includes('bottom-left')) {
        vDynamic2 = dynamic2 + cellSize / 1.25;
    }

    if (!roundedCorners.includes('bottom-right')) {
        hDynamic2 = dynamic2 + cellSize / 1.25;
    }

    path += `M${pathFixMX},${pathFixMY}`;
    if (roundedCorners.includes('top-left')) {
        path += `a${vDynamic3},${vDynamic3},0,0,0,-${vDynamic3},${vDynamic3}`;
        path += `V${y + vDynamic2}`;
    } else {
        path += `V${y + vDynamic2}`;
    }

    if (roundedCorners.includes('bottom-left')) {
        path += `a${hDynamic3},${hDynamic3},0,0,0,${hDynamic3},${hDynamic3}`;
        path += `H${x + hDynamic2}`;
    } else {
        path += `H${x + hDynamic2}`;
    }

    if (roundedCorners.includes('bottom-right')) {
        path += `a${vDynamic3},${vDynamic3},0,0,0,${vDynamic3}-${vDynamic3}`;
        path += `V${y + dynamic1}`;
    } else {
        path += `V${y + dynamic1}`;
    }

    if (roundedCorners.includes('top-right')) {
        path += `a${hDynamic3},${hDynamic3},0,0,0,-${hDynamic3}-${hDynamic3}`;
    } else {
        path += `V${y + cellSize}`;
    }

    // Close inner path
    path += `Z`;

    return path;
};

export const generateOutlineCirclePath = ({
    x,
    y,
    length,
    cellSize,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
}) => {
    let path = '';

    const radius = length / 2;
    path += `M${x + radius},${y + length}`;
    path += `A${radius},${radius},0,1,1,${length + x},${
        radius + y
    },${radius},${radius},0,0,1,${radius + x},${length + y}`;
    path += `Z`;
    path += `m${0},${-(length - cellSize)}`;
    path += `A${radius - cellSize},${radius - cellSize},0,1,0,${
        length - cellSize + x
    },${radius + y},${radius - cellSize},${radius - cellSize},0,0,0,${radius + x},${cellSize + y}`;
    path += `Z`;

    return path;
};

export const generateRoundedCornerEyeballPath = ({
    x,
    y,
    length,
    roundedCorners,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
    roundedCorners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
}) => {
    let path = '';

    const dynamic1 = length * 0.267;
    const dynamic2 = length - dynamic1;

    path += `M${x},${y + length}`;
    if (roundedCorners.includes('bottom-left')) {
        path += `H${x + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x},${y + dynamic2}`;
    } else {
        path += `H${x}`;
        path += `A${0},${0},0,0,1,${x},${y}`;
    }
    if (roundedCorners.includes('top-left')) {
        path += `V${y + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic1},${y}`;
    } else {
        path += `V${y}`;
        path += `A${0},${0},0,0,1,${x + dynamic1},${y}`;
    }

    if (roundedCorners.includes('top-right')) {
        path += `H${x + dynamic2}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + length},${y + dynamic1}`;
    } else {
        path += `H${x}`;
        path += `A${0},${0},0,0,1,${x + length},${y}`;
    }

    if (roundedCorners.includes('bottom-right')) {
        path += `V${y + length - dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic2},${y + length}`;
    } else {
        path += `V${y + length}`;
        path += `H${x + dynamic2}`;
    }

    path += `Z`;

    return path;
};

interface GenerateTrianglePath extends GenerateItemPathProps {
    direction: 'top' | 'left' | 'right' | 'bottom';
}

export const generateTrianglePath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
    direction,
}: GenerateTrianglePath) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    switch (direction) {
        case 'top':
            path += `M${x + width / 2},${y}`;
            path += `l${width / 2},${height} l${-width},${0} Z`;
            break;
        case 'left':
            path += `M${x},${y + height / 2}`;
            path += `l${width},${height / 2} l${0},${-height} Z`;
            break;
        case 'right':
            path += `M${x + width},${y + height / 2}`;
            path += `l${-width},${height / 2} l${0},${-height} Z`;
            break;
        case 'bottom':
            path += `M${x + width / 2},${y + height}`;
            path += `l${width / 2},${-height} l${-width},${0} Z`;
            break;
        default:
            break;
    }

    return path;
};

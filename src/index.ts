import {
  generateLinearGradientByConfig,
  isGradientColor,
} from "./utils/gradient";
import { Config } from "./config";
import { generateEyeballSVGFromConfig } from "./eyeball";
import { generateEyeFrameSVGFromConfig } from "./eyeframes";
import { generatePath } from "./path";
import { generateMatrix, renderLogoFromConfig } from "./utils";

const quietZone = 0;

export const generateSVGString = (config: Config) => {
  const matrix = generateMatrix(config.value || "https://intosoft.com", "H");

  const path = generatePath({ matrix, size: config.length, config });

  const svg = `<svg viewBox="${[
    -quietZone,
    -quietZone,
    config.length + quietZone * 2,
    config.length + quietZone * 2,
  ].join(" ")}" width="${config.length}" height="${
    config.length
  }" xmlns="http://www.w3.org/2000/svg">
    <defs>
    ${generateLinearGradientByConfig(config)}
    </defs>
<g>
<rect x="${-quietZone}" y="${-quietZone}" width="${
    config.length + quietZone * 2
  }" height="${config.length + quietZone * 2}" fill="${
    config.colors.background
  }" />
  </g>
  ${renderLogoFromConfig(config)}
  <path d="${path}" 
     stroke-linecap="butt" 
     stroke-width="${0}"  fill="${
    isGradientColor(config.colors.body) ? "url(#body)" : config.colors.body
  }"  stroke="${
    isGradientColor(config.colors.body) ? "url(#body)" : config.colors.body
  }" /> 
  ${generateEyeFrameSVGFromConfig(config, matrix.length, matrix)}      
  ${generateEyeballSVGFromConfig(config, matrix.length, matrix)} 
    
   <use href="#logo"/>
  </svg>`;

  return svg;
};

export default {
  generateSVGString,
};

if (window) {
  //@ts-ignore
  window.IntosoftQRCode = { generateSVGString: generateSVGString };
}

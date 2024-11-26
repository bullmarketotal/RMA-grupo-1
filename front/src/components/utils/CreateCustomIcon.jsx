import ReactDOMServer from "react-dom/server";

const createCustomIcon = (color = "sky-500", icon) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
<div class="flex flex-col items-center group relative">
        <div class="flex items-center justify-center 
            text-neutral-50 text-3xl bg-${color} rounded-full w-10 h-10 
            relative z-10 group-hover:bg-neutral-200"> 
            ${ReactDOMServer.renderToString(icon)}
        </div>
        <div class="mt-9 w-0 h-0 
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-t-[40px] border-t-${color}
            absolute z-0 group-hover:border-t-neutral-200">
        </div>
      </div>
    `,
    iconSize: [40, 76],
    iconAnchor: [20, 76],
    popupAnchor: [0, -76],
  });
};
export default createCustomIcon;

import ReactDOMServer from "react-dom/server";

const createCustomIcon = (color, icon) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="flex flex-col items-center group">
        <div class="flex items-center justify-center
            text-neutral-50 text-3xl bg-${color} rounded-full w-10 h-10 
            group-hover:bg-opacity-75 z-10"> 
            ${ReactDOMServer.renderToString(icon)}
        </div>
        <div class="-mt-2 w-0 h-0 
            border-l-[6px] border-l-transparent 
            border-r-[6px] border-r-transparent 
            border-t-[30px] border-t-${color}
            group-hover:border-opacity-75 z-0">
        </div>
      </div>
    `,
    iconSize: [26, 40],
    iconAnchor: [13, 44],
    popupAnchor: [0, -40],
  });
};
export default createCustomIcon;

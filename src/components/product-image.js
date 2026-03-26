function getFitClass(fit) {
  return fit === "contain" ? "fit-contain" : "fit-cover";
}

export function createProductImageComponent({
  primarySrc,
  primaryAlt,
  hoverSrc,
  hoverAlt,
  aspectRatio = "4 / 5",
  primaryFit = "contain",
  hoverFit = "cover",
  primaryPosition = "center center",
  hoverPosition = "center center",
  className = "",
}) {
  const classes = ["product-image-switch", className];
  if (hoverSrc) classes.push("has-hover");

  return `
    <div class="${classes.filter(Boolean).join(" ")}" style="--product-image-ratio: ${aspectRatio};">
      <img
        class="product-image-layer is-primary ${getFitClass(primaryFit)}"
        src="${primarySrc}"
        alt="${primaryAlt}"
        style="object-position: ${primaryPosition};"
        loading="lazy"
      />
      ${
        hoverSrc
          ? `
            <img
              class="product-image-layer is-hover ${getFitClass(hoverFit)}"
              src="${hoverSrc}"
              alt="${hoverAlt || primaryAlt}"
              style="object-position: ${hoverPosition};"
              loading="lazy"
              aria-hidden="true"
            />
          `
          : ""
      }
    </div>
  `;
}

export const updateElementPosition = (activePoint: string | null) : any => {
  if (!activePoint) return null;
  const svgPoint = document.getElementById(activePoint);
  const parentElement = svgPoint?.parentElement;

  if (svgPoint && parentElement) {
    const rect = svgPoint.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();

    const relativeHeight = rect.top - parentRect.top - parentElement.scrollTop;
    const relativeWidth = rect.left - parentRect.left - parentElement.scrollLeft;

    svgPoint.classList.add('hidden')
    return ([relativeHeight, relativeWidth]);
  }
};
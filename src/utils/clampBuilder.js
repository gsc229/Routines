export default function clampBuilder( minWidthPx, maxWidthPx, minFontSizeRem, maxFontSizeRem ) {
  const root = document.querySelector( "html" );
  const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = ( maxFontSizeRem - minFontSizeRem ) / ( maxWidth - minWidth );
  const yAxisIntersection = -minWidth * slope + minFontSizeRem

  return `clamp( ${ minFontSizeRem }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSizeRem }rem )`;
}
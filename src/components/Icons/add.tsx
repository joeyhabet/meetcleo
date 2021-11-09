export default (props: any) => {
  const { size = 24, color = "#4993b8" } = props
  return (
    <svg id="add_black_24dp" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path id="Path_236" data-name="Path 236" d="M0,0H24V24H0Z" fill="none"/>
      <path id="Path_237" data-name="Path 237" d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" fill={color}/>
    </svg>

  )
}
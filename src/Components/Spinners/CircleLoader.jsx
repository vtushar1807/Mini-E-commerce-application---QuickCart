import { CircleLoader } from "react-spinners"
export const CircleLoaderFn = (props)=>{

  const marginTop=props.marginTop

    return (
    
    <>
     <CircleLoader
        color="yellow"
        loading={props.loading}
        cssOverride={{
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:marginTop,
            
        }}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    
    </>
    
)
}
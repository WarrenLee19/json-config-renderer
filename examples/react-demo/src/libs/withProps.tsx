//HOC:用于给组件注入额外的props
const withProps = (additionalProps:any) => {
  return (TheComponent:React.ComponentType)=>{
    return (props:any)=>(<TheComponent {...props} {...additionalProps}/>)
  }
} ;

export default withProps ;
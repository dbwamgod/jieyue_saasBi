export const moveHoverAmplification={
    inserted:(el, binding, vnode)=>{
        let oldHeight=el.clientHeight;
        el.onmousemove=(e)=>{
            el.style.position= 'relative';
            el.style.top= '-5px';
            el.style.height=oldHeight+10+'px';
            console.log(el.style.height,e)
        };
        el.onmouseout=(e)=>{
            el.style.position= 'static';
            el.style.top= 0;
            el.style.height=oldHeight+'px';
        
        }
        
    }
}
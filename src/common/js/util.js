window._timer = null;
window._timeout = 1500;
window._tryMax = 15;
export  let _loadComponents = (resolve,reject,page)=>{
    import (`page/${page}.vue`).then(module=>{
        resolve(module)
    }).catch(err=>{
        _loadError(resolve,reject,page)
    })
}
export let _loadError = (resolve,reject,page)=>{
    window.tryCount += 1;
    if(window._tryCount > window._tryMax){
        reject(_tipsCallback())
    }else{
        window._timer = setInterval(()=>{
            clearInterval(window._timer)
            _loadComponents(resolve,reject,page)
        })
    }
}
export let _tipsCallback = ()=>{
    alert('模板加载失败，请检查您的路径是否正确')
}

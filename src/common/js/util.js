window.__timer = null;
window.__timeout = 1500; //加载超时时间
window.__tryMax = 15; //加载失败后重复加载的次数

export function _loadComponent(resolve,reject,page){
    import (`page/${page}.vue`).then(module => {
        resolve(module)
    }).catch(err => {
        _loadError(resolve,reject,page)
    })
}
export function _loadError(resolve,reject,page){
    window.__tryCount += 1
    if (window.__tryCount > window.__tryMax) { // 若超出最大尝试次数则 reject
        reject(_tipsCallback())
    } else {
        window.__timer= setTimeout(() => {
            clearTimeout(window.__timer)
            _loadComponent(resolve,reject,page)
        }, window.__timeout)
    }
}
const _tipsCallback=function() {
    //加载最大次数失败后 提示 
    alert('请检查网络后重试!')
}
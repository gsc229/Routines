import DOMpurify from 'dompurify'


export const purifyIframe = (iframeString) => {
  const allowedAttributes = ["allowfullscreen", "allow", "frameborder", "src", "height", "width"]

  const regex = RegExp(/https:\/\/www\.youtube\.com/g)
  

  DOMpurify.addHook('afterSanitizeAttributes', function(node){
    let iframe = document.createElement('iframe')
    iframe.src = node.getAttribute('src')  
    const match = iframe.src && iframe.src.match(regex)

    if(!match){
      node.removeAttribute('src')
    }

  })

  const purifiedIframe = DOMpurify.sanitize(iframeString, {ALLOWED_TAGS: ['iframe'], ALLOWED_ATTR: allowedAttributes})
  const removed = DOMpurify.removed.filter(obj => obj.element && obj.element.tagName !== "BODY")

  const testDiv = document.createElement('div')
  testDiv.innerHTML = iframeString
  const childCount = testDiv.childElementCount

  if(childCount > 1){
    return {purifiedIframe: null, removed: [], error_message: "Only one YouTube iframe for each exercise."}
  }


  return {purifiedIframe, removed}
}


let switchNode = document.createElement('li')
let tabs = document
  .getElementById('new-header')
  .getElementsByClassName('tabs')[2]

switchNode.innerHTML = `
<span class="menu-non-link">
               Dark Mode
                <div class="availability-toggle">
                  <div class="availablity-toggle-bar"></div>
                  <a class="availability-toggle-target" data-remote="true" rel="nofollow" data-method="put">
                      <svg viewBox="0 0 24 24" width="24" height="24" role="img" aria-labelledby="4ohehg8azdfp612f3i6o4fiasx4fwxx" class="icon "><title id="4ohehg8azdfp612f3i6o4fiasx4fwxx">padlock</title>
<path d="M20 8h-2V6c0-3.309-2.691-6-6-6S6 2.691 6 6v2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4-11H8V6c0-2.206 1.794-4 4-4s4 1.794 4 4z"></path></svg>

</a>                </div>
                <span class="menu-availability-info" rel="tipsy" data-tipsy-class="tipsy-alt" original-title="You are publicly available for hire">
                </span>
              </span>
`

switchNode.id = 'switchMode'
tabs.appendChild(switchNode)

let switchBtn = switchNode.getElementsByTagName('a')
let open = switchNode.getElementsByClassName('availability-toggle')[0]
let dot = switchNode.getElementsByClassName('availability-toggle-target')[0]

function css() {
  var cssId = 'myCss' // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')
    link.id = cssId
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = chrome.extension.getURL('style.css')
    link.media = 'all'
    head.appendChild(link)
  }
  var cssId = 'myCss2' // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')
    link.id = cssId
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = chrome.extension.getURL('userProfile.css')
    link.media = 'all'
    head.appendChild(link)
  }
}

function removeCss() {
  var parent = document.getElementsByTagName('head')[0]
  var self = document.getElementById('myCss')
  var removed = parent.removeChild(self)
  removed === self
}

switchNode.addEventListener('click', function() {
  if (open.className == 'availability-toggle') {
    open.classList.add('publicly')
    css()
    console.log(open.className)
  } else {
    console.log('remove')
    removeCss()
    open.classList.remove('publicly')
  }
})

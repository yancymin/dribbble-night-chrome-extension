function css() {
  var cssId = 'myCss'
  if (!document.getElementById(cssId)) {
    var link = document.createElement('link')
    link.id = cssId
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = chrome.extension.getURL('style/style.css')
    link.media = 'all'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  var cssId2 = 'myCss2'
  if (!document.getElementById(cssId2)) {
    var link2 = document.createElement('link')
    link2.id = cssId2
    link2.rel = 'stylesheet'
    link2.type = 'text/css'
    link2.href = chrome.extension.getURL('style/userProfile.css')
    link2.media = 'all'
    document.getElementsByTagName('head')[0].appendChild(link2)
  }
}

function removeCss() {
  var parent = document.getElementsByTagName('head')[0]
  var myCss = document.getElementById('myCss')
  var removed = parent.removeChild(myCss)
  removed === myCss
  var myCss2 = document.getElementById('myCss2')
  var removed2 = parent.removeChild(myCss2)
  removed2 === myCss2
}

chrome.storage.local.get(['dribbbleDarkMode'], function(status) {
  if (status.dribbbleDarkMode) {
    css()
  } else {
    removeCss()
  }
})

document.onreadystatechange = function() {
  if (document.readyState === 'interactive') {
    let switchNode = document.createElement('li')
    let tabs = document.getElementById('nav').getElementsByClassName('tabs')[2]
    switchNode.id = 'switchMode'

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
    tabs.appendChild(switchNode)
    let dot = switchNode.getElementsByClassName('availability-toggle-target')[0]
    let open = switchNode.getElementsByClassName('availability-toggle')[0]

    chrome.storage.local.get(['dribbbleDarkMode'], function(status) {
      if (status.dribbbleDarkMode) {
        open.classList.add('publicly')
      } else {
        open.classList.remove('publicly')
      }
    })

    dot.addEventListener('click', function() {
      if (open.className == 'availability-toggle') {
        css()
        chrome.storage.local.set({ dribbbleDarkMode: true })
        open.classList.add('publicly')
      } else {
        removeCss()
        chrome.storage.local.set({ dribbbleDarkMode: false })
        open.classList.remove('publicly')
      }
    })
  }
}

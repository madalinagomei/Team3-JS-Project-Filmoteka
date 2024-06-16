function scrollToTop(){const e=document.documentElement.scrollTop||document.body.scrollTop;e>0&&(window.requestAnimationFrame(scrollToTop),window.scrollTo(0,e-e/8))}function closeModal(){document.getElementById("myModal").style.display="none"}function openModal(){document.getElementById("myModal").style.display="block"}document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll(".hero-carousel-item");let t=0;setInterval((function(){e[t].style.display="none",t=(t+1)%e.length,e[t].style.display="block"}),1e4)})),document.addEventListener("DOMContentLoaded",(()=>{const e="584875d09aec925781121837a2fa3c3b",t="https://api.themoviedb.org/3",n="https://image.tmdb.org/t/p/w500",o=document.getElementById("movie-list"),a=document.getElementById("movie-details"),d=document.getElementById("overlay"),l=document.querySelector(".search-form__input"),i=document.querySelector(".svg-search"),s=document.getElementById("theme-switch"),c=document.getElementById("home-link"),r=document.getElementById("library-link"),u=document.getElementById("main-content"),m=document.getElementById("library-content"),p=document.getElementById("library-movie-list"),g=document.getElementById("watched-btn"),y=document.getElementById("queue-btn"),v=20;let h="watched",f=1,L=20,E={};function b(e){o.innerHTML="",e.forEach((e=>{const t=document.createElement("div");t.classList.add("movie-item","photo"),t.innerHTML=`\n\n  <img src="${n+(e.poster_path?e.poster_path:"/default.jpg")}" alt="${e.title}" onerror="this.src='/src/images/fallback-orange.png';">\n  <div class="glow-wrap">\n    <i class="glow"></i>\n  </div>\n    <h3>${e.title}</h3>\n  <p>${e.genre_ids.map((e=>E[e])).join(", ")} | ${e.release_date?e.release_date.split("-")[0]:"N/A"} </p>\n  <button class="add-to-library" data-id="${e.id}" data-type="watched">Add to Watched</button>\n  <button class="add-to-library" data-id="${e.id}" data-type="queue">Add to Queue</button>`,t.querySelectorAll(".add-to-library").forEach((t=>{t.addEventListener("click",(n=>{n.stopPropagation(),B(e,t.dataset.type)}))})),t.addEventListener("click",(()=>{I(e)})),o.appendChild(t)}))}function $(){const n=l.value.trim().toLowerCase();n.length>2&&fetch(`${t}/search/movie?api_key=${e}&language=en-US&query=${n}`).then((e=>e.json())).then((e=>{b(e.results.filter((e=>{const t=e.title.toLowerCase().includes(n),o=e.genre_ids.some((e=>(E[e]?E[e].toLowerCase():"").includes(n)));return t||o})))}))}function k(n){let o=!1,a=[],d=Math.floor(9*n/v)+1;9*n-v*(d-1)<9&&(o=!0),fetch(`${t}/movie/popular?api_key=${e}&language=en-US&page=${d}`).then((e=>e.json())).then((l=>{o?(a=l.results.slice(9*(n-1)%v,v),fetch(`${t}/movie/popular?api_key=${e}&language=en-US&page=${d+1}`).then((e=>e.json())).then((e=>{a=a.concat(e.results.slice(0,9*n%v)),b(a),S()}))):(b(l.results.slice(9*(n-1)%v,9*n%v)),S())}))}function S(){const e=document.getElementById("pagination");e.innerHTML="";const t=w("«","prev");e.appendChild(t);{const t=w(1,1);if(e.appendChild(t),1===f&&t.classList.add("active"),f>4){const t=document.createElement("span");t.textContent="...",e.appendChild(t)}const n=Math.max(2,f-2),o=Math.min(19,f+2);for(let t=n;t<=o;t++){const n=w(t,t);t===f&&n.classList.add("active"),e.appendChild(n)}if(f<17){const t=document.createElement("span");t.textContent="...",e.appendChild(t)}const a=w(L,L);e.appendChild(a),f===L&&a.classList.add("active")}const n=w("»","next");e.appendChild(n)}function w(e,t){const n=document.createElement("button");return n.textContent=e,n.setAttribute("data-page",t),n.classList.add("pagination-item"),n}function I(e){let t="Add to Watched",o=!1,l="Add to Queue",i=!1,s=JSON.parse(localStorage.getItem("watched"))||[];s.some((t=>t.id===e.id))&&(t="Remove from Watched",o=!0),s=JSON.parse(localStorage.getItem("queue"))||[],s.some((t=>t.id===e.id))&&(l="Remove from Queue",i=!0),a.innerHTML=`\n    <div class="modal-container">\n      <img src="${n+e.poster_path}" alt="${e.title}">\n      <div class="modal-side-info">\n      <h2>${e.title}</h2>\n     \n      <div class="list-div">\n      <ul class="left-list">\n      <li>Vote/ Votes</li>\n      <li>Popularity</li>\n      <li>Original Title</li>\n      <li>Genre</li>\n      </ul>\n      <ul class="right-list">\n      <li><span class="vote-average">${e.vote_average.toFixed(1)}</span> / ${e.vote_count}</li>\n      <li>${e.popularity}</li>\n      <li>${e.original_title}</li>\n      <li>${e.genre_ids.map((e=>E[e])).join(", ")}</li>\n\n      </ul>\n      </div>\n      <div class="side-info-about">\n      <h4>About</h4>\n      <p>${e.overview}</p>\n      </div>\n\n\n      <div class="button-group">\n        <button class="add-to-watched" data-id="${e.id}">${t}</button>\n        <button class="add-to-queue" data-id="${e.id}">${l}</button>\n      </div>\n      </div>\n      \n      </div>\n      `,console.log(e),a.classList.remove("hidden"),d.classList.remove("hidden"),a.querySelector(".add-to-watched").addEventListener("click",(()=>{o?removeFromLibrary(e,"watched"):B(e,"watched")})),a.querySelector(".add-to-queue").addEventListener("click",(()=>{i?removeFromLibrary(e,"queue"):B(e,"queue")})),d.addEventListener("click",q)}function q(){a.classList.add("hidden"),d.classList.add("hidden"),d.removeEventListener("click",q)}function B(e,t){let n=JSON.parse(localStorage.getItem(t))||[];n.some((t=>t.id===e.id))?Notiflix.Notify.info(`Movie already in ${t}.`):(n.push(e),localStorage.setItem(t,JSON.stringify(n)),Notiflix.Notify.success(`Successfully added movie to ${t}.`)),I(e),M()}function M(){p.innerHTML="";const e=JSON.parse(localStorage.getItem(h))||[],t=document.querySelector(".no-movies");0===e.length?t.style.display="flex":(t.style.display="none",e.forEach((e=>{const t=document.createElement("div");t.classList.add("movie-item","photo"),t.innerHTML=`\n        <img src="${n+e.poster_path}" alt="${e.title}">\n        <h3>${e.title}</h3>\n        <p>${e.genre_ids.map((e=>E[e])).join(", ")} | ${e.release_date?e.release_date.split("-")[0]:"N/A"} </p>\n        <button class="remove-from-library" data-id="${e.id}" data-type="${h}">Remove</button>\n      `,t.querySelector(".remove-from-library").addEventListener("click",(t=>{t.stopPropagation(),function(e,t){let n=JSON.parse(localStorage.getItem(t))||[];n=n.filter((t=>t.id!==e.id)),localStorage.setItem(t,JSON.stringify(n)),Notiflix.Notify.success("Successfully removed movie from library."),M()}(e,h)})),t.addEventListener("click",(()=>{I(e)})),p.appendChild(t)})))}fetch(`${t}/genre/movie/list?api_key=${e}&language=en-US`).then((e=>e.json())).then((e=>{E=e.genres.reduce(((e,t)=>(e[t.id]=t.name,e)),{}),k(f)})),l.addEventListener("keydown",(e=>{"Enter"===e.key&&(e.preventDefault(),$())})),i.addEventListener("click",(()=>{$()})),document.getElementById("pagination").addEventListener("click",(function(e){const t=e.target;if("BUTTON"===t.tagName){const e=t.getAttribute("data-page");"prev"===e?f>1&&(f--,k(f)):"next"===e?f<L&&(f++,k(f)):(f=parseInt(e),k(f))}})),s.addEventListener("change",(()=>{document.body.classList.toggle("dark-mode"),localStorage.setItem("dark-mode",document.body.classList.contains("dark-mode"))})),"true"===localStorage.getItem("dark-mode")&&(document.body.classList.add("dark-mode"),s.checked=!0),c.addEventListener("click",(e=>{e.preventDefault(),u.classList.remove("hidden"),m.classList.add("hidden")})),r.addEventListener("click",(e=>{e.preventDefault(),u.classList.add("hidden"),m.classList.remove("hidden"),M()})),g.addEventListener("click",(()=>{h="watched",M()})),y.addEventListener("click",(()=>{h="queue",M()}))})),window.addEventListener("scroll",(function(){const e=document.getElementById("upward");document.documentElement.scrollTop>300||document.body.scrollTop>300?e.style.display="block":e.style.display="none"})),document.querySelector(".modal .close").addEventListener("click",closeModal),window.addEventListener("click",(function(e){e.target==document.getElementById("myModal")&&closeModal()})),document.getElementById("footer-text").addEventListener("click",openModal),document.addEventListener("DOMContentLoaded",(function(){closeModal()}));const modal=document.getElementById("auth-modal"),closeButton=document.querySelector(".close-button"),authTabs=document.querySelectorAll(".auth-tab"),authForms=document.querySelectorAll(".auth-form");document.querySelectorAll(".auth-trigger").forEach((e=>{e.addEventListener("click",(()=>{modal.style.display="flex"}))})),closeButton.addEventListener("click",(()=>{modal.style.display="none"})),window.addEventListener("click",(e=>{e.target==modal&&(modal.style.display="none")})),authTabs.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-target");authTabs.forEach((e=>e.classList.remove("active"))),e.target.classList.add("active"),authForms.forEach((e=>{e.id===t?e.classList.add("active"):e.classList.remove("active")}))}))}));
//# sourceMappingURL=index.91b1f470.js.map

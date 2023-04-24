(() => {
    document.addEventListener("DOMContentLoaded", () => init());

    function init() {
        assignTemplates();
        createReadMorePopups();
        createImageFocusPopups();
        adjustSkillColours();
    }

    function assignTemplates() {
        this.focusTemplate = document.querySelector("#focus-template");
    }

    function createReadMorePopups() {
        const MaxInitialCharLength = 800;
        const focusTargets = document.querySelectorAll(".read-more-focus");
        focusTargets.forEach(ft => { 
            const content = ft.innerHTML;
            const title = ft.getAttribute("data-focus-title");
            const charLimit = ft.getAttribute("data-focus-char-limit");
            const focusOverlay = this.focusTemplate.content.firstElementChild.cloneNode(true);
            const focusContent = focusOverlay.querySelector(".focus-content");
            const focusMain = focusOverlay.querySelector(".focus-main");
            const focusTitle = focusOverlay.querySelector(".focus-title");
            const closeBtn = focusOverlay.querySelector(".close-btn");

            const finalCharLimit = charLimit === null ? MaxInitialCharLength : charLimit;
            
            if (ft.textContent.length <= finalCharLimit)
                return;

            // Trim initial content, create read-more btn.
            ft.innerHTML = content.substring(0, finalCharLimit) + "... <span class='read-more-btn'>Read More</span>";
            const readMoreBtn = ft.querySelector(".read-more-btn");
            
            // Fill focus overlay with full content
            document.body.appendChild(focusOverlay);
            focusTitle.innerHTML = title;
            focusMain.innerHTML = content; 

            // Add event handlers
            readMoreBtn.addEventListener("click", () => {
                focusOverlay.classList.add("show-overlay");
                setTimeout(() => {
                    if (focusOverlay.classList.contains("show-overlay")) {
                        focusOverlay.classList.add("overlay-visible");
                    }
                }, 250);
            });

            closeBtn.addEventListener("click", () => {
                focusOverlay.classList.remove("show-overlay");
                focusOverlay.classList.remove("overlay-visible");
            });

            document.addEventListener("click", e => {
                if (focusOverlay.classList.contains("overlay-visible") && !focusContent.contains(e.target)) {
                    focusOverlay.classList.remove("show-overlay");
                    focusOverlay.classList.remove("overlay-visible");
                }
            });

        });
    }


    function createImageFocusPopups() {
        const focusTargets = document.querySelectorAll(".image-focus");
        focusTargets.forEach(ft => {
            const src = ft.src;
            const focusOverlay = this.focusTemplate.content.firstElementChild.cloneNode(true);
            const focusContent = focusOverlay.querySelector(".focus-content");
            const closeBtn = focusOverlay.querySelector(".close-btn");
            const img = document.createElement("img");
            const focusMain = focusOverlay.querySelector(".focus-main");

            document.body.appendChild(focusOverlay);
            focusMain.appendChild(img);
            img.src = src;
            img.classList.add("focussed-img");

            ft.addEventListener("click", () => {
                focusOverlay.classList.add("show-overlay");
                setTimeout(() => {
                    if (focusOverlay.classList.contains("show-overlay")) {
                        focusOverlay.classList.add("overlay-visible");
                    }
                }, 250);
            });

            closeBtn.addEventListener("click", () => {
                focusOverlay.classList.remove("show-overlay");
                focusOverlay.classList.remove("overlay-visible");
            });

            document.addEventListener("click", e => {
                if (focusOverlay.classList.contains("overlay-visible") && !focusContent.contains(e.target)) {
                    focusOverlay.classList.remove("show-overlay");
                    focusOverlay.classList.remove("overlay-visible");
                }
            });
        });
    }

    function adjustSkillColours() {
        //149, 215, 174
        const skillbars = document.querySelectorAll(".skill-progress");
        skillbars.forEach(sb => {
            const containerWidth = sb.parentElement.clientWidth;
            const width = sb.clientWidth / containerWidth + 0.1;
            const r = width * (149 - 149) + 149;
            const g = width * (215 - 0);
            const b = width * (174 - 0);
            sb.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        });
    }

})();

const switchers = [...document.querySelectorAll(".switcher")];

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});


function init() {
	const slider = document.querySelector(".slider");
	const nextBtn = slider.querySelector(".slider .nav .next");
	const prevBtn = slider.querySelector(".slider .nav .prev");
	const items = slider.querySelectorAll(".slider .item");

	let current = 0;

	items.forEach((item) => {
		const textWrapper = item.querySelector(".wrap");
		textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
		);
	});

	function anim(current, next, callback) {
		const currentImgs = current.querySelectorAll(".img");
		const currentText = current.querySelectorAll(".content .letter");
		const nextImgs = next.querySelectorAll(".img");
		const nextText = next.querySelectorAll(".content .letter");

		const duration = 400;
		const offset = "-=" + 300;
		const imgOffset = duration*.8;

		const tl = anime.timeline({
			easing: "easeInOutQuint",
			duration: duration,
			complete: callback
		});

    	// Add children
		tl.add({
			targets: currentText,
			translateY: [0, '-.75em'],
			/*clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'],*/
			opacity: [1, 0],
			easing: "easeInQuint",
			duration: 600,
			delay: (el, i) => 10 * (i + 1)
		})
		.add({
			targets: currentImgs[0],
			translateY: -600,
			rotate: [0, '-15deg'],
			opacity: [1, 0],
			easing: "easeInCubic"
		}, offset )
		.add({
			targets: currentImgs[1],
			translateY: -600,
			rotate: [0, '15deg'],
			opacity: [1, 0],
			easing: "easeInCubic"
		}, "-=" + imgOffset )
		.add({
			targets: currentImgs[2],
			translateY: -600,
			rotate: [0, '-15deg'],
			opacity: [1, 0],
			easing: "easeInCubic"
		}, "-=" + imgOffset )
		.add({
			targets: currentImgs[3],
			translateY: -600,
			rotate: [0, '15deg'],
			opacity: [1, 0],
			easing: "easeInCubic"
		}, "-=" + imgOffset )
		.add({
			targets: current,
			opacity: 0,
			duration: 10,
			easing: "easeInCubic"
		})
		.add({
			targets: next,
			opacity: 1,
			duration: 10
		}, offset )
		.add({
			targets: nextImgs[0],
			translateY: [600, 0],
			rotate: ['15deg', 0],
			opacity: [0, 1],
			easing: "easeOutCubic"
		}, offset )
		.add({
			targets: nextImgs[1],
			translateY: [600, 0],
			rotate: ['-15deg', 0],
			opacity: [0, 1],
			easing: "easeOutCubic"
		}, "-=" + imgOffset )
		.add({
			targets: nextImgs[2],
			translateY: [600, 0],
			rotate: ['15deg', 0],
			opacity: [0, 1],
			easing: "easeOutCubic"
		}, "-=" + imgOffset )
		.add({
			targets: nextImgs[3],
			translateY: [600, 0],
			rotate: ['-15deg', 0],
			opacity: [0, 1],
			easing: "easeOutCubic"
		}, "-=" + imgOffset )
		.add({
			targets: nextText,
			translateY: ['.75em', 0],
			/*clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)','polygon(0 0, 100% 0, 100% 100%, 0% 100%)'],*/
			opacity: [0, 1],
			easing: "easeOutQuint",
			duration: 600,
			delay: (el, i) => 10 * (i + 1)
		}, offset );
	}

	let isPlaying = false;

	function updateSlider(newIndex) {
		const currentItem = items[current];
		const newItem = items[newIndex];

		function callback() {
			currentItem.classList.remove("is-active");
			newItem.classList.add("is-active");
			current = newIndex;
			isPlaying = false;
		}

		anim(currentItem, newItem, callback);
	}

	function next() {
		if (isPlaying) return;
		isPlaying = true;
		const newIndex = current === items.length - 1 ? 0 : current + 1;
		updateSlider(newIndex);
	}

	function prev() {
		if (isPlaying) return;
		isPlaying = true;
		const newIndex = current === 0 ? items.length - 1 : current - 1;
		updateSlider(newIndex);
	}

	nextBtn.onclick = next;
	prevBtn.onclick = prev;
}

document.addEventListener("DOMContentLoaded", init);

"use strict";
//DOM
const $ = document.querySelector.bind(document);
//APP
let App = {};
App.init = (function () {
    //Init
    function handleFileSelect(evt) {
        const files = evt.target.files; // FileList object
        //files template
        let template = `${Object.keys(files)
            .map(file => `<div class="file file--${file}">
     <div class="name"><span>${files[file].name}</span></div>
     <div class="progress active"></div>
     <div class="done">
	<a href="" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
		<g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
		</svg>
						</a>
     </div>
    </div>`)
            .join("")}`;
        $("#drop").classList.add("hidden");
        $("footer").classList.add("hasFiles");
        $(".importar").classList.add("active");
        setTimeout(() => {
            $(".list-files").innerHTML = template;
        }, 1000);
        Object.keys(files).forEach(file => {
            let load = 2000 + (file * 2000); // fake load
            setTimeout(() => {
                $(`.file--${file}`).querySelector(".progress").classList.remove("active");
                $(`.file--${file}`).querySelector(".done").classList.add("anim");
            }, load);
        });
    }
    // trigger input
    $("#triggerFile").addEventListener("click", evt => {
        evt.preventDefault();
        $("input[type=file]").click();
    });
    // drop events
    $("#drop").ondragleave = evt => {
        $("#drop").classList.remove("active");
        evt.preventDefault();
    };
    $("#drop").ondragover = $("#drop").ondragenter = evt => {
        $("#drop").classList.add("active");
        evt.preventDefault();
    };
    $("#drop").ondrop = evt => {
        $("input[type=file]").files = evt.dataTransfer.files;
        $("footer").classList.add("hasFiles");
        $("#drop").classList.remove("active");
        evt.preventDefault();
    };
    //upload more
    $(".importar").addEventListener("click", () => {
        $(".list-files").innerHTML = "";
        $("footer").classList.remove("hasFiles");
        $(".importar").classList.remove("active");
        setTimeout(() => {
            $("#drop").classList.remove("hidden");
        }, 500);
    });
    // input change
    $("input[type=file]").addEventListener("change", handleFileSelect);
})();



import fetch from "node-fetch";

class SelectorResult {
  #elements;
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }
  html(contents: string) {
    //iterate over everything we found
    this.#elements.forEach((elem) => {
      //set contents equal to string we were given
      elem.innerHTML = contents;
    });
  }
  on<K extends keyof HTMLElementEventMap>(
    eventName: K,
    cb: (e: HTMLElementEventMap[K]) => void
  ) {
    this.#elements.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      htmlElem.addEventListener(eventName, cb);
    });
  }
  show() {
    this.#elements.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      htmlElem.style.visibility = "visible";
    });
  }
}

function $(selector: string): any {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax({
    url,
    success,
  }: {
    url: string;
    success: (data: any) => void;
  }): any {
    return fetch(url)
      .then((resp) => resp.json())
      .then((resp) => success(resp));
  }
}

/**
 * Get the <button> element with the class 'continue'
 * and change its HTML to 'Next Step...'
 */
$("button.continue").html("Next Step...");

/**
 * Show the #banner-message element that is hidden with visibility:"hidden" in
 * its CSS when any button in #button-container is clicked.
 */
const hiddenBox = $("#banner-message");
$("#button-container button").on("click", () => {
  hiddenBox.show();
});

/**
 * Make an API call and fill a <div id="post-info">
 * with the response data
 */
$.ajax({
  url: "https://jsonplaceholder.typicode.com/posts/33",
  success: (result) => {
    $("#post-info").html("<strong>" + result.title + "</strong>" + result.body);
  },
});

export default $;

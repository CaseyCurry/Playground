let scriptCount = 0;

const getChunkSrc = chunk => {
  const src = chunk.getAttribute("src");
  const file = src[src.length - 1] === "/" ? "index.html" : "/index.html";
  return chunk.getAttribute("src") + file;
};

const hash = x => {
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let hash = 0;
  let chr;
  if (x.length === 0) {
    return hash;
  }
  for (let i = 0; i < x.length; i++) {
    chr = x.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

const scrubChunk = (html, chunkSrc) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  const links = doc.getElementsByTagName("link");
  html = scrubCss(html, chunkSrc, links);

  const scripts = doc.getElementsByTagName("script");
  return scrubScripts(html, chunkSrc, scripts);
};

const scrubCss = (html, chunkSrc, links) => {
  Array.from(links).forEach(link => {
    const originalUrl = link.getAttribute("href");
    try {
      /* This will throw an exception if the path is relative. It will then
       be made absolute in the catch. */
      new URL(originalUrl);
    } catch {
      const newUrl =
        (chunkSrc[chunkSrc.length - 1] === "/" ? chunkSrc : chunkSrc + "/") +
        originalUrl;
      /* String.replace only replaces the first instance of the originalUrl.
         That's what we want for each iteration of element. */
      html = html.replace(originalUrl, newUrl);
    }
  });
  return html;
};

const scrubScripts = (html, chunkSrc, scripts) => {
  const scrubbedScripts = {
    html: html,
    scriptAppenders: []
  };
  scripts = Array.from(scripts);
  scripts.forEach(script => {
    const originalUrl = script.getAttribute("src");
    const scriptId = hash(`${originalUrl}.${scriptCount++}`);
    let newUrl = originalUrl;

    try {
      /* This will throw an exception if the path is relative. It will then
       be made absolute in the catch. */
      new URL(originalUrl);
    } catch {
      newUrl =
        (chunkSrc[chunkSrc.length - 1] === "/" ? chunkSrc : chunkSrc + "/") +
        originalUrl;
    }

    scrubbedScripts.html = scrubbedScripts.html.replace(
      script.outerHTML
        .replace('defer=""', "defer")
        .replace('async=""', "async"),
      `<script-container id="${scriptId}"></script-container>`
    );

    const scriptAppender = () => {
      const scriptElement = document.createElement("script");
      scriptElement.src = newUrl;
      scriptElement.defer = script.getAttribute("defer") == false;
      scriptElement.async = script.getAttribute("async") == false;
      const scriptContainer = document.getElementById(scriptId);
      scriptContainer.appendChild(scriptElement);
    };
    scrubbedScripts.scriptAppenders.push(scriptAppender);
  });
  return scrubbedScripts;
};

const chunks = document.getElementsByTagName("chunk");

Array.from(chunks).forEach(chunk => {
  // TODO: do not cache
  fetch(getChunkSrc(chunk)).then(response => {
    // simulate a slow chunk to make sure it renders in the correct place
    const timeout =
      chunk.getAttribute("src").indexOf("barista") >= 0 ? 3000 : 0;
    setTimeout(() => {
      if (response.ok) {
        response.text().then(body => {
          const scrubbedChunks = scrubChunk(body, chunk.getAttribute("src"));
          chunk.innerHTML = scrubbedChunks.html;
          scrubbedChunks.scriptAppenders.forEach(appender => appender());
        });
      }
    }, timeout);
  });
});

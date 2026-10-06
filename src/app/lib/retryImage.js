// One failed request does not cost the reader the image.
//
// A dropped connection, a revalidation that did not come back, a preload that
// lost its race - each ends the fetch with an error event, and an element
// nothing asks again leaves its frame empty for the rest of the visit while
// the file answers normally to everyone else. The address is requested once
// more, a moment later. An image that is genuinely absent fails the same way
// twice and the page degrades exactly as it did before.
const RETRY_MS = 1200;

// Once per element for the life of the page, so a file that is really gone
// cannot put the page in a loop asking for it.
const asked = new WeakSet();

export default function retryImage(node) {
  if (!node || asked.has(node)) return false;
  asked.add(node);
  setTimeout(() => {
    const srcset = node.getAttribute('srcset');
    const src = node.getAttribute('src');
    // Removed rather than blanked: an empty src resolves against the document
    // and would fetch the page itself. Clearing both re-runs the picture
    // element's own selection rather than pinning one candidate of it.
    node.removeAttribute('srcset');
    node.removeAttribute('src');
    if (srcset !== null) node.setAttribute('srcset', srcset);
    if (src !== null) node.setAttribute('src', src);
  }, RETRY_MS);
  return true;
}

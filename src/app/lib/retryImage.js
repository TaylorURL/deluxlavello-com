// One failed request does not cost the reader the image.
//
// A dropped connection, a revalidation that did not come back, a preload that
// lost its race - each ends the fetch with an error event, and an element
// nothing asks again leaves its frame empty for the rest of the visit while
// the file answers normally to everyone else. The address is requested once
// more, a moment later. An image that is genuinely absent fails the same way
// twice and the page degrades exactly as it did before.
const RETRY_MS = 1200;

// The second request carries a parameter the first did not, because asking for
// the same address is not the same as asking again. A failed fetch leaves a
// broken entry for that address in the browser's memory cache, and a fresh
// request for the identical URL is answered out of it without touching the
// network - so a retry that re-assigns the attribute it already had resolves
// straight back to the failure it was trying to recover from. The parameter is
// what puts the request on the wire. Static hosting ignores it, and the error
// reporter strips a query string before it fingerprints a message, so a
// genuine second failure files under the same fingerprint as the first.
const FRESH = 'retry=1';

function fresh(url) {
  const address = url.trim();
  if (!address || address.startsWith('data:')) return url;
  return address + (address.includes('?') ? '&' : '?') + FRESH;
}

// A candidate list is addresses with descriptors: `a.webp 148w, b.webp 296w`.
// Only the address of each candidate moves.
function freshSrcset(value) {
  return value
    .split(',')
    .map((candidate) => {
      const parts = candidate.trim().split(/\s+/);
      if (!parts[0]) return candidate;
      parts[0] = fresh(parts[0]);
      return parts.join(' ');
    })
    .join(', ');
}

// Once per element for the life of the page, so a file that is really gone
// cannot put the page in a loop asking for it.
const asked = new WeakSet();

export default function retryImage(node) {
  if (!node || asked.has(node)) return false;
  asked.add(node);
  setTimeout(() => {
    // A <picture> chooses the address, not the <img>, so an element whose
    // chosen candidate came from a <source> would otherwise be handed the
    // same failed address back however its own attributes were rewritten.
    const picture = node.parentElement;
    if (picture && picture.tagName && picture.tagName.toLowerCase() === 'picture') {
      picture.querySelectorAll('source').forEach((source) => {
        const candidates = source.getAttribute('srcset');
        if (candidates !== null) source.setAttribute('srcset', freshSrcset(candidates));
      });
    }
    const srcset = node.getAttribute('srcset');
    const src = node.getAttribute('src');
    // Removed rather than blanked: an empty src resolves against the document
    // and would fetch the page itself. Clearing both re-runs the picture
    // element's own selection rather than pinning one candidate of it.
    node.removeAttribute('srcset');
    node.removeAttribute('src');
    if (srcset !== null) node.setAttribute('srcset', freshSrcset(srcset));
    if (src !== null) node.setAttribute('src', fresh(src));
  }, RETRY_MS);
  return true;
}

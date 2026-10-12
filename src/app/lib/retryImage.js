// One failed request does not cost the reader the image.
//
// A dropped connection, a revalidation that did not come back, a preload that
// lost its race - each ends the fetch with an error event, and an element
// nothing asks again leaves its frame empty for the rest of the visit while
// the file answers normally to everyone else. The address is requested once
// more, a moment later. An image that is genuinely absent fails the same way
// twice and the page degrades exactly as it did before.
//
// The ask itself is in the document's own head script rather than here. An
// image in the served markup is requested while the document is being parsed,
// long before this module has been fetched, so a rule that lived in the bundle
// covered every image except the ones that failed earliest - the header mark
// among them. The head script is installed before the first byte of the body
// and holds the rule for both: the attempt made before the app exists and the
// one made after it.
//
// True while the element still has its one re-request owed or in flight, so a
// caller knows whether this image has anything left to wait for.
export default function retryImage(node) {
  if (!node || typeof window === 'undefined') return false;
  const ask = window.__askImageAgain;
  return typeof ask === 'function' ? ask(node) === true : false;
}

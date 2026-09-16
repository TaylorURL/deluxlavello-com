// The firm's own year rather than the reader's: east of Texas the two differ for
// the last hours of December, and the line this fills names the firm. The build
// runs at UTC, which turns the year over six hours early, so it reads the same zone.
export const firmYear = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric' }).format(
    new Date(),
  );

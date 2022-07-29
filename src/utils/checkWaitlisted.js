export function checkWaitlisted(data) {
  const waitlisted = data.filter((x) => x.standby);
  return waitlisted;
}

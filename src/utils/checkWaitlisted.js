export function checkWaitlisted(data) {
  if (data) {
    const waitlisted = data.filter((x) => x.standby);
    return waitlisted;
  }
  return [];
}

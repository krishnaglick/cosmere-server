
/* globals $ */

export async function saveWoB(wob) {
  await $.ajax({
    type: 'POST',
    url: `/api/wobs`,
    data: JSON.stringify({ wob }),
    contentType: 'application/json; charset=utf-8'
  });
}

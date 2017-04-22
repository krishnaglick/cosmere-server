
export async function saveWoB(wob) {
  wob.id = wob.title + wob.date;
  wob.conversation = wob.conversation.split('\n');
  wob.tags = wob.tags.split(',').map(t => t.trim());
  try {
    await $.ajax({
      type: 'POST',
      url: `/api/wobs`,
      data: JSON.stringify({ wob }),
      contentType: 'application/json; charset=utf-8'
    });
  }
  catch(x) {
    console.error(x);
  }
}

export async function updateWoB(wob) {
  await $.ajax({
    type: 'POST',
    url: `/api/wobs`,
    data: JSON.stringify({ wob }),
    contentType: 'application/json; charset=utf-8'
  });
}



export async function getUsers() {
  //WHO THE SHIT NEEDS PAGINATION, NOT THIS GUY!
  const users = await $.get(`/api/user/getUsers`);
  return {
    users
  };
}

export async function saveUser(user, { getUsers }) {
  await $.post(`/api/user/save`, user);
  getUsers(); //WHY WRITE GOOD DATA FLOWS WHEN YOU CAN JUST QUERY THE DB AGAIN!
}

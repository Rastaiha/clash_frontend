export default async function getLandinData(id) {
  try {
    const tempURL =
      'https://res.cloudinary.com/derp8mdew/raw/upload/v' +
      Math.floor(Math.random() * 10000000) +
      '/files/landpage.json';
    const response = await (await fetch(tempURL)).json();
    return id
      ? {
          detail: response.teams[id],
          members: [
            ...response.members
              .filter((member) => member.position === id)
              .map((member) => ({
                ...member,
                pos: response.teams[id],
              })),
          ],
        }
      : {
          ...response,
          members: [
            ...response.members.map((member) => ({
              ...member,
              pos: response.teams[member.position],
            })),
          ],
        };
  } catch (error) {
    console.log(error);
  }
}

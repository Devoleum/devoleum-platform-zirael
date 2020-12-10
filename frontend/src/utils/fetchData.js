import returnMatchLang from './returnMatchLang'

const getOnce = async (item) => {
  console.log(item.uri)
  const {localizedData, fetchedData } = await returnMatchLang(item.uri)
  console.log("loc: ", localizedData)
  return localizedData;
};

const getIterate = async (items) => {
  await Promise.all(
    items.map(async (el, i) => {
        const {localizedData, fetchedData }= await returnMatchLang(items[i].uri)
        items[i].data = localizedData;
      //items[i].calcHash = await keccak(JSON.stringify(items[i].data), 256);
    })
  );
  return items;

};

export { getOnce, getIterate };

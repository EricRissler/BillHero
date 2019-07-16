var sum = 0;
var testArray = [1, 2, 3, 4]
zahlen.forEach(zahl => {
  sum = sum + zahl
})




const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
console.log(sum)


{
  //Getting Bills by userID and CommercialUsername
  commercialUser
    .findAll({
      attributes: ["id"],
      where: {
        name: {
          $like: "%" + request.body.query + "%"
        }
      }
    })
    .then(results => {
      if (results == null) {
        res.status(404).send();
      }
      creditors = results.array;
      bills = [];
      results.array.forEach(element => {
        bill.findAll({
          where: {
            idDebitor: uid,
            idCreditor: comUser.id
          }
        }).then(resultbills => {
          if (resultbills == null) {
            res.status(404).send();
          }
        })
      });
    });
}
import { User } from "./database/models/user.model";
import { connectToDatabase } from "./database/mongoose";

// prerequisite: Mongodb commands and methods

//create
export async function createUser() {
  try {
    await connectToDatabase();
    const user = await User.create({
      name: "John Doe",
      age: 22,
      email: "test@gmail.com",
      hobbies: ["swimming", "soccer", "cooking"],
      address: {
        street: "21st Street",
        city: "New York",
      },
    });

    // for updating we can do:
    // user.name = "John"
    // await user.save();

    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
// createUser();

//read
export async function findUser() {
  try {
    await connectToDatabase();

    const user = await User.find();

    // const user = await User.findOne({ age: { $gt: 18 } });

    // const user = await User.findById("66bf19e6b965d959fb88566a");

    /*more find methods:

    find
    findOne
    findById

    exists
    
    findOneAndUpdate     
    findByIdAndUpdate

    findOneAndDelete
    findByIdAndDelete

    findOneAndRemove
    findByIdAndRemove

    findOneAndReplace 

    */

    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
// findUser();

//update
export async function updateUser() {
  try {
    await connectToDatabase();
    await User.updateMany(
      {
        name: "John Doe",
      },
      {
        $push: { hobbies: "writing" },
      }
    );

    //   await User.updateOne({
    //   age: {$gt: 18}},
    //   {
    //     name: "Kyle",
    //   }
    // );

    console.log("user updated");
  } catch (error) {
    console.log(error);
  }
}
// updateUser();

//delete
export async function deleteUser() {
  try {
    await connectToDatabase();

    await User.deleteMany({
      age: { $gt: 18 },
    });

    //   await User.deleteOne({
    //   name: "Sougata",
    // });

    console.log("user deleted");
  } catch (error) {
    console.log(error);
  }
}
// deleteUser();

//query basics -> our own find method:
export async function findUserByQuery() {
  try {
    await connectToDatabase();

    // const user = await User.where("name").equals("John Doe");

    // const user = await User.where("age").gt(18);

    const user = await User.where("age")
      .gt(18)
      .lt(31)
      .select("age name")
      .where("name")
      .equals("Kyle")
      .populate({
        path: "bestFriend",
        model: User,
        select: "_id name age",
      })
      .limit(1);

    // user[0].bestFriend = new Types.ObjectId("66c04e814d0b8c5ed9ac7a52");
    // await user[0].save();

    //sort,skip,limit

    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
// findUserByQuery();

//schema-methods
export async function schemaMethod() {
  try {
    await connectToDatabase();
    const user = await User.findOne({ name: "Kyle" });
    user?.sayHi();
  } catch (error) {
    console.log(error);
  }
}
// schemaMethod();

//static-methods
export async function staticMethod() {
  try {
    await connectToDatabase();
    const user = await User.findByName("Kyle");
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
// staticMethod();

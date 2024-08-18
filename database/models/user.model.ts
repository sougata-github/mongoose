import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  age: number;
  email: string;
  hobbies: string[];
  address: {
    street: string;
    city: string;
  };
  createdAt: Date;
  updatedAt: Date;
  bestFriend: Types.ObjectId;

  sayHi(): void;
}

export interface IUserModel extends Model<IUserDocument> {
  findByName(name: string): Promise<IUserDocument[]>;
}

const schema = new Schema({
  name: { type: String },
  age: {
    type: Number,
    min: 1,
    max: 100,
    //custom validition:
    // validate: {
    //   validator: (v: number) => v % 2 === 0,
    //   message: (props: { value: number }) =>
    //     `${props.value} is not an even number`,
    // },
  },
  email: { type: String, required: true, lowercase: true, minLength: 5 },
  hobbies: [{ type: String }],

  //make a separate schema if object is more complex
  address: {
    street: { type: String },
    city: { type: String },
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(Date.now()),
  },
  updatedAt: { type: Date },

  bestFriend: { type: Schema.Types.ObjectId, ref: "User" },
});

//schema methods
schema.methods.sayHi = function () {
  console.log(`Hi My name is ${this.name}`);
};

//static methods
schema.statics.findByName = function (name: string) {
  return this.find({ name: new RegExp(name, "i") });
};

//other methods: query, virtual.

/*schema middleware -> pre or post (before or after)

save or validate or remove

updates the updatedAt field whenever a user is updated
schema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});*/

export const User = (models.User ||
  model<IUserModel>("User", schema)) as IUserModel;

/*
 -create interface 
 -create schema
 -create model
*/

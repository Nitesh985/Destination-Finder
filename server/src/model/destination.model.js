import { Schema, model } from "mongoose";


const destinationSchema = new Schema(
  {
    name:{
        type: String,
        required: true,
        unique: true
    },
    description: {
      type: String
    },
    images:{
      type:[String]
    },
    location:{
      type: String,
      required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
  },
  { timestamps: true }
);



export const Destination = model("Destination", destinationSchema);

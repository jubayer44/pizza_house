// import mongoose from "mongoose";

// const ProductsSchema = new mongoose.Schema({
//   name: {
//     typeof: String,
//     required: true,
//     maxlength: 60,
//   },
//   des: {
//     typeof: String,
//     required: true,
//     maxlength: 200,
//   },
//   img: {
//     typeof: String,
//     required: true,
//   },
//   prices: {
//     typeof: [Number],
//     required: true,
//   },
//   extraOptions: {
//     type: [
//       {
//         text: { typeof: String, required: true },
//         price: { typeof: Number, required: true },
//       },
//     ],
//   },
// },
// {timestamps: true});

// export default mongoose.model.Products || mongoose.model("Products", ProductsSchema);


import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    des: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model("Products", ProductsSchema);
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: 'String',
    trim: true,
    required: [true, 'Product name must be provided.'],
    minlength: [4, 'Product name must contains 4 character or more.'],
    maxlength: [100, 'Product name must contains less than 100 characters.'],
    unique: true,
  },
  title: {
    type: 'String',
    trim: true,
    required: [true, 'Category page title must be provided.'],
    minlength: [4, 'Category page title must contains 4 character or more.'],
    maxlength: [20, 'Category page title must contains less than 20 characters.'],
    unique: true,
  },
  description: {
    type: 'String',
    trim: true,
    required: [true, 'Meta description be provided.'],
    minlength: [4, 'Meta description must contains 4 character or more.'],
    maxlength: [500, 'Meta description must contains less than 500 characters.'],
    unique: true,
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  dateCreated: { type: Date, default: Date.now },
});

categorySchema.statics = {
  get(id, cb) {
    return this.findById({ _id: id }).exec(cb);
  },
  getAll(cb) {
    return this.find({}, cb);
  },
  add(obj, cb) {
    return this.create(obj, cb);
  },
  put(id, obj, cb) {
    return this.findOneAndUpdate({ _id: id }, obj).exec(cb);
  },
  delete(id, cb) {
    return this.findOneAndDelete({ _id: id }).exec(cb);
  },
};

export default mongoose.model('Category', categorySchema);
import mongoose, { Schema } from 'mongoose'
import { DatabaseDriver, MongoDriverConfig, Model, ModelWrapper } from '@/daos/shared/types';

export class MongoDriver implements DatabaseDriver {
    private connection: any;
    private errors: any[];

    constructor(private config: MongoDriverConfig) {}

    public Connect = (): MongoDriver => {
        try {
           this.connection = mongoose.connect(this.config.url, this.config.options);
        } catch(e) {
            this.errors.push(e);
        }
        return this;
    }

   public DefineModel = (model: Model): ModelWrapper => {
     return mongoose.model(model.Name, this._buildSchema(model))
   }

   private _buildSchema = (model: Model): mongoose.Schema => {
       const { Fields: fields, Relationships: relationships } = model;
      
   }

   private typeMap: any = {
       'String': String,
       'Number': Number,
       'Boolean': Boolean,
       'Date': Date,
       'Map': Map
   }

}
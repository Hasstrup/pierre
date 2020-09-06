import mongoose, { Schema } from "mongoose";
import {
  DatabaseDriver,
  MongoDriverConfig,
  Model,
  ModelWrapper,
  ModelRelationship,
} from "@/daos/shared/types";
import { MongoWrapper } from "@/daos/mongodb/wrapper";

export class MongoDriver implements DatabaseDriver {
  private connection: any;
  public errors: any[];
  private _typeMap: any = {
    String: String,
    Number: Number,
    Boolean: Boolean,
    Date: Date,
    Map: Map,
  };

  constructor(private config: MongoDriverConfig) {}

  public Connect = (): MongoDriver => {
    try {
      this.connection = mongoose.connect(this.config.url, this.config.options);
    } catch (e) {
      this.errors.push(e);
    }
    return this;
  };

  public DefineModel = (model: Model): ModelWrapper => {
    const schema = this._buildSchema(model);
    const document = mongoose.model(model.Name, this._buildSchema(model));
    return new MongoWrapper(this.connection, model, document, schema);
  };

  private _buildSchema = (model: Model): mongoose.Schema => {
    const { Fields: fields, Relationships: relationships } = model;
    const schema = {};
    fields.forEach((field) => {
      schema[field.name] = {
        type: this._typeMap[field.type],
        default: field.default,
      };
    });
    relationships.forEach((relationship) => {
      schema[relationship.field] = this._determineRelationship(relationship);
    });
    return new Schema(schema);
  };

  private _determineRelationship = (relationship: ModelRelationship) => {
    switch (relationship.type) {
      case "one-to-one":
        return {
          [relationship.field]: {
            type: Schema.Types.ObjectId,
            ref: relationship.refClass.Name,
          },
        };
      case "one-to-many":
        return {
          [relationship.field]: [
            {
              type: Schema.Types.ObjectId,
              ref: relationship.refClass.Name,
            },
          ],
        };
    }
  };
}

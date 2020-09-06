import { Document, Model } from "mongoose";
import {
  ModelWrapper,
  Model as _Model,
  Result,
  QueryObject,
  Record,
} from "@/daos/shared/types";

export class MongoWrapper implements ModelWrapper {
  constructor(
    private connection: any,
    private _object: _Model,
    private _document: Model<Document>,
    public _schema: any
  ) {}

  public Find = (q: QueryObject): Result[] => null;
  public FindOne = (q: QueryObject): Result => null;
  // not sure what to do here
  public Query = (): Result => null;
  public Insert = (r: Record): Result => null;
  public Delete = (r: Record): Result => null;
  public Update = (r: Record): Result => null;
}

export interface DatabaseDriver {
  errors: any[];
  Connect: (connectionParams: string | ConnParams) => void;
  DefineModel: (model: Model) => ModelWrapper;
  
}

export interface Model {
  Name: string;
  TableName?: string;
  Fields: Array<DaoField>;
  Relationships: Array<ModelRelationship>;
  Indexes: Array<any>;
}

export interface ModelWrapper {
  _schema: any;
  Find: (q: QueryObject) => Result[];
  FindOne: (q: QueryObject) => Result;
  Query?: () => Result;
  Insert: (r: Record) => Result;
  Update: (r: Record) => Result;
  Delete: (r: Record) => Result;
//   Search: () => Result;
}

export interface QueryObject {

}

export interface Record {

}

export interface Result {}

export interface ModelRelationship {
  field: string;
  type: "one-to-one" | "one-to-many" | "many-to-one";
  index: boolean;
  unique?: boolean;
  foreignKey?: boolean;
}

export interface DaoField {
  name: string;
  type: string;
  index: boolean;
  default?: any;
  of?: string;
  primaryKey?: boolean;
}
export interface MongoDriverConfig {
  url: string;
  options: MongoConnectionOptions;
}

export interface MongoConnectionOptions {}
export interface ConnParams {}
